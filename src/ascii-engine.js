import pako from 'pako';
import { CHARS, RAMP_LEN, rampIndex, createRng, clamp } from './ramp.js';
import { sync } from './beat-sync.js';
import { BeatConductor, beatmapStatus } from './beatmap.js';
import { BeatFx, LANE, FX_STYLE, buildStyles, levelOf } from './beat-fx.js';
import { TitleMask } from './title-mask.js';
import { hasRepel, isExcluded, updateRepelRects } from './repel.js';

/* =========================================================================
   ASCII OUROBOROS — motor de render
   -------------------------------------------------------------------------
   1. assets/ascii_data.bin.gz trae, para cada uno de los 600 frames, una
      cuadricula de luminancia GRID_W x GRID_H (1 byte = 1 celda = 0-255).
   2. Se descomprime una sola vez (DecompressionStream, o pako de respaldo).
   3. Cada celda de brillo se mapea a un caracter de una rampa densa; con
      probabilidad FLICKER_PROB salta a un vecino de densidad (textura viva
      sin romper la silueta). El fondo casi negro del video se queda vacio.
   4. Los efectos de ritmo (beat-fx.js) modifican esas mismas celdas: que
      glifo, color, densidad y posicion. Ademas hacen aparecer glifos
      "fantasma" sobre el fondo negro mientras dura el golpe.
   5. Todo se dibuja en UN <canvas> con fillText, agrupando por estilo para no
      cambiar fillStyle por celda.

   El fondo negro lo pinta este canvas (ya no hay capa 3D debajo).
   ========================================================================= */

const ASCII_DATA_URL = 'assets/ascii_data.bin.gz';
const MAX_DPR = 2;
const FPS = 30;                 // velocidad de la animacion de fondo
const GAMMA = 1.0;
const FLICKER_PROB = 0.38;      // textura: prob. de saltar a un glifo vecino en densidad
const MIN_BRIGHTNESS = 14;      // por debajo = fondo negro real (sin glifo)
const MAX_FRAME_DT = 250;       // ms: tope tras pestana oculta

const STRIDE = FX_STYLE.levels + 1;
const N_STYLES = 5 * STRIDE;
const HI_FIRST_STYLE = LANE.HI * STRIDE;     // los estilos de chispas van al final
const STYLES = buildStyles();

const video = { nFrames: 0, gridW: 0, gridH: 0, frames: null };

let canvas = null, ctx = null;
let viewW = 0, viewH = 0;       // px CSS enteros (todo el motor trabaja en ellos)
let cellPx = 10;
let frameIndex = 0, accum = 0, lastTs = 0;

const rng = createRng(12345);
const title = new TitleMask();
const fx = new BeatFx();

// Reloj del frame en curso: el conductor fecha los efectos con el.
let frameTs = 0;
const conductor = new BeatConductor((lane, strength, durMs, lateMs) => {
  fx.spawn(lane + 1, strength, durMs, frameTs - lateMs);
});

// Operaciones de dibujo (se llenan en el bucle de celdas).
const ops = {
  cap: 0,
  x: new Float32Array(0), y: new Float32Array(0),
  ch: new Uint8Array(0), style: new Uint8Array(0), order: new Uint32Array(0),
};
const styleStart = new Uint32Array(N_STYLES + 1);

function allocOps(cols, rows) {
  const cap = cols * rows + 160 * 5 + 64;
  if (cap <= ops.cap) return;
  ops.cap = cap;
  ops.x = new Float32Array(cap);
  ops.y = new Float32Array(cap);
  ops.ch = new Uint8Array(cap);
  ops.style = new Uint8Array(cap);
  ops.order = new Uint32Array(cap);
}

