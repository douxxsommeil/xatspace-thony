/* =========================================================================
   EFECTOS DE RITMO EN EL CAMPO DE GLIFOS
   -------------------------------------------------------------------------
   Cada golpe del mapa de ritmo (assets/beatmaps/*.json) dispara un efecto con
   identidad propia. Todos viven DENTRO del dibujo de glifos: cambian que
   caracter se pinta, su densidad, su color y su posicion, tanto sobre la
   figura del video como sobre el fondo negro (donde aparecen glifos "fantasma"
   solo mientras pasa el efecto). No hay velo, ni capa extra, ni blanqueo global.

     KICK  bombo    ANILLO DE PARPADEO: nace en el centro de la animacion y se
                    esparce hasta las esquinas. Dentro del anillo cada glifo se
                    enciende y apaga al azar en cada frame (centelleo).
     BASS  bajo     MAREA: una franja ancha sube desde abajo. Los glifos que
                    toca se vuelven mas densos y se mecen en horizontal; el
                    fantasma del fondo es estable (no parpadea), pesado.
     MID   medios   BARRIDO: una linea vertical cruza la pantalla (alterna
                    izquierda->derecha / derecha->izquierda). Los glifos de su
                    estela se re-sortean y se desplazan en zigzag (glitch).
     HI    agudos   CHISPAS: puntos sueltos '*' con una cruz de '+' que
                    destellan en celdas al azar de toda la pantalla.

   Este modulo no toca el DOM ni el canvas: el motor le pregunta, celda a
   celda, "cuanto brilla esta celda y de que carril" (cell()) y dibuja el
   resultado. Eso lo hace determinista y testeable.
   ========================================================================= */
import { createRng, hash2, clamp, RAMP } from './ramp.js';

export const LANE = { NONE: 0, KICK: 1, BASS: 2, MID: 3, HI: 4 };

/** Todo lo "ajustable a gusto" esta aqui. */
export const FX_STYLE = {
  // Glifo en reposo (igual que el campo original, sin ningun efecto).
  base: [232, 232, 230],
  baseAlpha: 0.62,
  // Color de cada carril al maximo; los niveles bajos mezclan hacia el gris base.
  color: {
    [LANE.KICK]: [255, 150, 118],   // salmon de la portada
    [LANE.BASS]: [236, 112, 74],    // terracota
    [LANE.MID]: [255, 236, 208],    // crema
    [LANE.HI]: [255, 255, 255],
  },
  // Cuantos escalones de la rampa se densifica un glifo de la figura.
  density: { [LANE.KICK]: 9, [LANE.BASS]: 14, [LANE.MID]: 7, [LANE.HI]: 0 },
  levels: 4,

  kickLifeMs: 950,
  bassLifeMs: [700, 1700],     // min, max (depende de la duracion de la nota)
  midLifeMs: 480,
  hiLifeMs: [140, 240],
};

const MAX_RIPPLES = 5;
const MAX_TIDES = 3;
const MAX_SWEEPS = 3;
const MAX_SPARKS = 160;
const SPARK_OPS = 5;            // centro + 4 brazos de la cruz

const IDX_STAR = RAMP.indexOf('*');
const IDX_PLUS = RAMP.indexOf('+');

/** Estilos precalculados: indice = lane * (levels+1) + level; 0 = glifo base. */
export function buildStyles() {
  const L = FX_STYLE.levels;
  const [br, bg, bb] = FX_STYLE.base;
  const styles = new Array(5 * (L + 1));
  styles[0] = `rgba(${br},${bg},${bb},${FX_STYLE.baseAlpha})`;
  for (let lane = 1; lane <= 4; lane++) {
    const [r, g, b] = FX_STYLE.color[lane];
    for (let lv = 1; lv <= L; lv++) {
      const t = lv / L;
      const mix = 0.35 + 0.65 * t;
      const a = 0.70 + 0.30 * t;
      styles[lane * (L + 1) + lv] =
        `rgba(${Math.round(br + (r - br) * mix)},${Math.round(bg + (g - bg) * mix)},` +
        `${Math.round(bb + (b - bb) * mix)},${a.toFixed(2)})`;
    }
  }
  return styles;
}

