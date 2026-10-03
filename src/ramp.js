/* =========================================================================
   Utilidades de glifos: rampa de densidad, PRNG y hash por celda.
   Sin DOM: se puede importar desde cualquier modulo (y desde las pruebas).
   ========================================================================= */

// Rampa de caracteres ordenada de menor a mayor densidad visual percibida.
export const RAMP = ' .`\'",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';
export const RAMP_LEN = RAMP.length;
export const CHARS = RAMP.split('');

/** Indice de rampa para un brillo 0..255 (gamma ajusta el contraste). */
export function rampIndex(brightness, gamma) {
  const t = Math.pow(brightness / 255, gamma);
  const idx = Math.floor(t * (RAMP_LEN - 1));
  return idx < 0 ? 0 : idx > RAMP_LEN - 1 ? RAMP_LEN - 1 : idx;
}

/**
 * PRNG xorshift32 determinista y rapido (evita el coste de Math.random en los
 * bucles calientes). Devuelve valores en [0, 1): el original dividia por
 * 2^32-1 y podia devolver exactamente 1, lo que dejaba un indice fuera de
 * rango en `Math.floor(rnd() * n)`.
 */
export function createRng(seed) {
  let s = (seed >>> 0) || 0x9e3779b9;
  return function next() {
    s ^= s << 13; s >>>= 0;
    s ^= s >>> 17;
    s ^= s << 5; s >>>= 0;
    return s / 4294967296;
  };
}

/** Hash entero 2D -> [0, 1). Estable: sirve para efectos que NO deben parpadear. */
export function hash2(x, y) {
  let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

export function clamp(v, lo, hi) {
  return v < lo ? lo : v > hi ? hi : v;
}
