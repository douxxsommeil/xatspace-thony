import * as THREE from './vendor/three.module.min.js';
import pako from 'pako';

/* =========================================================================
   ASCII OUROBOROS — motor de render
   -------------------------------------------------------------------------
   Estrategia:
   1. El blob binario (gzip -> base64) trae, para cada uno de los 600 frames,
      una cuadrícula de luminancia GRID_W x GRID_H (1 byte = 1 celda = 0-255).
   2. En el navegador se descomprime una sola vez con DecompressionStream.
   3. Cada frame de animación:
        - se toma la fila de luminancias del frame actual
        - cada celda de brillo se mapea a un carácter de una rampa densa
          (space -> ........ -> @) según su brillo
        - dentro de esa "banda" de brillo, el carácter concreto elegido
          cambia con una probabilidad controlada por el usuario (PARPADEO),
          dando el efecto "ASCII aleatorio que cambia todo el tiempo"
          sin romper la silueta real, porque solo se sortea DENTRO del
          mismo rango de densidad visual del pixel real.
        - las celdas casi negras (fondo real del video) se fuerzan a espacio
          para mantener el fondo sólido y que solo "vibre" la cadena.
   4. Todo se dibuja en un único <canvas> con fillText en un monospace,
      mucho más rápido que tocar el DOM con 28.900 nodos por frame.
   ========================================================================= */

