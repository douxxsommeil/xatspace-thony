/* =========================================================================
   Estado compartido entre el reproductor (overlay/player) y el motor ASCII.
   -------------------------------------------------------------------------
   Antes hablaban por globales en window (__FX, __GL3D...). Ahora es un unico
   objeto importado por ambos lados:

     · player.js  ESCRIBE  sync.read  (le dice al motor "que suena y donde")
     · overlay.js ESCRIBE  sync.welcomeDone  (el gate ya se pulso)
     · el motor   LEE      ambos, una vez por frame

   El motor no toca el audio ni el DOM del reproductor: solo pregunta.
   ========================================================================= */
export const sync = {
  /** true tras el primer play del gate: el titulo de bienvenida desaparece. */
  welcomeDone: false,

  /**
   * Interruptor de las animaciones de la musica (boton junto al de ocultar el
   * reproductor). Apagado: el motor no dispara ni dibuja ningun efecto de
   * ritmo; el campo de glifos y la musica siguen igual. Lo escribe overlay.js.
   */
  fxEnabled: true,

  /**
   * () => { key, ms } | null
   *   key  id de la pista que suena (nombre del mp3 sin extension)
   *   ms   posicion de reproduccion en milisegundos (suavizada)
   * null = nada sonando (parado, pausado o buscando): no se disparan efectos.
   * La asigna el reproductor.
   */
  read: null,
};

/**
 * Reloj suavizado de un <audio>. `currentTime` solo se actualiza a saltos
 * (cada ~10-250 ms segun navegador), asi que entre dos saltos se extrapola con
 * el reloj del frame, con tope de 100 ms para que un audio que se atasca
 * (buffering) no haga correr la sincronia por su cuenta.
 */
export function createAudioClock() {
  let el = null;
  let lastCT = -1;
  let lastTs = 0;
  return function readMs(element, ts) {
    if (element !== el) { el = element; lastCT = -1; }
    const ct = element.currentTime;
    if (ct !== lastCT) { lastCT = ct; lastTs = ts; }
    const extra = Math.max(0, Math.min(100, ts - lastTs));
    return ct * 1000 + extra;
  };
}