// ---------------------------------------------------------------------------
// 1. Descarga + descompresion del blob binario
// ---------------------------------------------------------------------------
async function loadData(onProgress) {
  onProgress(0.02);
  const res = await fetch(ASCII_DATA_URL);
  if (!res.ok) throw new Error('No se pudo cargar ' + ASCII_DATA_URL + ' (HTTP ' + res.status + ')');
  const total = Number(res.headers.get('content-length') || 0);

  let bytes;
  if (res.body && typeof res.body.getReader === 'function' && total > 0) {
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
    for (const c of chunks) { bytes.set(c, off); off += c.length; }
  } else {
    bytes = new Uint8Array(await res.arrayBuffer());
    onProgress(0.72);
  }

  let rawBuf;
  if (typeof DecompressionStream !== 'undefined') {
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
    rawBuf = await new Response(stream).arrayBuffer();
  } else {
    const inflated = pako.inflate(bytes);
    rawBuf = inflated.buffer.slice(inflated.byteOffset, inflated.byteOffset + inflated.byteLength);
  }
  onProgress(0.92);

  // Cabecera: "ASCV" + n_frames (u32) + w (u32) + h (u32), little endian.
  const dv = new DataView(rawBuf);
  const magic = String.fromCharCode(dv.getUint8(0), dv.getUint8(1), dv.getUint8(2), dv.getUint8(3));
  if (magic !== 'ASCV') throw new Error('Formato de datos invalido');
  const nFrames = dv.getUint32(4, true);
  const gridW = dv.getUint32(8, true);
  const gridH = dv.getUint32(12, true);
  video.frames = new Uint8Array(rawBuf, 16, nFrames * gridW * gridH);
  video.nFrames = nFrames;
  video.gridW = gridW;
  video.gridH = gridH;
  onProgress(1);
}

// ---------------------------------------------------------------------------
// 2. Layout / resize
// ---------------------------------------------------------------------------
function resize() {
  viewW = Math.max(1, window.innerWidth);
  viewH = Math.max(1, window.innerHeight);
  const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

  canvas.width = Math.round(viewW * dpr);
  canvas.height = Math.round(viewH * dpr);
  canvas.style.width = viewW + 'px';
  canvas.style.height = viewH + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  // El video fuente es cuadrado y cubre la pantalla: la celda se dimensiona por el lado mayor.
  cellPx = Math.max(viewW, viewH) / video.gridW;
  allocOps(Math.ceil(viewW / cellPx) + 2, Math.ceil(viewH / cellPx) + 2);

  // Reasignar canvas.width reinicia el contexto: la fuente se fija despues.
  ctx.font = `${Math.ceil(cellPx * 1.28)}px 'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace`;
  ctx.textBaseline = 'top';
  updateRepelRects();
}