/** boost 0..1 -> nivel de estilo 1..levels */
export function levelOf(boost) {
  const L = FX_STYLE.levels;
  const lv = 1 + ((boost * L) | 0);
  return lv > L ? L : lv < 1 ? 1 : lv;
}

export class BeatFx {
  constructor() {
    this.rng = createRng(0xbea7);
    this.enabled = true;
    // Modo calmo (prefers-reduced-motion): mismos golpes y mismas zonas, pero
    // SIN centelleo aleatorio por frame (el patron de cada celda es estable) y
    // con menos chispas. Se sigue viendo la musica sin estroboscopio.
    this.calm = false;

    this.ripples = [];
    this.tides = [];
    this.sweeps = [];
    this.sparks = [];
    this.sweepDir = 1;

    // --- preparado por frame (frame()) ---
    this.W = 0; this.H = 0; this.cellPx = 0; this.now = 0;
    this.cx = 0; this.cy = 0; this.R = 1;
    this.nR = 0; this.nT = 0; this.nS = 0;
    this.rp = new Float32Array(MAX_RIPPLES * 4);   // r, hwFrente, hwEstela, env
    this.tp = new Float32Array(MAX_TIDES * 3);     // y, mitadAlto, env
    this.sp = new Float32Array(MAX_SWEEPS * 5);    // x, dir, hwFrente, hwEstela, env
    this.tidePhase = 0;

    // --- salida de cell() (sin alocar un objeto por celda) ---
    this.boost = 0;   // 0..1  intensidad sobre la figura
    this.lane = 0;    // LANE ganador
    this.ghost = 0;   // 0..1  intensidad del glifo fantasma sobre fondo negro (0 = nada)
    this.dx = 0;      // desplazamiento en px
    this.dy = 0;
    this.scr = 0;     // 1 = re-sortear el glifo (barrido de medios)

    // --- chispas listas para dibujar (frame()) ---
    this.nSparkOps = 0;
    this.spX = new Float32Array(MAX_SPARKS * SPARK_OPS);
    this.spY = new Float32Array(MAX_SPARKS * SPARK_OPS);
    this.spCh = new Uint8Array(MAX_SPARKS * SPARK_OPS);
    this.spLv = new Uint8Array(MAX_SPARKS * SPARK_OPS);
  }

  get active() {
    return this.ripples.length + this.tides.length + this.sweeps.length + this.sparks.length > 0;
  }

  clear() {
    this.ripples.length = this.tides.length = this.sweeps.length = this.sparks.length = 0;
    this.nR = this.nT = this.nS = this.nSparkOps = 0;
  }

  /**
   * Dispara un efecto.
   * @param lane     LANE.* (KICK/BASS/MID/HI)
   * @param strength 0..1
   * @param durMs    duracion de la nota (solo BASS)
   * @param t0       instante de inicio en el reloj de frame() (ms)
   */
  spawn(lane, strength, durMs, t0) {
    if (!this.enabled) return;
    const s = clamp(strength, 0.05, 1);
    if (lane === LANE.KICK) {
      push(this.ripples, MAX_RIPPLES, { t0, s, life: FX_STYLE.kickLifeMs });
    } else if (lane === LANE.BASS) {
      const [lo, hi] = FX_STYLE.bassLifeMs;
      push(this.tides, MAX_TIDES, { t0, s, life: clamp(lo + durMs * 0.8, lo, hi) });
    } else if (lane === LANE.MID) {
      this.sweepDir = -this.sweepDir;
      push(this.sweeps, MAX_SWEEPS, { t0, s, life: FX_STYLE.midLifeMs, dir: this.sweepDir });
    } else if (lane === LANE.HI) {
      const [lo, hi] = FX_STYLE.hiLifeMs;
      const n = Math.round((8 + 26 * s) * (this.calm ? 0.5 : 1));
      for (let i = 0; i < n; i++) {
        push(this.sparks, MAX_SPARKS, {
          t0, s, life: lo + this.rng() * (hi - lo), u: this.rng(), v: this.rng(),
        });
      }
    }
  }

