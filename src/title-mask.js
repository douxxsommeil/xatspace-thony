/* =========================================================================
   TITULO DE BIENVENIDA (solo pre-play)
   -------------------------------------------------------------------------
   El nombre y la id se esculpen en el campo de glifos como ESPACIO NEGATIVO:
   una mascara tipografica (render offscreen de las dos lineas) define donde
   NO puede haber glifo (tinta + margen estrecho TITLE_HARD) y un campo de
   distancia/direccion (chamfer de 2 pasadas) EMPUJA los glifos del halo
   (hasta TITLE_HALO) alejandolos de los bordes de las letras.

   Dentro de la forma se pinta un relleno de dos capas: tinta gris plana +
   contraluz mas claro desplazado (registro desalineado tipo imprenta).
   Guardarrail: compuestos sobre negro quedan por DEBAJO de 75 de luminancia,
   asi que la palabra sigue siendo una anomalia oscura, sin borde luminoso.

   Vive hasta el primer play del gate y no vuelve hasta recargar.
   ========================================================================= */
import { clamp } from './ramp.js';

const TITLE_TEXT = 'DouxSommeil';
const TITLE_ID = '1550490712';
const HARD = 8;     // margen estrecho sin glifos alrededor de la tinta (px)
const HALO = 20;    // halo despejado: nada de tinta ajena dentro (px)
const CELL = 5;     // celda del grid de distancia (px)
const FILL_BASE = [64, 64, 68, 0.95];      // ~61 compuesto
const FILL_LIGHT = [176, 176, 180, 0.38];  // ~67 compuesto
const FILL_DX = 2, FILL_DY = 2;
const REVEAL_MS = 1500;     // el vacio abre de izquierda a derecha
const REVEAL_EDGE = 40;     // franja suave del borde de apertura (px)

const FAM_TITLE = "'Cormorant Garamond', Georgia, serif";
const FAM_ID = "'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace";

function prefersReducedMotion() {
  try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); }
  catch (e) { return false; }
}

/** Copia la mascara, la rellena con un color plano (source-in) y la desplaza. */
function tintMask(src, rgba, dx, dy) {
  const t = document.createElement('canvas');
  t.width = src.width; t.height = src.height;
  const tg = t.getContext('2d');
  tg.drawImage(src, 0, 0);
  tg.globalCompositeOperation = 'source-in';
  tg.fillStyle = `rgba(${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3]})`;
  tg.fillRect(0, 0, t.width, t.height);
  if (!dx && !dy) return t;
  const c = document.createElement('canvas');
  c.width = src.width; c.height = src.height;
  c.getContext('2d').drawImage(t, dx, dy);
  return c;
}

export class TitleMask {
  constructor() {
    this.dx = 0;          // salida de test(): empuje del glifo
    this.dy = 0;
    this.invalidate();
  }

  invalidate() {
    this.box = null;          // { w, h } del layout vigente
    this.grid = null;         // { gw, gh, dist, dirX, dirY }
    this.inkLayer = null;
    this.lightLayer = null;
    this.mixLayer = null;
    this.revealT0 = -1e9;
  }

  /** Libera todo (el titulo no vuelve tras el primer play). */
  release() { this.invalidate(); }

  /** true mientras haya una mascara viva que aplicar. */
  get active() { return this.grid !== null; }

  /** Construye (o reconstruye si cambio el tamano) la mascara. */
  ensure(w, h, now) {
    if (this.box && this.box.w === w && this.box.h === h) return;
    this.layout(w, h, now);
  }

  layout(w, h, now) {
    this.invalidate();
    // Marca el layout como hecho PASE LO QUE PASE: si algo falla (p.e. un
    // navegador sin getImageData) no se reintenta en cada frame.
    this.box = { w, h };
    try {
      const fs = Math.round(Math.max(34, Math.min(w * 0.075, h * 0.16)));
      const fsId = Math.round(fs * 0.42);            // la id siempre mas pequena
      const gap = Math.round(fs * 0.20);
      const y0 = Math.round(h * 0.16);               // por encima del gate centrado

      const off = document.createElement('canvas');
      off.width = w; off.height = h;
      const octx = off.getContext('2d', { willReadFrequently: true });
      octx.textBaseline = 'top';
      octx.fillStyle = '#fff';

      octx.font = 'italic 500 ' + fs + 'px ' + FAM_TITLE;
      const x1 = Math.round((w - octx.measureText(TITLE_TEXT).width) / 2);
      octx.fillText(TITLE_TEXT, x1, y0);

      const y1 = y0 + Math.round(fs * 0.95) + gap;
      octx.font = fsId + 'px ' + FAM_ID;
      const x2 = Math.round((w - octx.measureText(TITLE_ID).width) / 2);
      octx.fillText(TITLE_ID, x2, y1);

      // Mascara de tinta por celda del grid (celda = tinta si algun pixel tiene alfa).
      const gw = Math.ceil(w / CELL), gh = Math.ceil(h / CELL);
      const img = octx.getImageData(0, 0, w, h).data;
      const ink = new Uint8Array(gw * gh);
      let inkCount = 0;
      for (let py = 0; py < h; py++) {
        const rowBase = ((py / CELL) | 0) * gw;
        const rowOff = py * w;
        for (let px = 0; px < w; px++) {
          if (img[(rowOff + px) * 4 + 3] > 40) {
            const gi = rowBase + ((px / CELL) | 0);
            if (!ink[gi]) { ink[gi] = 1; inkCount++; }
          }
        }
      }
      if (inkCount === 0) return;           // sin tinta medible: titulo sin repel

      // Chamfer 2D: distancia (en celdas) y vector unitario hacia la tinta mas cercana.
      const INF = 1e9;
      const dist = new Float64Array(gw * gh).fill(INF);
      const dirX = new Float64Array(gw * gh);
      const dirY = new Float64Array(gw * gh);
      for (let i = 0; i < gw * gh; i++) if (ink[i]) dist[i] = 0;

      const relax = (gx, gy, nbs) => {
        const i = gy * gw + gx;
        if (dist[i] === 0) return;
        for (let n = 0; n < nbs.length; n++) {
          const nx = gx + nbs[n][0], ny = gy + nbs[n][1];
          if (nx < 0 || ny < 0 || nx >= gw || ny >= gh) continue;
          const nd = dist[ny * gw + nx] + nbs[n][2];
          if (nd < dist[i]) {
            dist[i] = nd;
            const inv = 1 / nbs[n][2];
            dirX[i] = nbs[n][0] * inv;
            dirY[i] = nbs[n][1] * inv;
          }
        }
      };
      const fwd = [[-1, 0, 1], [0, -1, 1], [-1, -1, 1.4142], [1, -1, 1.4142]];
      for (let gy = 0; gy < gh; gy++) for (let gx = 0; gx < gw; gx++) relax(gx, gy, fwd);
      const bwd = [[1, 0, 1], [0, 1, 1], [1, 1, 1.4142], [-1, 1, 1.4142]];
      for (let gy = gh - 1; gy >= 0; gy--) for (let gx = gw - 1; gx >= 0; gx--) relax(gx, gy, bwd);

      // Relleno de dos capas: se pinta una vez aqui; por frame son dos drawImage.
      this.lightLayer = tintMask(off, FILL_LIGHT, FILL_DX, FILL_DY);
      this.inkLayer = tintMask(off, FILL_BASE, 0, 0);
      this.mixLayer = document.createElement('canvas');
      this.mixLayer.width = w; this.mixLayer.height = h;
      this.grid = { gw, gh, dist, dirX, dirY };
      // Auto-revelado: bajo reduced-motion aparece ya revelado.
      this.revealT0 = prefersReducedMotion() ? -1e9 : now;
    } catch (e) {
      this.grid = null;
      this.inkLayer = this.lightLayer = this.mixLayer = null;
    }
  }

