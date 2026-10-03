/* =========================================================================
   Repulsion dura con forma de card
   -------------------------------------------------------------------------
   Los glifos NO se dibujan debajo de la UI (dock, panel de la playlist, boton
   del gate): cada elemento define un rectangulo redondeado y un margen de
   exclusion opaco alrededor, sin filtraciones.

   Coordenadas: px CSS relativos al canvas #ascii.
   ========================================================================= */

export const REPEL_MARGIN = 12;

let rects = [];                 // { x, y, w, h, r }

function inRoundedRect(px, py, r) {
  if (px < r.x || px > r.x + r.w || py < r.y || py > r.y + r.h) return false;
  const rad = Math.min(r.r, r.w / 2, r.h / 2);
  if (px >= r.x + rad && px <= r.x + r.w - rad) return true;
  if (py >= r.y + rad && py <= r.y + r.h - rad) return true;
  const cx = px < r.x + rad ? r.x + rad : r.x + r.w - rad;
  const cy = py < r.y + rad ? r.y + rad : r.y + r.h - rad;
  const dx = px - cx, dy = py - cy;
  return dx * dx + dy * dy <= rad * rad;
}

/** Dentro del rect o de su franja de margen (esquinas redondeadas extendidas). */
function inExclusion(px, py, r) {
  const m = REPEL_MARGIN;
  const ex = r.x - m, ey = r.y - m, ew = r.w + m * 2, eh = r.h + m * 2;
  if (px < ex || px > ex + ew || py < ey || py > ey + eh) return false;
  if (inRoundedRect(px, py, r)) return true;
  const rad = Math.min(r.r + m, ew / 2, eh / 2);
  if (px >= ex + rad && px <= ex + ew - rad) return true;
  if (py >= ey + rad && py <= ey + eh - rad) return true;
  const cx = px < ex + rad ? ex + rad : ex + ew - rad;
  const cy = py < ey + rad ? ey + rad : ey + eh - rad;
  const dx = px - cx, dy = py - cy;
  return dx * dx + dy * dy <= rad * rad;
}

/** true si el punto cae en la zona de exclusion de algun elemento de UI. */
export function isExcluded(px, py) {
  const m = REPEL_MARGIN;
  for (let i = 0; i < rects.length; i++) {
    const r = rects[i];
    // Descarte barato por bbox del margen antes del test redondeado.
    if (px < r.x - m || px > r.x + r.w + m || py < r.y - m || py > r.y + r.h + m) continue;
    if (inExclusion(px, py, r)) return true;
  }
  return false;
}

export function hasRepel() {
  return rects.length > 0;
}

/** Relee la geometria de la UI. Decorativo: jamas rompe el render. */
export function updateRepelRects() {
  const next = [];
  try {
    const cv = document.getElementById('ascii');
    if (cv) {
      const cvBox = cv.getBoundingClientRect();
      const push = (el, rad) => {
        if (!el) return;
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return;
        const b = el.getBoundingClientRect();
        if (b.width < 4 || b.height < 4) return;
        next.push({ x: b.left - cvBox.left, y: b.top - cvBox.top, w: b.width, h: b.height, r: rad });
      };

      const dock = document.getElementById('dock');
      const dockHidden = dock && (!dock.classList.contains('show') ||
        dock.classList.contains('idle') || dock.classList.contains('reveal-hidden'));
      if (!dockHidden) push(document.querySelector('.card'), 16);

      const panel = document.getElementById('spotifyPanel');
      if (panel && panel.classList.contains('show') && !panel.classList.contains('idle')) {
        push(panel.querySelector('.spotify-frame-wrap'), 12);
      }

      // Gate pre-play: el boton flota en una zona de glifos calmados. Radio 48
      // (mitad del lado): la exclusion sigue el CIRCULO del boton.
      const gate = document.getElementById('playGate');
      if (gate && !gate.classList.contains('hidden')) {
        push(document.getElementById('playBtn'), 48);
      }
    }
  } catch (e) { /* decorativo */ }
  rects = next;
}

/**
 * Pide un refresco ahora y, opcionalmente, otro tras `delayMs` (los paneles
 * animan su apertura: la geometria final llega unos cientos de ms despues).
 */
export function scheduleRepelUpdate(delayMs) {
  updateRepelRects();
  if (delayMs > 0) setTimeout(updateRepelRects, delayMs);
}
