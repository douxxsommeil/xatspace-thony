/* =========================================================================
   Mapas de ritmo: carga + conductor
   -------------------------------------------------------------------------
   scripts/analyze-beats.py calcula OFFLINE, para cada mp3, donde ocurre cada
   golpe y lo guarda en assets/beatmaps/<id>.json. Aqui solo se leen:

     loadBeatmap(key)   descarga + parsea (con cache). key = nombre del mp3 sin
                        extension. Nunca rechaza: si falla, la pista simplemente
                        no tiene efectos.
     peekBeatmap(key)   lectura sincrona de la cache (undefined = sin pedir o
                        aun cargando, null = fallo, objeto = listo).
     BeatConductor      cada frame recibe "que suena y en que ms" y dispara los
                        eventos que han vencido, sin repetir ni perder ninguno.
   ========================================================================= */

export const LANES = ['kick', 'bass', 'mid', 'hi'];
const BEATMAP_DIR = 'assets/beatmaps/';
const FORMAT_VERSION = 1;

/**
 * Un evento mas viejo que esto (p.ej. tras un paron del navegador) ya no se
 * dibuja. Es generoso a proposito: algunos navegadores/audio en Linux
 * actualizan `currentTime` a saltos de 100-250 ms, y con un margen corto casi
 * todos los golpes caian "tarde" y se descartaban. El efecto nace con la edad
 * que le toca, asi que un evento algo tardio sigue cayendo en su sitio.
 */
const FRESH_MS = 250;
/** Adelanto con el que se disparan los efectos (compensa la latencia de pintado). */
export const SYNC_LEAD_MS = 20;

/** id de pista a partir de la ruta del mp3: "assets/tracks/abc.mp3" -> "abc". */
export function trackKey(file) {
  return String(file || '').replace(/^.*\//, '').replace(/\.[^.]+$/, '');
}

// ---------------------------------------------------------------------------
// Carga
// ---------------------------------------------------------------------------
const cache = new Map();   // key -> { map: obj|null, promise }

function laneArrays(flat, stride) {
  const n = Array.isArray(flat) ? Math.floor(flat.length / stride) : 0;
  const t = new Int32Array(n);
  const s = new Uint8Array(n);
  const d = stride === 3 ? new Uint16Array(n) : null;
  for (let i = 0; i < n; i++) {
    t[i] = flat[i * stride];
    s[i] = flat[i * stride + 1];
    if (d) d[i] = flat[i * stride + 2];
  }
  return { t, s, d, n };
}

/** JSON plano -> arrays tipados por carril. Devuelve null si el formato no vale. */
export function parseBeatmap(json) {
  if (!json || json.v !== FORMAT_VERSION) return null;
  return {
    dur: json.dur | 0,
    kick: laneArrays(json.kick, 2),
    bass: laneArrays(json.bass, 3),
    mid: laneArrays(json.mid, 2),
    hi: laneArrays(json.hi, 2),
  };
}

export function loadBeatmap(key) {
  let entry = cache.get(key);
  if (entry) return entry.promise;
  entry = { map: undefined, error: null, promise: null };
  entry.promise = fetch(BEATMAP_DIR + encodeURIComponent(key) + '.json')
    .then((res) => {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then((json) => {
      entry.map = parseBeatmap(json);
      if (!entry.map) throw new Error('formato de mapa no valido');
      entry.error = null;
      return entry.map;
    })
    .catch((err) => {         // sin mapa = sin efectos; la musica no se entera
      entry.map = null;
      entry.error = String((err && err.message) || err);
      // Aviso UNA vez por pista: es el fallo silencioso mas probable (la
      // carpeta assets/beatmaps/ sin publicar).
      console.warn('[beat-fx] sin mapa de ritmo para "' + key + '" (' + entry.error +
        '): ' + BEATMAP_DIR + key + '.json. Sin el no hay efectos.');
      return null;
    });
  cache.set(key, entry);
  return entry.promise;
}

/** Estado legible de una pista para el diagnostico: 'ok' | 'cargando' | 'sin mapa (...)'. */
export function beatmapStatus(key) {
  const entry = cache.get(key);
  if (!entry) return 'sin pedir';
  if (entry.map) return 'ok';
  return entry.error ? 'sin mapa (' + entry.error + ')' : 'cargando';
}

export function peekBeatmap(key) {
  const entry = cache.get(key);
  return entry ? entry.map : undefined;
}

// ---------------------------------------------------------------------------
// Conductor
// ---------------------------------------------------------------------------
function lowerBound(arr, n, value) {
  let lo = 0, hi = n;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] < value) lo = mid + 1; else hi = mid;
  }
  return lo;
}

export class BeatConductor {
  /**
   * @param emit (laneIndex, strength01, durMs, lateMs) => void
   *   laneIndex indexa LANES; lateMs = cuanto se pasó el evento de su instante.
   */
  constructor(emit) {
    this.emit = emit;
    this.key = null;
    this.map = null;
    this.cursor = [0, 0, 0, 0];
    this.lastMs = -1;
    this.fired = [0, 0, 0, 0];     // diagnostico: eventos disparados por carril
  }

  /** Olvida la pista actual (pausa / parada). */
  reset() {
    this.key = null;
    this.map = null;
    this.lastMs = -1;
  }

  /** sample = sync.read() -> { key, ms } | null */
  update(sample) {
    if (!sample) { this.reset(); return; }

    if (sample.key !== this.key) {          // pista nueva
      this.key = sample.key;
      this.map = null;
      this.lastMs = -1;
    }
    if (!this.map) {                         // mapa aun sin cargar
      const m = peekBeatmap(sample.key);
      if (m === undefined) loadBeatmap(sample.key);
      if (!m) return;
      this.map = m;
      this.lastMs = -1;
    }

    const ms = sample.ms + SYNC_LEAD_MS;
    // Primer frame, salto atras (seek) o salto adelante grande: recolocar los
    // cursores justo antes de "ahora" (solo cuenta lo fresco).
    if (this.lastMs < 0 || ms < this.lastMs - 120 || ms > this.lastMs + 800) {
      for (let l = 0; l < 4; l++) {
        const lane = this.map[LANES[l]];
        this.cursor[l] = lowerBound(lane.t, lane.n, ms - FRESH_MS);
      }
    }
    this.lastMs = ms;

    for (let l = 0; l < 4; l++) {
      const lane = this.map[LANES[l]];
      let c = this.cursor[l];
      while (c < lane.n && lane.t[c] <= ms) {
        const late = ms - lane.t[c];
        if (late <= FRESH_MS) {
          this.fired[l]++;
          this.emit(l, lane.s[c] / 100, lane.d ? lane.d[c] : 0, late);
        }
        c++;
      }
      this.cursor[l] = c;
    }
  }
}