  /** Prepara el frame: descarta lo caducado y precalcula lo que cell() necesita. */
  frame(now, W, H, cellPx) {
    this.now = now; this.W = W; this.H = H; this.cellPx = cellPx;
    this.cx = W / 2; this.cy = H / 2;
    this.R = Math.max(1, Math.hypot(W, H) / 2);
    const R = this.R;

    prune(this.ripples, now);
    prune(this.tides, now);
    prune(this.sweeps, now);
    prune(this.sparks, now);

    // KICK: anillo que nace en el centro. Frente corto y estela larga.
    this.nR = this.ripples.length;
    for (let i = 0; i < this.nR; i++) {
      const it = this.ripples[i];
      const t = clamp((now - it.t0) / it.life, 0, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      const o = i * 4;
      this.rp[o] = R * 1.12 * ease;
      this.rp[o + 1] = Math.max(cellPx * 3, R * (0.045 + 0.02 * t));
      this.rp[o + 2] = Math.max(cellPx * 6, R * (0.20 + 0.10 * t));
      this.rp[o + 3] = Math.pow(1 - t, 1.3) * (0.5 + 0.5 * it.s);
    }

    // BASS: franja horizontal que sube de abajo a arriba.
    this.nT = this.tides.length;
    this.tidePhase = now * 0.006;
    for (let i = 0; i < this.nT; i++) {
      const it = this.tides[i];
      const t = clamp((now - it.t0) / it.life, 0, 1);
      const half = H * 0.14 * (0.8 + 0.4 * it.s);
      const p = 0.5 - 0.5 * Math.cos(Math.PI * t);          // suave al salir y al llegar
      const o = i * 3;
      this.tp[o] = (H + half) - (H + 2 * half) * p;
      this.tp[o + 1] = half;
      this.tp[o + 2] = Math.pow(Math.sin(Math.PI * t), 0.8) * (0.55 + 0.45 * it.s);
    }

    // MID: linea vertical que cruza la pantalla.
    this.nS = this.sweeps.length;
    for (let i = 0; i < this.nS; i++) {
      const it = this.sweeps[i];
      const t = clamp((now - it.t0) / it.life, 0, 1);
      const p = Math.pow(t, 0.85);
      const o = i * 5;
      this.sp[o] = it.dir > 0 ? -0.1 * W + 1.2 * W * p : 1.1 * W - 1.2 * W * p;
      this.sp[o + 1] = it.dir;
      this.sp[o + 2] = Math.max(cellPx * 2, W * 0.012);
      this.sp[o + 3] = Math.max(cellPx * 6, W * 0.13);
      this.sp[o + 4] = (1 - t * 0.6) * (0.55 + 0.45 * it.s);
    }

    // HI: chispas ya resueltas a celdas de pantalla.
    let n = 0;
    for (let i = 0; i < this.sparks.length; i++) {
      const it = this.sparks[i];
      const age = (now - it.t0) / it.life;
      if (age < 0 || age >= 1) continue;
      const e = 1 - age;
      const sx = Math.floor(it.u * W / cellPx) * cellPx;
      const sy = Math.floor(it.v * H / cellPx) * cellPx;
      const lv = levelOf(e * (0.6 + 0.4 * it.s));
      this.spX[n] = sx; this.spY[n] = sy; this.spCh[n] = IDX_STAR; this.spLv[n] = lv; n++;
      if (e > 0.5) {            // la cruz solo en la primera mitad de su vida
        const armLv = Math.max(1, lv - 1);
        this.spX[n] = sx - cellPx; this.spY[n] = sy; this.spCh[n] = IDX_PLUS; this.spLv[n] = armLv; n++;
        this.spX[n] = sx + cellPx; this.spY[n] = sy; this.spCh[n] = IDX_PLUS; this.spLv[n] = armLv; n++;
        this.spX[n] = sx; this.spY[n] = sy - cellPx; this.spCh[n] = IDX_PLUS; this.spLv[n] = armLv; n++;
        this.spX[n] = sx; this.spY[n] = sy + cellPx; this.spCh[n] = IDX_PLUS; this.spLv[n] = armLv; n++;
      }
    }
    this.nSparkOps = n;
  }

  /**
   * Evalua una celda (px, py = esquina superior izquierda en px; ci, ri =
   * coordenadas enteras de celda, para el hash estable). Rellena
   * boost / lane / ghost / dx / dy / scr. Solo se llama si `active`.
   */
  cell(px, py, ci, ri) {
    this.boost = 0; this.lane = 0; this.ghost = 0; this.dx = 0; this.dy = 0; this.scr = 0;
    const half = this.cellPx * 0.5;
    const x = px + half, y = py + half;
    let best = 0, bestLane = 0, bassV = 0;

    // --- KICK: parpadeo dentro del anillo ---------------------------------
    if (this.nR) {
      const ddx = x - this.cx, ddy = y - this.cy;
      const d = Math.sqrt(ddx * ddx + ddy * ddy);
      let kb = 0;
      for (let i = 0; i < this.nR; i++) {
        const o = i * 4;
        const e = d - this.rp[o];
        const k = e > 0 ? 1 - e / this.rp[o + 1] : 1 + e / this.rp[o + 2];
        if (k > 0) {
          const v = k * this.rp[o + 3];
          if (v > kb) kb = v;
        }
      }
      // Centelleo: cada glifo se enciende con una probabilidad que crece con
      // la intensidad, re-sorteada en cada frame.
      const p = 0.28 + 0.72 * kb;
      if (kb > 0.02 && (this.calm ? hash2(ci, ri) : this.rng()) < p) { best = kb; bestLane = LANE.KICK; }
    }

    // --- BASS: marea que sube, glifos pesados que se mecen ----------------
    if (this.nT) {
      let tv = 0;
      for (let i = 0; i < this.nT; i++) {
        const o = i * 3;
        const dyv = y - this.tp[o];
        const half2 = this.tp[o + 1];
        if (dyv > -half2 && dyv < half2) {
          const v = (0.5 + 0.5 * Math.cos(Math.PI * dyv / half2)) * this.tp[o + 2];
          if (v > tv) tv = v;
        }
      }
      if (tv > 0.02) {
        this.dx += Math.sin(y * 0.045 + this.tidePhase) * this.cellPx * 0.6 * tv;
        this.dy -= this.cellPx * 0.35 * tv;
        bassV = tv;
        if (tv > best) { best = tv; bestLane = LANE.BASS; }
      }
    }

    // --- MID: barrido vertical con glitch en la estela --------------------
    if (this.nS) {
      let mv = 0;
      for (let i = 0; i < this.nS; i++) {
        const o = i * 5;
        const a = (x - this.sp[o]) * this.sp[o + 1];     // >0 por delante del frente
        const k = a > 0 ? 1 - a / this.sp[o + 2] : 1 + a / this.sp[o + 3];
        if (k > 0) {
          const v = k * this.sp[o + 4];
          if (v > mv) mv = v;
        }
      }
      if (mv > 0.03 && (this.calm ? hash2(ci + 31, ri) : this.rng()) < 0.35 + 0.65 * mv) {
        this.scr = 1;
        this.dy += ((ci & 1) ? 1 : -1) * this.cellPx * 0.45 * mv;   // zigzag por columnas
        if (mv > best) { best = mv; bestLane = LANE.MID; }
      }
    }

    this.boost = best;
    this.lane = bestLane;

    // Fantasma sobre fondo negro: el parpadeo de kick/mid se adelgaza para que
    // el fondo no se sature de texto; el de bass es ESTABLE (hash por celda).
    if (bestLane === LANE.KICK || bestLane === LANE.MID) {
      this.ghost = (this.calm ? hash2(ci + 7, ri) : this.rng()) < 0.42 ? best : 0;
    } else if (bestLane === LANE.BASS) {
      this.ghost = hash2(ci, ri) < bassV * 0.45 ? bassV : 0;
    }
  }
}

function push(list, cap, item) {
  if (list.length >= cap) list.shift();
  list.push(item);
}

function prune(list, now) {
  let w = 0;
  for (let i = 0; i < list.length; i++) {
    const it = list[i];
    if (now - it.t0 < it.life) list[w++] = it;
  }
  list.length = w;
}