// ---------------------------------------------------------------------------
// 3. Render de un frame completo
// ---------------------------------------------------------------------------
function drawFrame(ts) {
  const w = viewW, h = viewH;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, w, h);

  // Titulo de bienvenida (solo pre-play).
  if (sync.welcomeDone) title.release(); else title.ensure(w, h, ts);
  const titleOn = title.active;
  const revealX = title.revealX(ts, w);

  // Ritmo. Decorativo: un fallo aqui jamas debe parar el campo de glifos.
  let fxOn = false;
  try {
    frameTs = ts;
    if (sync.fxEnabled) {
      conductor.update(sync.read ? sync.read(ts) : null);
      fx.frame(ts, w, h, cellPx);
      fxOn = fx.active;
    } else if (fx.active) {          // se acaba de apagar: limpiar lo que quedaba en vuelo
      fx.clear();
      conductor.reset();
    }
  } catch (e) {
    fx.clear();
    conductor.reset();
  }

  const { gridW, gridH, frames } = video;
  const frameOffset = frameIndex * gridW * gridH;
  const side = Math.max(w, h);
  const offX = (w - side) / 2;
  const offY = (h - side) / 2;
  const startCol = Math.floor(-offX / cellPx);
  const endCol = Math.ceil((w - offX) / cellPx);
  const startRow = Math.floor(-offY / cellPx);
  const endRow = Math.ceil((h - offY) / cellPx);
  const repelOn = hasRepel();
  const maxIdx = RAMP_LEN - 1;

  let n = 0;
  for (let cy = startRow; cy < endRow; cy++) {
    const py = offY + cy * cellPx;
    if (py < -cellPx || py > h) continue;
    const gy = clamp(cy, 0, gridH - 1);

    for (let cx = startCol; cx < endCol; cx++) {
      const px = offX + cx * cellPx;
      if (px < -cellPx || px > w) continue;
      const gx = clamp(cx, 0, gridW - 1);

      const b = frames[frameOffset + gy * gridW + gx];
      const lit = b >= MIN_BRIGHTNESS;

      if (fxOn) fx.cell(px, py, cx, cy);
      // Fondo negro: solo se dibuja si un efecto pide un glifo fantasma aqui.
      if (!lit && !(fxOn && fx.ghost > 0)) continue;

      // UI: repulsion dura bajo las cards.
      if (repelOn && isExcluded(px, py)) continue;

      // Titulo de bienvenida: espacio negativo esculpido por las letras.
      let tdx = 0, tdy = 0;
      if (titleOn) {
        if (!title.test(px, py, cellPx, revealX, rng)) continue;
        tdx = title.dx; tdy = title.dy;
      }

      let idx, style;
      if (lit) {
        idx = rampIndex(b, GAMMA);
        if (rng() < FLICKER_PROB) {
          const jitter = (rng() < 0.5 ? -1 : 1) * (1 + Math.floor(rng() * 3));
          idx = clamp(idx + jitter, 1, maxIdx);
        }
        style = 0;
        if (fxOn && fx.boost > 0) {
          const lane = fx.lane;
          if (fx.scr) idx = clamp(idx + Math.floor(rng() * 13) - 6, 1, maxIdx);   // barrido de medios
          idx = Math.min(maxIdx, idx + Math.round(fx.boost * FX_STYLE.density[lane]));
          style = lane * STRIDE + levelOf(fx.boost);
        }
      } else {
        // Glifo fantasma: zona baja de la rampa, sube con la intensidad.
        const g = fx.ghost;
        idx = Math.min(maxIdx, 6 + Math.floor(g * 14) + Math.floor(rng() * 3));
        style = fx.lane * STRIDE + levelOf(g * 0.85);
      }
      if (idx <= 0) continue;

      ops.x[n] = px + tdx + (fxOn ? fx.dx : 0);
      ops.y[n] = py + tdy + (fxOn ? fx.dy : 0);
      ops.ch[n] = idx;
      ops.style[n] = style;
      n++;
    }
  }

  // Chispas de agudos: al final (sus celdas se vacian al dibujar).
  const sparkFirst = n;
  if (fxOn) {
    for (let i = 0; i < fx.nSparkOps && n < ops.cap; i++) {
      const sx = fx.spX[i], sy = fx.spY[i];
      if (sx < -cellPx || sx > w || sy < -cellPx || sy > h) continue;
      if (repelOn && isExcluded(sx, sy)) continue;
      ops.x[n] = sx; ops.y[n] = sy;
      ops.ch[n] = fx.spCh[i];
      ops.style[n] = HI_FIRST_STYLE + fx.spLv[i];
      n++;
    }
  }

  paintOps(n, sparkFirst);

  // Relleno de dos capas del titulo (pre-play), por encima de los glifos.
  if (titleOn) title.drawFill(ctx, w, h, revealX);
}

/** Agrupa las operaciones por estilo (ordenacion por conteo) y las dibuja. */
function paintOps(n, sparkFirst) {
  styleStart.fill(0);
  for (let i = 0; i < n; i++) styleStart[ops.style[i] + 1]++;
  for (let s = 0; s < N_STYLES; s++) styleStart[s + 1] += styleStart[s];
  const cursor = styleStart.slice(0, N_STYLES);
  for (let i = 0; i < n; i++) ops.order[cursor[ops.style[i]]++] = i;

  let sparksCleared = false;
  for (let s = 0; s < N_STYLES; s++) {
    const from = styleStart[s], to = styleStart[s + 1];
    if (from === to) continue;
    // Antes de pintar chispas: vaciar las celdas que ocupan para que el '*' no
    // se solape con el glifo que hubiera debajo.
    if (s >= HI_FIRST_STYLE && !sparksCleared && n > sparkFirst) {
      sparksCleared = true;
      ctx.fillStyle = '#000';
      for (let i = sparkFirst; i < n; i++) ctx.fillRect(ops.x[i], ops.y[i], cellPx, cellPx * 1.3);
    }
    ctx.fillStyle = STYLES[s];
    for (let k = from; k < to; k++) {
      const i = ops.order[k];
      ctx.fillText(CHARS[ops.ch[i]], ops.x[i], ops.y[i]);
    }
  }
}