  /** Posicion x (px) hasta la que ya esta abierto el vacio, o null sin mascara. */
  revealX(now, w) {
    if (!this.grid) return null;
    return w * clamp((now - this.revealT0) / REVEAL_MS, 0, 1);
  }

  _index(px, py) {
    const g = this.grid;
    const gx = clamp((px / CELL) | 0, 0, g.gw - 1);
    const gy = clamp((py / CELL) | 0, 0, g.gh - 1);
    return gy * g.gw + gx;
  }

  /**
   * Decide si el glifo de la celda (px, py) se dibuja. Devuelve false si cae
   * dentro de la tinta o de su margen; si cae en el halo, lo EMPUJA (this.dx,
   * this.dy) para que el cuerpo del glifo despeje la forma. `rnd` solo se usa
   * en la franja suave del auto-revelado (dither temporal).
   */
  test(px, py, cellPx, revealX, rnd) {
    this.dx = 0; this.dy = 0;
    const g = this.grid;
    if (!g) return true;

    let rvf = 1;
    if (revealX !== null) rvf = clamp((revealX + REVEAL_EDGE - px) / REVEAL_EDGE, 0, 1);
    if (!(rvf > 0 && (rvf >= 1 || rnd() < rvf))) return true;   // aun sin abrir

    const gi = this._index(px, py);
    const dpx = g.dist[gi] * CELL;
    if (dpx <= HARD) return false;

    const dB = Math.abs(g.dirX[gi]) + Math.abs(g.dirY[gi]);
    const need = (HALO + Math.ceil(cellPx * 1.3 * dB)) - dpx;      // cuerpo del glifo
    if (need > 0) {
      const nx = px - g.dirX[gi] * need;
      const ny = py - g.dirY[gi] * need;
      // El destino puede caer cerca de OTRA letra: debe despejar el halo alli tambien.
      const gj = this._index(nx, ny);
      const dBd = Math.abs(g.dirX[gj]) + Math.abs(g.dirY[gj]);
      if (g.dist[gj] * CELL < HALO + Math.ceil(cellPx * 1.3 * dBd)) return false;
      this.dx = (nx - px) * rvf;
      this.dy = (ny - py) * rvf;
    }
    return true;
  }

  /** Relleno de dos capas, con el mismo revelado L->R que el vacio. */
  drawFill(ctx, w, h, revealX) {
    if (!this.inkLayer || !this.lightLayer || revealX === null) return;
    if (revealX >= w - 1) {
      ctx.drawImage(this.lightLayer, 0, 0);
      ctx.drawImage(this.inkLayer, 0, 0);
      return;
    }
    const mix = this.mixLayer;
    if (!mix) return;
    const m = mix.getContext('2d');
    m.globalCompositeOperation = 'source-over';
    m.clearRect(0, 0, w, h);
    m.drawImage(this.lightLayer, 0, 0);
    m.drawImage(this.inkLayer, 0, 0);
    const edge = Math.max(1, revealX + REVEAL_EDGE);
    const gr = m.createLinearGradient(0, 0, edge, 0);
    gr.addColorStop(0, 'rgba(0,0,0,1)');
    gr.addColorStop(clamp(revealX / edge, 0, 1), 'rgba(0,0,0,1)');
    gr.addColorStop(1, 'rgba(0,0,0,0)');
    m.globalCompositeOperation = 'destination-in';
    m.fillStyle = gr;
    m.fillRect(0, 0, edge, h);
    m.globalCompositeOperation = 'source-over';
    ctx.drawImage(mix, 0, 0);
  }
}