(function () {
  "use strict";

  // ---- Rampa de caracteres: de vacío a "grabado" denso ----------------
  // Ordenada de menor a mayor densidad visual percibida.
  const RAMP = ' .`\'",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';
  const RAMP_LEN = RAMP.length;
  // Caracteres "candidatos" para el efecto de parpadeo: se restringe a los
  // que están en una densidad similar para no romper la silueta.
  function rampIndexForBrightness(b, gamma) {
    // b: 0..255, gamma ajusta el contraste percibido
    let t = b / 255;
    t = Math.pow(t, gamma);
    let idx = Math.floor(t * (RAMP_LEN - 1));
    if (idx < 0) idx = 0;
    if (idx > RAMP_LEN - 1) idx = RAMP_LEN - 1;
    return idx;
  }

  // ---- Estado global ----------------------------------------------------
  const state = {
    nFrames: 0,
    gridW: 0,
    gridH: 0,
    frames: null,       // Uint8Array plano: frame*H*W + y*W + x
    playing: true,
    frameIndex: 0,
    accum: 0,
    fps: 30,
    speedMul: 1.0,
    flickerProb: 0.38,
    gamma: 1.0,
    density: 170,        // celdas por lado renderizadas (submuestreo del grid fuente)
    charCache: null,      // Uint8Array por celda: índice de rampa "estable" para reducir jitter puro random
    seedBuffer: null,     // valores aleatorios reutilizados por celda para variar el glyph sin recalcular todo
  };

  let canvas, ctx;
  let cellPx = 10;      // tamaño de celda en px, se recalcula on resize
  let cols = 0, rows = 0;
  // Repulsion dura con forma de card: rects en px CSS relativos al canvas.
  // Margen de exclusion opaco (sin filtraciones) alrededor de cada card.
  const REPEL_MARGIN = 12;
  let repelRects = [];
  // Título de bienvenida pre-play (D4): esculpido por sus propias letras.
  // La máscara tipográfica (render offscreen de las dos líneas) define
  // dónde NO puede haber glifo (tinta + margen estrecho TITLE_HARD) y el
  // campo de distancia/dirección (chamfer) EMPUJA los glifos del halo
  // (hasta TITLE_HALO) alejándolos de los bordes: el texto "talla" el
  // campo ASCII en vez de recortarlo con un rectángulo tipo UI.
  const TITLE_TEXT = 'DouxSommeil';
  const TITLE_ID = '1550490712';
  const TITLE_HARD = 8;    // margen estrecho sin glifos alrededor de la tinta (px)
  const TITLE_HALO = 20;   // halo despejado: nada de tinta ajena dentro (px)
  const TITLE_CELL = 5;    // celda del grid de distancia (px)
  // Relleno de dos capas dentro de la forma (D5/D6): tinta gris plana +
  // contraluz más claro desplazado (registro desalineado tipo imprenta).
  // Guardarraíl D6: compuestos sobre negro quedan por DEBAJO de 75 de
  // luminancia — muy por debajo del glifo (144/232) — así que nunca hay
  // borde luminoso ni halo: la palabra sigue siendo una anomalía oscura.
  const TITLE_FILL_BASE = [64, 64, 68, 0.95];    // ~61 compuesto
  const TITLE_FILL_LIGHT = [176, 176, 180, 0.38]; // ~67 compuesto
  const TITLE_FILL_DX = 2, TITLE_FILL_DY = 2;
  let titleGrid = null;    // { gw, gh, ink, dist, dirX, dirY, inkCount }
  let titleBox = null;     // layout cacheado: { w, h, lines }
  let titleRevealT0 = -1e9; // auto-revelado del vacío (instantáneo si -1e9)
  let titleInkLayer = null;   // canvas con la máscara tintada (gris base)
  let titleLightLayer = null; // canvas con la máscara tintada clara + offset
  let titleMixLayer = null;   // composite del revelado (solo mientras abre)
  function pointInRoundedRect(px, py, r) {
    if (px < r.x || px > r.x + r.w || py < r.y || py > r.y + r.h) return 0;
    const rad = Math.min(r.r, r.w / 2, r.h / 2);
    // Interior central: dentro seguro
    if (px >= r.x + rad && px <= r.x + r.w - rad) return 1;
    if (py >= r.y + rad && py <= r.y + r.h - rad) return 1;
    // Esquinas: test circular
    const cx = px < r.x + rad ? r.x + rad : r.x + r.w - rad;
    const cy = py < r.y + rad ? r.y + rad : r.y + r.h - rad;
    const dx = px - cx, dy = py - cy;
    return (dx * dx + dy * dy <= rad * rad) ? 1 : 0;
  }
  function pointInExclusion(px, py, r) {
    const m = REPEL_MARGIN;
    const ex = r.x - m, ey = r.y - m, ew = r.w + m * 2, eh = r.h + m * 2;
    if (px < ex || px > ex + ew || py < ey || py > ey + eh) return 0;
    if (pointInRoundedRect(px, py, r)) return 1;
    // Franja del margen: tambien exclusion total, con esquinas redondeadas extendidas
    const rad = Math.min(r.r + m, ew / 2, eh / 2);
    if (px >= ex + rad && px <= ex + ew - rad) return 1;
    if (py >= ey + rad && py <= ey + eh - rad) return 1;
    const cx = px < ex + rad ? ex + rad : ex + ew - rad;
    const cy = py < ey + rad ? ey + rad : ey + eh - rad;
    const dx = px - cx, dy = py - cy;
    return (dx * dx + dy * dy <= rad * rad) ? 1 : 0;
  }
  function updateRepelRects() {
    repelRects = [];
    try {
      const cv = document.getElementById('ascii');
      if (!cv) return;
      const cvBox = cv.getBoundingClientRect();
      const dock = document.getElementById('dock');
      const dockHidden = dock && (!dock.classList.contains('show') ||
        dock.classList.contains('idle') || dock.classList.contains('reveal-hidden'));
      const push = (el, rad) => {
        if (!el) return;
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden') return;
        if (style.opacity === '0') return;
        const b = el.getBoundingClientRect();
        if (b.width < 4 || b.height < 4) return;
        repelRects.push({ x: b.left - cvBox.left, y: b.top - cvBox.top, w: b.width, h: b.height, r: rad });
      };
      if (!dockHidden) push(document.querySelector('.card'), 16);
      const panel = document.getElementById('spotifyPanel');
      if (panel && panel.classList.contains('show') && !panel.classList.contains('idle')) {
        push(panel.querySelector('.spotify-frame-wrap'), 12);
      }
      // Gate pre-play: el botón flota en una zona de glifos calmados,
      // el mismo lenguaje de "silencio" que el título-anomalía. Radio 48
      // (mitad del lado): la exclusión sigue el CÍRCULO del botón, sin
      // bolsillos de esquina.
      const gate = document.getElementById('playGate');
      if (gate && !gate.classList.contains('hidden')) {
        push(document.getElementById('playBtn'), 48);
      }
    } catch (e) { /* repulsion es decorativa, nunca rompe el render */ }
  }

  // Layout del título de bienvenida (D4): dos líneas centradas — el nombre
  // en Cormorant Garamond itálica (ya cargada en la página) y la id
  // SIEMPRE más pequeña en mono — renderizadas a un canvas offscreen para
  // extraer la máscara de tinta. Sobre un grid grueso (TITLE_CELL px) se
  // precalcula un campo de distancia/dirección hacia la tinta más cercana
  // (chamfer de 2 pasadas): el bucle de glifos lo consulta en O(1) para
  // excluir (tinta + margen estrecho) y empujar los glifos del halo hacia
  // fuera. Se recalcula solo si cambia el tamaño o al resolverse
  // document.fonts.ready (si Cormorant aún no cargó, la máscara quedaría
  // medida con la fuente fallback).
  // Tinte plano de la máscara de tinta (D5): se copia la máscara, se
  // rellena con source-in del color plano y, si se pide, se devuelve
  // desplazada (la capa clara queda "desregistrada" sobre la base).
  // Sin gradiente, sombra ni glow: dos niveles de gris y nada más.
  function tintMask(src, rgba, dx, dy) {
    const t = document.createElement('canvas');
    t.width = src.width; t.height = src.height;
    const tg = t.getContext('2d');
    tg.drawImage(src, 0, 0);
    tg.globalCompositeOperation = 'source-in';
    tg.fillStyle = 'rgba(' + rgba[0] + ',' + rgba[1] + ',' + rgba[2] +
                   ',' + rgba[3] + ')';
    tg.fillRect(0, 0, t.width, t.height);
    if (!dx && !dy) return t;
    const c = document.createElement('canvas');
    c.width = src.width; c.height = src.height;
    c.getContext('2d').drawImage(t, dx, dy);
    return c;
  }

  function layoutWelcomeTitle(w, h) {
    titleBox = null; titleGrid = null; titleInkLayer = null; titleLightLayer = null;
    const fs = Math.round(Math.max(34, Math.min(w * 0.075, h * 0.16)));
    const fsId = Math.round(fs * 0.42); // la id siempre más pequeña
    const gap = Math.round(fs * 0.20);
    const y0 = Math.round(h * 0.16);    // por encima del gate centrado
    const famTitle = "'Cormorant Garamond', Georgia, serif";
    const famId = "'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace";
    const lines = [];
    try {
      const off = document.createElement('canvas');
      off.width = w; off.height = h;
      const octx = off.getContext('2d', { willReadFrequently: true });
      octx.textBaseline = 'top';
      octx.fillStyle = '#fff';
      const f1 = 'italic 500 ' + fs + 'px ' + famTitle;
      octx.font = f1;
      const w1 = octx.measureText(TITLE_TEXT).width;
      const x1 = Math.round((w - w1) / 2);
      octx.fillText(TITLE_TEXT, x1, y0);
      lines.push({ font: f1, text: TITLE_TEXT, x: x1, y: y0 });
      const y1 = y0 + Math.round(fs * 0.95) + gap;
      const f2 = fsId + 'px ' + famId;
      octx.font = f2;
      const w2 = octx.measureText(TITLE_ID).width;
      const x2 = Math.round((w - w2) / 2);
      octx.fillText(TITLE_ID, x2, y1);
      lines.push({ font: f2, text: TITLE_ID, x: x2, y: y1 });

      // Máscara de tinta por celda del grid (celda = "ink" si algún píxel
      // de la celda tiene alfa) + chamfer 2D: dist (en celdas) y vector
      // unitario hacia la tinta más cercana (primer salto del camino).
      const gw = Math.ceil(w / TITLE_CELL), gh = Math.ceil(h / TITLE_CELL);
      const img = octx.getImageData(0, 0, w, h).data;
      const ink = new Uint8Array(gw * gh);
      let inkCount = 0;
      for (let py = 0; py < h; py++) {
        const rowBase = ((py / TITLE_CELL) | 0) * gw;
        const rowOff = py * w;
        for (let px = 0; px < w; px++) {
          if (img[(rowOff + px) * 4 + 3] > 40) {
            const gi = rowBase + ((px / TITLE_CELL) | 0);
            if (!ink[gi]) { ink[gi] = 1; inkCount++; }
          }
        }
      }
      if (inkCount === 0) { // sin tinta medible: título sin repel
        titleBox = { w: w, h: h, lines: lines };
        return;
      }
      const INF = 1e9;
      const dist = new Float64Array(gw * gh).fill(INF);
      const dirX = new Float64Array(gw * gh);
      const dirY = new Float64Array(gw * gh);
      for (let i = 0; i < gw * gh; i++) if (ink[i]) dist[i] = 0;
      // Chamfer de 2 pasadas: relax con vecinos cardinales (peso 1) y
      // diagonales (peso √2); el vector guarda el salto hacia la tinta.
      function relax(gx, gy, nbs) {
        const i = gy * gw + gx;
        if (dist[i] === 0) return;
        for (let n = 0; n < nbs.length; n++) {
          const nx = gx + nbs[n][0], ny = gy + nbs[n][1];
          if (nx < 0 || ny < 0 || nx >= gw || ny >= gh) continue;
          const nd = dist[ny * gw + nx] + nbs[n][2];
          if (nd < dist[i]) {
            dist[i] = nd;
            const inv = 1 / nbs[n][2];           // unitario: cardenal o diagonal
            dirX[i] = nbs[n][0] * inv;
            dirY[i] = nbs[n][1] * inv;
          }
        }
      }
      const fwd = [[-1, 0, 1], [0, -1, 1], [-1, -1, 1.4142], [1, -1, 1.4142]];
      for (let gy = 0; gy < gh; gy++) {
        for (let gx = 0; gx < gw; gx++) relax(gx, gy, fwd);
      }
      const bwd = [[1, 0, 1], [0, 1, 1], [1, 1, 1.4142], [-1, 1, 1.4142]];
      for (let gy = gh - 1; gy >= 0; gy--) {
        for (let gx = gw - 1; gx >= 0; gx--) relax(gx, gy, bwd);
      }
      titleGrid = { gw: gw, gh: gh, ink: ink, dist: dist,
                    dirX: dirX, dirY: dirY, inkCount: inkCount };
      titleBox = { w: w, h: h, lines: lines };
      // Relleno de dos capas (D5): la forma del título deja de ser un
      // hueco mudo y se lee como tipografía — tinta gris plana con un
      // contraluz más claro desplazado. Se pinta una vez aquí; por frame
      // solo son dos drawImage (con el revelado mientras abre).
      titleLightLayer = tintMask(off, TITLE_FILL_LIGHT,
                                 TITLE_FILL_DX, TITLE_FILL_DY);
      titleInkLayer = tintMask(off, TITLE_FILL_BASE, 0, 0);
      titleMixLayer = document.createElement('canvas');
      titleMixLayer.width = w; titleMixLayer.height = h;
      // Auto-revelado (D4): el vacío abre L->R en ~1.5 s; bajo
      // reduced-motion aparece ya revelado (t0 muy negativo).
      try {
        titleRevealT0 = (window.matchMedia &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches)
          ? -1e9 : performance.now();
      } catch (e) { titleRevealT0 = performance.now(); }
    } catch (e) {
      titleGrid = null; titleBox = null;
    }
  }

  // Si Cormorant llega tarde, la máscara quedó medida con la fallback:
  // al resolverse document.fonts la invalidamos para forzar el re-layout
  // (solo pre-play; tras el gate el título ya no existe).
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      try {
        if (!window.__FX || !window.__FX.welcomeDone) titleBox = null;
      } catch (e) { /* decorativo */ }
    }).catch(() => {});
  }

  let lastTime = 0;

  // ---------------------------------------------------------------------
  // 1. Descarga + descompresión del blob binario
  // ---------------------------------------------------------------------
  // Los datos del campo ASCII ya NO viajan inline en el HTML: eran 5,9 MB de
  // base64 metidos en index.html, asi que el navegador tenia que parsear 6,5 MB
  // de HTML antes de pintar nada (y en movil/Brave se notaba). Ahora es un .gz
  // real en assets/, que además el servidor puede comprimir/cachear y del que
  // se puede medir el progreso de verdad.
  const ASCII_DATA_URL = 'assets/ascii_data.bin.gz';

  async function loadData(onProgress) {
    onProgress(0.02);
    const res = await fetch(ASCII_DATA_URL);
    if (!res.ok) {
      throw new Error('No se pudo cargar ' + ASCII_DATA_URL + ' (HTTP ' + res.status + ')');
    }
    const total = Number(res.headers.get('content-length') || 0);
    let bytes;
    if (res.body && typeof res.body.getReader === 'function' && total > 0) {
      // Progreso REAL de descarga cuando el servidor da Content-Length.
      const reader = res.body.getReader();
      const chunks = [];
      let got = 0;
      for (;;) {
        const r = await reader.read();
        if (r.done) break;
        chunks.push(r.value);
        got += r.value.length;
        onProgress(0.02 + 0.70 * Math.min(1, got / total));
      }
      bytes = new Uint8Array(got);
      let off = 0;
      for (let i = 0; i < chunks.length; i++) { bytes.set(chunks[i], off); off += chunks[i].length; }
    } else {
      bytes = new Uint8Array(await res.arrayBuffer());
      onProgress(0.72);
    }

    // gzip -> raw. DecompressionStream nativo si existe; si no, pako, que ahora
    // va EMPAQUETADO (antes venia de un CDN: si caia, la pagina se quedaba
    // en blanco en navegadores sin DecompressionStream).
    let rawBuf;
    if (typeof DecompressionStream !== 'undefined') {
      const ds = new DecompressionStream('gzip');
      const stream = new Blob([bytes]).stream().pipeThrough(ds);
      rawBuf = await new Response(stream).arrayBuffer();
    } else {
      const inflated = pako.inflate(bytes);
      rawBuf = inflated.buffer.slice(inflated.byteOffset, inflated.byteOffset + inflated.byteLength);
    }
    onProgress(0.92);

    const dv = new DataView(rawBuf);
    // Header: magic (4 bytes "ASCV") + n_frames (u32) + w (u32) + h (u32)
    const magic = String.fromCharCode(dv.getUint8(0), dv.getUint8(1), dv.getUint8(2), dv.getUint8(3));
    if (magic !== 'ASCV') {
      throw new Error('Formato de datos inválido');
    }
    const nFrames = dv.getUint32(4, true);
    const gridW = dv.getUint32(8, true);
    const gridH = dv.getUint32(12, true);
    const dataStart = 16;
    const frames = new Uint8Array(rawBuf, dataStart, nFrames * gridW * gridH);

    state.nFrames = nFrames;
    state.gridW = gridW;
    state.gridH = gridH;
    state.frames = frames;
    state.density = gridW; // por defecto, densidad completa

    onProgress(1.0);
  }

  // ---------------------------------------------------------------------
  // 2. Layout / resize
  // ---------------------------------------------------------------------
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    computeGrid(w, h);
  }

  function computeGrid(w, h) {
    // El video fuente es cuadrado (1:1). Cubrimos toda la pantalla (object-fit: cover)
    // manteniendo aspecto cuadrado, recortando lo que sobre por los costados.
    const target = state.density; // celdas por lado del cuadro fuente que usamos
    const side = Math.max(w, h);
    cellPx = side / target;

    cols = Math.ceil(w / cellPx) + 1;
    rows = Math.ceil(h / cellPx) + 1;

    ctx.font = `${Math.ceil(cellPx * 1.28)}px 'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace`;
    ctx.textBaseline = 'top';
  }

  // ---------------------------------------------------------------------
  // 3. Sampling de una celda del grid fuente (con submuestreo si density < gridW)
  // ---------------------------------------------------------------------
  function sampleBrightness(frameOffset, gx, gy) {
    // gx, gy en coordenadas del grid fuente (0..gridW-1, 0..gridH-1)
    const idx = frameOffset + gy * state.gridW + gx;
    return state.frames[idx];
  }

  // ---------------------------------------------------------------------
  // 4. Render de un frame completo
  // ---------------------------------------------------------------------
  let rngState = 12345;
  function xorshift() {
    // PRNG rápido y determinista (evita coste de Math.random en loops calientes)
    rngState ^= rngState << 13; rngState >>>= 0;
    rngState ^= rngState >>> 17;
    rngState ^= rngState << 5; rngState >>>= 0;
    return (rngState >>> 0) / 4294967295;
  }

  function drawFrame() {
    const w = canvas.width / (window.devicePixelRatio ? Math.min(window.devicePixelRatio, 2) : 1);
    const h = canvas.height / (window.devicePixelRatio ? Math.min(window.devicePixelRatio, 2) : 1);

    // El fondo negro NO lo pinta este canvas (D1): la capa 3D de debajo
    // limpia a negro, así que aquí solo se borra para dejar TRANSPARENTE
    // donde no hay glifo ni velo y la ola se ve a través del campo.
    ctx.clearRect(0, 0, w, h);

    // Velo de fondo del sub-bass (D3): el negro "respira" con el grave.
    // Se pinta ANTES de los glifos: aclara el canvas entero (luminance
    // puro, tono del reposo, "solo aclara independiente del color") sin
    // lavar los caracteres. En reposo sub = 0 -> nada. Sin análisis
    // (pre-gate, file://): nada.
    const fx = window.__FX;
    const okFx = !!(fx && fx.ok);
    const sMix = okFx ? Math.min(1, fx.sub) : 0;
    if (sMix > 0.02) {
      ctx.fillStyle = 'rgba(232,232,230,' + (sMix * 0.14).toFixed(3) + ')';
      ctx.fillRect(0, 0, w, h);
    }

    // Color reactivo de los glifos: reposo atenuado rgba(232,232,230,0.62)
    // -> blanco puro SOLO con el sub-bass. El bombo ya NO toca el glifo
    // (D2): su ola vive en la capa 3D, detrás.
    // Sin análisis: sub = 0 -> reposo estático exacto.
    const cR = 232 + 23 * sMix, cG = 232 + 23 * sMix, cB = 230 + 25 * sMix;
    const baseA = 0.62 + 0.38 * sMix;
    const baseFill = 'rgba(' + Math.round(cR) + ',' + Math.round(cG) + ',' +
                     Math.round(cB) + ',' + baseA.toFixed(3) + ')';
    ctx.fillStyle = baseFill;

    // --- Título de bienvenida (solo pre-play, D4) ------------------------
    // Máscara tipográfica + campo de empuje (layoutWelcomeTitle). Vive
    // hasta el primer play del gate (FX.welcomeDone) y no vuelve hasta
    // recargar. Decorativo: va pintado en el canvas, jamás intercepta.
    if (fx && fx.welcomeDone) {
      if (titleGrid || titleBox) { titleGrid = null; titleBox = null; }
    } else if (!titleBox || titleBox.w !== w || titleBox.h !== h) {
      layoutWelcomeTitle(w, h);
    }

    const gridW = state.gridW, gridH = state.gridH;
    const density = state.density;
    const frameOffset = state.frameIndex * gridW * gridH;

    // Escala del grid fuente (a resolución 'density') hacia el grid de celdas visibles en pantalla.
    // Centramos el recorte cuadrado en pantalla (object-fit: cover).
    const screenSide = Math.max(w, h);
    const offX = (w - screenSide) / 2;
    const offY = (h - screenSide) / 2;

    const step = gridW / density; // cuántas celdas-fuente por celda-densidad

    // iteramos en celdas de pantalla
    const startCol = Math.floor(-offX / cellPx);
    const endCol = Math.ceil((w - offX) / cellPx);
    const startRow = Math.floor(-offY / cellPx);
    const endRow = Math.ceil((h - offY) / cellPx);

    const flicker = state.flickerProb;
    const gamma = state.gamma;

    // El canvas 2D ya no lleva la onda del bombo (D2): solo el reloj para
    // el revelado del título y el puntero de la capa 3D.
    const nowMs = performance.now();

    // Auto-revelado del vacío (D4): la exclusión/empuje abre de izquierda
    // a derecha tras construir la máscara (~1.5 s); reduced-motion =>
    // titleRevealT0 muy negativo = instantáneo.
    const revealX = titleGrid
      ? w * Math.min(1, Math.max(0, (nowMs - titleRevealT0) / 1500))
      : null;

    for (let cy = startRow; cy < endRow; cy++) {
      const gy = Math.min(gridH - 1, Math.max(0, Math.floor(cy * step)));
      const py = offY + cy * cellPx;
      if (py < -cellPx || py > h) continue;

      for (let cx = startCol; cx < endCol; cx++) {
        const gx = Math.min(gridW - 1, Math.max(0, Math.floor(cx * step)));
        const px = offX + cx * cellPx;
        if (px < -cellPx || px > w) continue;

        const b = state.frames[frameOffset + gy * gridW + gx];

        // Fondo casi negro real -> espacio (mantiene el negro sólido)
        if (b < 14) continue;

        // Repulsion dura con forma de card (UI: dock/panel): dentro +
        // margen = skip 100%, sin filtraciones.
        if (repelRects.length) {
          let excluded = false;
          for (let ri = 0; ri < repelRects.length && !excluded; ri++) {
            const r = repelRects[ri];
            // Early-out por bbox del margen (barato) antes del test rounded-rect.
            const m = REPEL_MARGIN;
            if (px < r.x - m || px > r.x + r.w + m || py < r.y - m || py > r.y + r.h + m) continue;
            if (pointInExclusion(px, py, r)) excluded = true;
          }
          if (excluded) continue;
        }

        // Título pre-play (D4): espacio negativo — la forma de las letras
        // es el hueco que dejan los glifos excluidos. Dentro (d <= HARD)
        // -> skip; en el halo -> empuje del vector que saca el CUERPO del
        // glifo (origen a halo+despeje, direccional); destino cerca de
        // otra letra -> descart. El auto-revelado (D4) abre el vacío L->R
        // con borde suave: factor rvf (dither temporal en la franja).
        let glyphDx = 0, glyphDy = 0;
        if (titleGrid) {
          let rvf = 1;
          if (revealX !== null) {
            rvf = (revealX + 40 - px) / 40;      // franja suave de 40 px
            if (rvf < 0) rvf = 0; else if (rvf > 1) rvf = 1;
          }
          if (rvf > 0 && (rvf >= 1 || xorshift() < rvf)) {
            const gi = ((py / TITLE_CELL) | 0) * titleGrid.gw + ((px / TITLE_CELL) | 0);
            const dpx = titleGrid.dist[gi] * TITLE_CELL;   // px a la forma
            if (dpx <= TITLE_HARD) continue;
            const dB = Math.abs(titleGrid.dirX[gi]) + Math.abs(titleGrid.dirY[gi]);
            const BE = Math.ceil(cellPx * 1.3 * dB);        // cuerpo del glifo
            const need = (TITLE_HALO + BE) - dpx;
            if (need > 0) {
              const nx2 = px - titleGrid.dirX[gi] * need;
              const ny2 = py - titleGrid.dirY[gi] * need;
              // El destino puede caer cerca de OTRA letra (huecos entre
              // letras): debe despejar el halo también allí — si no, fuera.
              const gj = ((ny2 / TITLE_CELL) | 0) * titleGrid.gw + ((nx2 / TITLE_CELL) | 0);
              const dBd = Math.abs(titleGrid.dirX[gj]) + Math.abs(titleGrid.dirY[gj]);
              const BEdest = Math.ceil(cellPx * 1.3 * dBd);
              const gd = titleGrid.dist[gj] * TITLE_CELL;
              if (gd < TITLE_HALO + BEdest) continue;
              glyphDx = (nx2 - px) * rvf;
              glyphDy = (ny2 - py) * rvf;
            }
          }
        }

        let idx = rampIndexForBrightness(b, gamma);

        // Parpadeo controlado: con probabilidad `flicker`, saltamos a un
        // carácter vecino en densidad (no aleatorio total) para que el
        // "ruido" no cambie la silueta general, solo la textura.
        if (flicker > 0 && xorshift() < flicker) {
          const jitter = (xorshift() < 0.5 ? -1 : 1) * (1 + Math.floor(xorshift() * 3));
          idx = Math.min(RAMP_LEN - 1, Math.max(1, idx + jitter));
        }

        // El bombo ya no pinta glifos (D2): la ola vive en la capa 3D,
        // detrás del campo. El glifo solo reacciona al sub-bass.

        const ch = RAMP[idx];
        if (ch === ' ') continue;

        ctx.fillText(ch, px + glyphDx, py + glyphDy);
      }
    }

    // --- Relleno del título: dos capas dentro de la forma (D5) -----------
    // Solo pre-play. Comparte el revelado L->R del hueco: mientras abre se
    // compone en un canvas auxiliar con un borde suave de 40px; al
    // terminar, dos drawImage directos (fast-path).
    if (titleInkLayer && titleLightLayer && !(fx && fx.welcomeDone)) {
      if (revealX >= w - 1) {
        ctx.drawImage(titleLightLayer, 0, 0);
        ctx.drawImage(titleInkLayer, 0, 0);
      } else if (titleMixLayer && titleMixLayer.width === w) {
        const m = titleMixLayer.getContext('2d');
        m.globalCompositeOperation = 'source-over';
        m.clearRect(0, 0, w, h);
        m.drawImage(titleLightLayer, 0, 0);
        m.drawImage(titleInkLayer, 0, 0);
        const edge = Math.max(1, revealX + 40);
        const gr = m.createLinearGradient(0, 0, edge, 0);
        gr.addColorStop(0, 'rgba(0,0,0,1)');
        gr.addColorStop(Math.max(0, Math.min(1, revealX / edge)), 'rgba(0,0,0,1)');
        gr.addColorStop(1, 'rgba(0,0,0,0)');
        m.globalCompositeOperation = 'destination-in';
        m.fillStyle = gr;
        m.fillRect(0, 0, edge, h);
        m.globalCompositeOperation = 'source-over';
        ctx.drawImage(titleMixLayer, 0, 0);
      }
    }

  }


  // ---------------------------------------------------------------------
  // 5. Loop de animación (independiente del framerate del navegador)
  // ---------------------------------------------------------------------
  function tick(ts) {
    requestAnimationFrame(tick);

    // Capa 3D (D1): se actualiza en el MISMO bucle que el canvas 2D (sin
    // segundo rAF) y solo si ya se inicializó tras el play. Es decorativa:
    // cualquier fallo se traga y la página sigue.
    if (window.__GL3D && window.__GL3D.update) {
      try { window.__GL3D.update(ts); } catch (e) { /* 3D decorativo */ }
    }

    if (!state.frames) return;

    if (!lastTime) lastTime = ts;
    const dt = ts - lastTime;
    lastTime = ts;

    if (state.playing) {
      state.accum += dt * state.speedMul;
      const frameDur = 1000 / state.fps;
      while (state.accum >= frameDur) {
        state.accum -= frameDur;
        state.frameIndex = (state.frameIndex + 1) % state.nFrames;
      }
    }

    if (window.__FX && window.__FX.update) {
      try { window.__FX.update(ts); } catch (e) { /* análisis decorativo */ }
    }

    drawFrame();
  }

  // ---------------------------------------------------------------------
  // 6. Sin UI de ajustes en esta versión: el fondo corre siempre a los
  //    valores por defecto definidos en `state` (densidad máxima, parpadeo
  //    fijo, velocidad 1x, gamma neutro). Solo queda el listener de resize.
  // ---------------------------------------------------------------------
  function setupUI() {
    window.addEventListener('resize', () => { resize(); updateRepelRects(); });
    // Respaldo ocasional; la via principal son llamadas sincronas en cada cambio.
    setInterval(updateRepelRects, 2000);
    // Llamada inicial: el gate (con su repel) es visible desde el load y no
    // puede esperar al primer tick del interval.
    updateRepelRects();
    // Exponer para que el overlay refresque tras abrir/cerrar panel.
    window.__updateRepelRects = updateRepelRects;
    // Lectura de estado del título de bienvenida (solo verificación).
    window.__welcomeState = () => {
      const g = titleGrid;
      return {
        done: !!(window.__FX && window.__FX.welcomeDone),
        n: g ? g.inkCount : 0,          // celdas de tinta de la máscara
        lines: titleBox ? titleBox.lines.length : 0,
        hard: TITLE_HARD, halo: TITLE_HALO, cell: TITLE_CELL,
        revealT0: titleRevealT0,
        fill: { base: TITLE_FILL_BASE, light: TITLE_FILL_LIGHT,
                dx: TITLE_FILL_DX, dy: TITLE_FILL_DY,
                painted: !!(titleInkLayer && titleLightLayer) },
        fonts: titleBox ? titleBox.lines.map(l => l.font) : []
      };
    };
    // Campo de distancia/tinta del título (solo verificación, lectura).
    window.__titleField = () => titleGrid;
  }

  // ---------------------------------------------------------------------
  // 6bis. CAPA 3D (Three.js) DEBAJO de los glifos — olas glassmorphism y
  //      halo de sub-bass (D1-D5). Puntos clave:
  //      · Se inicializa LAZOSAMENTE tras el play (antes, cero WebGL).
  //      · Three.js vendorizado en assets/vendor/ (sin CDN, sin red).
  //      · Sin post-procesado: geometría aditiva con un shader de 3 capas
  //        (núcleo suave + canto cromático + especular) y pool de 3 olas.
  //      · Olas (kick) y halo (sub-bass) son subsistemas SEPARADOS: no se
  //        pasan referencias; solo leen pasivamente FX.kickEvents/FX.sub.
  //      · Degrada en silencio: sin WebGL, sin análisis o con el contexto
  //        perdido, la capa queda negra y el resto sigue igual.
  // ---------------------------------------------------------------------
  const GL3D_CAP = 3;               // olas simultáneas (sin estrobear)
  const GL3D_LIFE = 1400;           // ms de vida de una ola de bombo
  const GL3D_START_LIFE = 1500;     // ms de la ola de arranque
  const GL3D_SPEED = 1.05;          // radios de pantalla por segundo
  const GL3D_PAL = [[191, 112, 96], [191, 131, 120], [159, 76, 60], [128, 48, 32]];

  // Shader de la ola: d = distancia normalizada al centro (en UV), R = radio
  // actual. Núcleo suave + canto cromático (mezcla con el complementario en
  // el borde exterior) + especular (banda estrecha desplazada en ángulo).
  const GL3D_WAVE_FRAG = [
    'precision mediump float;',
    'varying vec2 vUv;',
    'uniform vec3 uColor;',
    'uniform vec3 uRim;',
    'uniform float uR;',      // radio 0..1
    'uniform float uThick;',  // grosor 0..1
    'uniform float uAlpha;',
    'uniform float uHot;',    // 0 = cuerpo, 1 = filamento de arranque
    'void main() {',
    '  vec2 p = vUv - 0.5;',
    '  float d = length(p) * 2.0;',
    '  float ang = atan(p.y, p.x);',
    '  float band = abs(d - uR) / max(0.001, uThick);',
    '  float core = 1.0 - smoothstep(0.0, 1.0, band);',
    '  float rim  = smoothstep(0.55, 1.0, band) * (1.0 - smoothstep(1.0, 1.35, band));',
    '  float spec = exp(-pow((ang - 0.9) * 0.9, 2.0)) * exp(-pow((d - uR) * 26.0, 2.0));',
    '  vec3 col = uColor * (core * (0.75 + 0.25 * uHot));',
    '  col += uRim * rim * 0.85;',
    '  col += vec3(1.0) * spec * (0.35 + 0.45 * uHot);',
    '  float a = (core * 0.8 + rim * 0.55 + spec * 0.6) * uAlpha;',
    '  gl_FragColor = vec4(col * a, a);',
    '}'
  ].join('\n');

  const GL3D_VERT = [
    'varying vec2 vUv;',
    'void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }'
  ].join('\n');

  // Shader del halo de sub-bass: gradiente radial suave a pantalla completa.
  const GL3D_HALO_FRAG = [
    'precision mediump float;',
    'varying vec2 vUv;',
    'uniform vec3 uColor;',
    'uniform float uAlpha;',
    'void main() {',
    '  vec2 p = (vUv - 0.5) * vec2(1.0, 1.0);',
    '  float d = length(p) * 2.0;',
    '  float g = pow(max(0.0, 1.0 - d), 2.2);',
    '  float a = g * uAlpha;',
    '  gl_FragColor = vec4(uColor * a, a);',
    '}'
  ].join('\n');

  const GL3D = {
    ready: false, failed: false, three: null, renderer: null,
    scene: null, camera: null, pool: [], halo: null,
    waveSystem: null, bassHalo: null, w: 0, h: 0,
    seq: 0,        // identidad estable de cada ola (verificacion)
    // Trazas de verificacion (solo lectura desde fuera; el render no las usa).
    probe: {
      kicks: 0, haloAtKick: [], haloDeltas: [], wavesAtHalo: [],
      lastHalo: 0, startups: 0, maxWaves: 0, maxAlpha: 0
    }
  };

  function gl3dRim(rgb) {
    // Complementario suave para el canto cromático: invierte el matiz sin
    // salir de la familia cálida de la portada.
    return [rgb[2] * 0.9 + 40, rgb[0] * 0.55 + 30, rgb[1] * 0.7 + 60];
  }

  // Tope de pixeles del buffer 3D. Las olas y el halo son superficies de
  // cristal suave y muy difusas: a 960 px de lado largo se ven igual que a
  // 2x, y el relleno de fragmento (hasta 4 capas aditivas a pantalla
  // completa) baja a menos de la mitad. El canvas se escala por CSS, asi que
  // la composicion sobre los glifos no cambia. `antialias` va apagado: las
  // formas se calculan en el fragment shader, no hay aristas que suavizar.
  const GL3D_MAX_PX = 960;
  function gl3dDpr() {
    const w = window.innerWidth || 1, h = window.innerHeight || 1;
    return Math.min(window.devicePixelRatio || 1, 1.5,
                    GL3D_MAX_PX / Math.max(1, Math.max(w, h)));
  }

  function gl3dInit() {
    if (GL3D.ready || GL3D.failed) return GL3D.ready;
    try {
      const cv = document.getElementById('gl');
      if (!cv) { GL3D.failed = true; return false; }
      // Import perezoso del módulo vendorizado: sin CDN, sin red.
      const THREE = window.__GL3D_THREE__;
      if (!THREE) { GL3D.failed = true; return false; }
      const dpr = gl3dDpr();
      const renderer = new THREE.WebGLRenderer({
        canvas: cv, antialias: false, alpha: false, powerPreference: 'low-power'
      });
      renderer.setPixelRatio(dpr);
      renderer.setClearColor(0x000000, 1);
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
      camera.position.z = 2;
      const geo = new THREE.PlaneGeometry(2, 2);

      // --- Sistema de olas (kick) --------------------------------------
      const waveSystem = {
        items: [],
        emit: function (colorIdx, hot) {
          if (this.items.length >= GL3D_CAP) this.items.shift();
          const c = GL3D_PAL[((colorIdx % GL3D_PAL.length) + GL3D_PAL.length) % GL3D_PAL.length];
          const mat = new THREE.ShaderMaterial({
            vertexShader: GL3D_VERT, fragmentShader: GL3D_WAVE_FRAG,
            uniforms: {
              uColor: { value: new THREE.Color(c[0] / 255, c[1] / 255, c[2] / 255) },
              uRim: { value: new THREE.Color(...gl3dRim(c).map(v => v / 255)) },
              uR: { value: 0 }, uThick: { value: hot ? 0.16 : 0.10 },
              uAlpha: { value: 0 }, uHot: { value: hot ? 1 : 0 }
            },
            transparent: true, blending: THREE.AdditiveBlending,
            depthWrite: false, depthTest: false
          });
          const mesh = new THREE.Mesh(geo, mat);
          mesh.frustumCulled = false;
          scene.add(mesh);
          this.items.push({
            mesh: mesh, mat: mat, t0: performance.now(),
            life: hot ? GL3D_START_LIFE : GL3D_LIFE, hot: !!hot,
            id: ++GL3D.seq
          });
        },
        update: function (now) {
          for (let i = this.items.length - 1; i >= 0; i--) {
            const it = this.items[i];
            const t = (now - it.t0) / it.life;                 // 0..1
            if (t >= 1) {
              scene.remove(it.mesh);
              it.mat.dispose();
              this.items.splice(i, 1);
              continue;
            }
            const u = it.mat.uniforms;
            u.uR.value = Math.min(1.6, t * GL3D_SPEED * 1.6);
            // Envolvente: sube rápido, cae suave (sin estrobear).
            u.uAlpha.value = Math.min(1, t * 8) * Math.pow(1 - t, 1.6) * (it.hot ? 0.95 : 0.62);
            u.uThick.value = (it.hot ? 0.20 : 0.11) * (1 + t * 1.6);
          }
        },
        clear: function () {
          this.items.forEach(it => { scene.remove(it.mesh); it.mat.dispose(); });
          this.items.length = 0;
        }
      };

      // --- Halo de sub-bass (independiente de las olas) ---------------
      const bassHalo = {
        mesh: null, level: 0, colorIdx: 0,
        build: function () {
          const mat = new THREE.ShaderMaterial({
            vertexShader: GL3D_VERT, fragmentShader: GL3D_HALO_FRAG,
            uniforms: {
              uColor: { value: new THREE.Color(0.55, 0.35, 0.30) },
              uAlpha: { value: 0 }
            },
            transparent: true, blending: THREE.AdditiveBlending,
            depthWrite: false, depthTest: false
          });
          const m = new THREE.Mesh(geo, mat);
          m.frustumCulled = false;
          scene.add(m);
          this.mesh = m;
        },
        update: function (now, sub) {
          if (!this.mesh) this.build();
          // Envolvente PROPIA (independiente de la del canvas 2D): ataque
          // lento, release algo más rápido.
          const target = Math.max(0, Math.min(1, sub));
          const a = target > this.level ? 0.06 : 0.035;
          this.level += (target - this.level) * a;
          if (this.level < 0.002) this.level = 0;
          const u = this.mesh.material.uniforms;
          u.uAlpha.value = this.level * 0.20;
          // Deriva muy lenta de tono dentro de la paleta (independiente).
          this.colorIdx = (now * 0.00004) % 1;
          const c = GL3D_PAL[Math.floor(this.colorIdx * GL3D_PAL.length) % GL3D_PAL.length];
          u.uColor.value.setRGB(c[0] / 255, c[1] / 255, c[2] / 255);
        }
      };

      GL3D.three = THREE; GL3D.renderer = renderer; GL3D.scene = scene;
      GL3D.camera = camera; GL3D.waveSystem = waveSystem; GL3D.bassHalo = bassHalo;
      GL3D.ready = true;
      gl3dResize();
      // Contexto perdido: la capa se congela, la página sigue.
      cv.addEventListener('webglcontextlost', (e) => {
        e.preventDefault();
        GL3D.ready = false;
      }, false);
      cv.addEventListener('webglcontextrestored', () => {
        try { gl3dResize(); GL3D.ready = true; } catch (e2) { /* sigue negro */ }
      }, false);
      return true;
    } catch (e) {
      GL3D.failed = true; GL3D.ready = false;
      return false;
    }
  }

  function gl3dResize() {
    if (!GL3D.ready) return;
    const w = window.innerWidth, h = window.innerHeight;
    const dpr = gl3dDpr();
    const cv = document.getElementById('gl');
    GL3D.renderer.setPixelRatio(dpr);
    GL3D.renderer.setSize(w, h, false);
    cv.style.width = w + 'px'; cv.style.height = h + 'px';
    GL3D.w = w; GL3D.h = h;
    GL3D.drawnBlack = false;    // tras un resize hay que repintar
  }

  // Un UNICO import del módulo vendorizado, compartido por la perla del botón
  // (que se arma al cargar) y la capa de olas (que se arma en el play). Bajo
  // file:// los módulos ES no se pueden importar (CORS): se marca como no
  // disponible SIN intentarlo — así no hay error de consola — y cada capa cae
  // a su degradación (perla de CSS / canvas 2D).
  let threePromise = null;
  function threeModule() {
    // Three.js llega EMPAQUETADO (import estatico arriba): ya no hay ningun
    // import() en caliente, asi que no hay red, no hay carreras de carga y no
    // hay restriccion de modulos ES (que era lo que rompia la perla).
    if (window.__GL3D_THREE__) return Promise.resolve(window.__GL3D_THREE__);
    if (!threePromise) {
      window.__GL3D_THREE__ = THREE;
      threePromise = Promise.resolve(THREE);
    }
    return threePromise;
  }

  // Punto de entrada de la CAPA DE OLAS: se llama tras el play, dentro del
  // gesto del usuario. La perla puede haber cargado el módulo antes; si no, se
  // reintenta al próximo tick mediante window.__GL3D_THREE__.
  function gl3dBoot() {
    if (GL3D.ready || GL3D.failed) return;
    if (!window.__GL3D_THREE__) {
      threeModule().then(() => gl3dInit()).catch(() => { GL3D.failed = true; });
      return;
    }
    gl3dInit();
  }

  // Actualización por frame (llamada desde tick). Drena los bombos del
  // detector y los pinta como olas; el halo sigue al sub-bass. Ningún
  // subsistema toca el estado del otro.
  GL3D.update = function (nowMs) {
    if (!GL3D.ready) {
      // La capa de olas se arma SOLO en el play (gl3dBoot). No se auto-inicia
      // aqui: la perla del boton carga el modulo antes, y arrancarla desde el
      // tick encenderia la capa de oleaje antes de tiempo.
      return;
    }
    try {
      // Reloj propio del subsistema 3D (performance.now), coherente con
      // los t0 de emisión (no con el timestamp de rAF).
      const now = performance.now();
      const fx = window.__FX;
      // D4: instrumentacion de VERIFICACION. Solo escribe contadores
      // observables (nunca estado que el render use), asi que no altera el
      // comportamiento ni acopla los dos subsistemas.
      // El productor (FX, linea 1954) ya suprime los eventos con
      // reduced-motion; aqui solo se leen pasivamente y se pintan (D4: sin
      // guards duplicados que puedan anular la ola).
      if (fx && fx.kickEvents && fx.kickEvents.length) {
        for (const ev of fx.kickEvents.splice(0)) {
          GL3D.waveSystem.emit(ev.idx, false);
          GL3D.probe.kicks++;
          GL3D.probe.haloAtKick.push(+GL3D.bassHalo.level.toFixed(3));
        }
      }
      // Ola de arranque en cola (el import puede no haber resuelto aun).
      if (GL3D.pendingStartup !== null && GL3D.pendingStartup !== undefined) {
        GL3D.waveSystem.emit(GL3D.pendingStartup, true);
        GL3D.pendingStartup = null;
      }
      const sub = (fx && fx.ok) ? Math.min(1, fx.sub) : 0;
      // Traza del halo SOLO cuando cambia de forma apreciable (>0.02) y con
      // cuantas olas havia vivas en ese instante: si un kick alterase el
      // halo, su nivel daria un salto al pasar por 0.02 (D4).
      const hl = GL3D.bassHalo.level;
      const d = Math.abs(hl - GL3D.probe.lastHalo);
      if (d > 0.02) {
        GL3D.probe.haloDeltas.push(+d.toFixed(3));
        GL3D.probe.wavesAtHalo.push(GL3D.waveSystem.items.length);
        GL3D.probe.lastHalo = hl;
      }
      GL3D.bassHalo.update(now, sub);
      GL3D.waveSystem.update(now);
      // Coste: la escena son hasta 4 capas aditivas a pantalla completa. Sin
      // nada que pintar (sin olas y con el halo apagado) no se redibuja: el
      // frame anterior ya era negro y el buffer se conserva. Entre bombos —
      // que es la mayor parte del tiempo — la capa 3D no cuesta nada.
      const quiet = GL3D.waveSystem.items.length === 0
                    && GL3D.bassHalo.level < 0.004;
      if (!quiet || !GL3D.drawnBlack) {
        GL3D.renderer.render(GL3D.scene, GL3D.camera);
        GL3D.drawnBlack = quiet;
      }
    } catch (e) {
      // Nunca dejamos la página rota por el 3D.
      GL3D.ready = false;
    }
  };

  // La ola de arranque del play (D6): mismo sistema y pool, más grande.
  // Si el módulo aún no ha resuelto, se ENCOLA y se emite en el primer
  // update con la capa lista (si no, el import la perdería).
  // Con prefers-reduced-motion NO se emite (gate-play-ripple): la música
  // arranca igual, sin ola. El guard vive aquí —y no en el consumidor de
  // bombos— porque la ola de arranque se dispara desde el gate, no desde
  // FX.kickEvents (que ya viene suprimido bajo reduced-motion).
  GL3D.pendingStartup = null;
  let gl3dRM = null;
  try { gl3dRM = window.matchMedia('(prefers-reduced-motion: reduce)'); } catch (e) {}
  GL3D.emitStartup = function (colorIdx) {
    if (gl3dRM && gl3dRM.matches) return;
    const idx = colorIdx === undefined ? 0 : colorIdx;
    GL3D.probe.startups++;
    if (!GL3D.ready) { GL3D.pendingStartup = idx; return; }
    GL3D.waveSystem.emit(idx, true);
  };

  // Lectura BARATA del estado de la capa (sin GPU): la usan las sondas en
  // cada frame. El readPixels de GL3D.sample() es caro y roba fps al bucle
  // de glifos — y como el análisis de audio vive en tick(), un bucle lento
  // hace que el detector de bombo pierda transientes. Por eso el estado se
  // lee aquí y el readPixels solo de vez en cuando.
  GL3D.state = function () {
    if (!GL3D.ready || !GL3D.waveSystem) return null;
    return {
      waves: GL3D.waveSystem.items.length,
      ids: GL3D.waveSystem.items.map(i => i.id),
      ages: GL3D.waveSystem.items.map(i => Math.round(performance.now() - i.t0)),
      radii: GL3D.waveSystem.items.map(i => +i.mat.uniforms.uR.value.toFixed(3)),
      alphas: GL3D.waveSystem.items.map(i => +i.mat.uniforms.uAlpha.value.toFixed(3)),
      hot: GL3D.waveSystem.items.map(i => !!i.hot),
      halo: +GL3D.bassHalo.level.toFixed(3),
      seq: GL3D.seq
    };
  };

  // Muestreo de la capa para verificación (D8): render + readPixels en el
  // MISMO task, que es cuando el buffer sigue siendo válido sin
  // preserveDrawingBuffer (sin coste en producción). Devuelve el perfil
  // radial de croma: el frente de la ola aparece como un pico de color de
  // portada que avanza con el tiempo. CARO: solo para mediciones puntuales.
  GL3D.sample = function () {
    if (!GL3D.ready) return null;
    try {
      const r = GL3D.renderer, gl = r.getContext();
      r.render(GL3D.scene, GL3D.camera);
      const w = gl.drawingBufferWidth, h = gl.drawingBufferHeight;
      const px = new Uint8Array(w * h * 4);
      gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, px);
      const nb = 24, cn = new Array(nb).fill(0), cc = new Array(nb).fill(0),
            cl = new Array(nb).fill(0);
      let maxChroma = 0, lit = 0;
      for (let y = 0; y < h; y += 2) {
        for (let x = 0; x < w; x += 2) {
          const i = (y * w + x) * 4;
          const R = px[i], G = px[i + 1], B = px[i + 2];
          const m = Math.max(R, G, B), ch = m - Math.min(R, G, B);
          if (m > 50) lit++;
          if (R - G <= 4) continue;            // no es color de portada
          const dx = x - w / 2, dy = y - h / 2;
          const bi = Math.min(nb - 1, (Math.sqrt(dx * dx + dy * dy) / 40) | 0);
          cn[bi]++; cc[bi] += ch; cl[bi] += m;
          if (ch > maxChroma) maxChroma = ch;
        }
      }
      let peak = 0, pi = -1;
      for (let b = 0; b < nb; b++) {
        const mean = cn[b] ? cc[b] / cn[b] : 0;
        if (cn[b] >= 6 && mean > peak) { peak = mean; pi = b; }
      }
      return {
        w: w, h: h, lit: lit, maxChroma: maxChroma,
        peakBin: pi, peakR: pi < 0 ? -1 : pi * 40 + 20,
        peakChroma: peak,
        profile: cn.map((v, b) => v ? +(cc[b] / v).toFixed(1) : 0).join(','),
        waves: GL3D.waveSystem.items.length,
        ids: GL3D.waveSystem.items.map(i => i.id),
        ages: GL3D.waveSystem.items.map(i => Math.round(performance.now() - i.t0)),
        radii: GL3D.waveSystem.items.map(i => +i.mat.uniforms.uR.value.toFixed(3)),
        alphas: GL3D.waveSystem.items.map(i => +i.mat.uniforms.uAlpha.value.toFixed(3)),
        halo: +GL3D.bassHalo.level.toFixed(3)
      };
    } catch (e) { return null; }
  };

  // Estado para verificación.
  GL3D.snapshot = function () {
    const items = GL3D.ready ? GL3D.waveSystem.items : [];
    if (items.length > GL3D.probe.maxWaves) GL3D.probe.maxWaves = items.length;
    items.forEach(i => {
      if (i.mat.uniforms.uAlpha.value > GL3D.probe.maxAlpha) {
        GL3D.probe.maxAlpha = +i.mat.uniforms.uAlpha.value.toFixed(3);
      }
    });
    return {
      ready: GL3D.ready, failed: GL3D.failed,
      waves: items.length,
      cap: GL3D_CAP,
      // Separate the two subsystems so independence is measurable.
      waveAges: items.map(i => Math.round(performance.now() - i.t0)),
      waveHot: items.map(i => !!i.hot),
      waveAlphas: items.map(i => +i.mat.uniforms.uAlpha.value.toFixed(3)),
      waveRadii: items.map(i => +i.mat.uniforms.uR.value.toFixed(3)),
      halo: GL3D.ready ? +GL3D.bassHalo.level.toFixed(3) : 0,
      w: GL3D.w, h: GL3D.h,
      probe: GL3D.probe
    };
  };
  window.__GL3D = GL3D;
  window.__gl3dBoot = gl3dBoot;   // lo llama el play (otro script)
  window.__threeModule = threeModule;   // lo comparte la perla del boton

  // Resize: un solo handler para las dos capas (D1).
  const gl3dOriginalResize = resize;
  resize = function () {
    gl3dOriginalResize();
    gl3dResize();
  };

  // ---------------------------------------------------------------------
  // 7. Boot
  // ---------------------------------------------------------------------
  async function boot() {
    canvas = document.getElementById('ascii');
    ctx = canvas.getContext('2d', { alpha: true });

    const loader = document.getElementById('loader');
    const fill = document.getElementById('loaderFill');

    try {
      await loadData((p) => { fill.style.width = Math.floor(p * 100) + '%'; });
    } catch (err) {
      loader.innerHTML = '<div style="color:#c66">ERROR AL DECODIFICAR LOS DATOS</div>';
      console.error(err);
      return;
    }

    resize();
    setupUI();
    requestAnimationFrame(tick);

    setTimeout(() => loader.classList.add('hidden'), 220);
  }

  window.addEventListener('DOMContentLoaded', boot);
})();