// ---------------------------------------------------------------------------
// Diagnostico: anade ?fxdebug a la URL para ver, en una esquina, si el mapa de
// ritmo cargo, si el reloj del audio avanza y cuantos golpes se disparan.
// ---------------------------------------------------------------------------
let hud = null, hudNext = 0;
function createHud() {
  const el = document.createElement('pre');
  el.style.cssText = 'position:fixed;left:8px;bottom:8px;z-index:99999;margin:0;padding:6px 8px;' +
    'font:11px/1.35 monospace;color:#9f9;background:rgba(0,0,0,.75);pointer-events:none;white-space:pre';
  document.body.appendChild(el);
  return el;
}
function updateHud(ts) {
  if (!hud || ts < hudNext) return;
  hudNext = ts + 250;
  const sample = sync.read ? sync.read(ts) : null;
  hud.textContent =
    'beat-fx  boton: ' + (sync.fxEnabled ? 'ON' : 'OFF') + '  modo: ' + (fx.calm ? 'calmo (reduced-motion)' : 'completo') + '\n' +
    'audio:   ' + (sample ? sample.key + '  ' + Math.round(sample.ms) + ' ms' : 'sin reproducir / pausado') + '\n' +
    'mapa:    ' + (sample ? beatmapStatus(sample.key) : '-') + '\n' +
    'disparados  kick ' + conductor.fired[0] + '  bass ' + conductor.fired[1] +
    '  mid ' + conductor.fired[2] + '  hi ' + conductor.fired[3] + '\n' +
    'activos     kick ' + fx.ripples.length + '  bass ' + fx.tides.length +
    '  mid ' + fx.sweeps.length + '  hi ' + fx.sparks.length;
}

// ---------------------------------------------------------------------------
// 4. Bucle de animacion
// ---------------------------------------------------------------------------
function tick(ts) {
  requestAnimationFrame(tick);
  if (!video.frames) return;

  if (!lastTs) lastTs = ts;
  const dt = Math.min(MAX_FRAME_DT, Math.max(0, ts - lastTs));
  lastTs = ts;

  accum += dt;
  const frameDur = 1000 / FPS;
  while (accum >= frameDur) {
    accum -= frameDur;
    frameIndex = (frameIndex + 1) % video.nFrames;
  }
  drawFrame(ts);
  updateHud(ts);
}

// ---------------------------------------------------------------------------
// 5. Boot
// ---------------------------------------------------------------------------
async function boot() {
  canvas = document.getElementById('ascii');
  ctx = canvas.getContext('2d', { alpha: false });

  const loader = document.getElementById('loader');
  const fill = document.getElementById('loaderFill');

  try {
    await loadData((p) => { fill.style.width = Math.floor(p * 100) + '%'; });
  } catch (err) {
    loader.innerHTML = '<div style="color:#c66">ERROR AL DECODIFICAR LOS DATOS</div>';
    console.error(err);
    return;
  }

  // prefers-reduced-motion (en Linux basta con tener las animaciones del
  // escritorio desactivadas): los efectos pasan a modo CALMO en vez de
  // apagarse. `?fx=full` fuerza el modo completo.
  try {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const forceFull = /[?&]fx=full\b/.test(location.search);
    const apply = () => { fx.calm = mq.matches && !forceFull; };
    apply();
    if (mq.addEventListener) mq.addEventListener('change', apply);
    else if (mq.addListener) mq.addListener(apply);
  } catch (e) { /* sin matchMedia: modo completo */ }
  if (/[?&]fxdebug\b/.test(location.search)) hud = createHud();

  resize();
  window.addEventListener('resize', resize);
  setInterval(updateRepelRects, 2000);     // respaldo; la via principal son llamadas sincronas
  requestAnimationFrame(tick);

  setTimeout(() => loader.classList.add('hidden'), 220);
}

window.addEventListener('DOMContentLoaded', boot);
