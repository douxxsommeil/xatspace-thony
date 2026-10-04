import { sync } from './beat-sync.js';
import { setupBead } from './bead.js';
import { initPlaylist, playlistStart } from './player.js';
import { scheduleRepelUpdate } from './repel.js';

/* =========================================================================
   OVERLAY — avatar / card / nombre glitch / play-gate / auto-hide
   (el reproductor vive en player.js y la perla del boton en bead.js)
   ========================================================================= */

// Set de caracteres "glitch": simbolos tipo terminal + algunas runas para que
// el scramble sea coherente con la fuente gotica final.
const GLITCH_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+-<>/\\|~^ᛝᚱᛟ§Ω✕✦";
const TARGET_TEXT = "Thony";          // texto que se "decodifica" en el dock

const nameEl = document.getElementById('nameGlitch');
const nameRow = document.getElementById('nameRow');

let hoverActive = false;
let autoResetItv = null;

const randChar = () => GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];

function renderSpans(text) {
  // Cada caracter va en su propio <span> para animarlos individualmente.
  nameEl.innerHTML = '';
  for (const ch of text) {
    const span = document.createElement('span');
    span.className = 'ch';
    span.textContent = ch;
    nameEl.appendChild(span);
  }
  return Array.from(nameEl.children);
}

// Las dos animaciones del nombre (decodificar / modo loco) usan rAF con un
// token de sesion: cualquier bucle anterior se auto-invalida al empezar otro,
// aunque ya tuviera un frame agendado. (Antes se mezclaba clearInterval con ids
// de rAF: los ids de timers y de rAF son espacios distintos, asi que
// clearInterval(rafId) podia cancelar un setInterval AJENO con el mismo
// numero — el auto-reset, el repel o el avance de pista.)
let nameRAF = 0;
let nameSession = 0;

function stopNameAnimation() {
  nameSession++;
  cancelAnimationFrame(nameRAF);
}

// "Decodificacion": cada caracter empieza aleatorio y se resuelve al real, de
// izquierda a derecha con solape (reveal de texto tipo hacker).
function playDecodeAnimation() {
  stopNameAnimation();
  const my = nameSession;
  const spans = renderSpans(TARGET_TEXT);
  const perCharDuration = 260;   // ms que cada char pasa "scrambleando"
  const stagger = 70;            // ms de desfase entre el inicio de cada char
  const startTime = performance.now();

  function frame(now) {
    if (my !== nameSession) return;
    const elapsed = now - startTime;
    let allDone = true;
    spans.forEach((span, i) => {
      if (elapsed - i * stagger < perCharDuration) {
        span.textContent = randChar();
        allDone = false;
      } else {
        span.textContent = TARGET_TEXT[i];
      }
    });
    if (!allDone) nameRAF = requestAnimationFrame(frame);
  }
  nameRAF = requestAnimationFrame(frame);
}

// Modo "loco": con el puntero encima TODOS los caracteres cambian sin parar.
function startCrazyGlitch() {
  stopNameAnimation();
  const my = nameSession;
  const spans = nameEl.querySelectorAll('.ch');
  const swapEvery = 55;          // ms
  let lastSwap = 0;

  function loop(ts) {
    if (!hoverActive || my !== nameSession) return;
    if (ts - lastSwap >= swapEvery) {
      spans.forEach((span) => { span.textContent = randChar(); });
      lastSwap = ts;
    }
    nameRAF = requestAnimationFrame(loop);
  }
  nameRAF = requestAnimationFrame(loop);
}

function setupNameHover() {
  const enter = () => { hoverActive = true; startCrazyGlitch(); };
  const leave = () => { hoverActive = false; playDecodeAnimation(); };
  nameRow.addEventListener('mouseenter', enter);
  nameRow.addEventListener('mouseleave', leave);
  // touch: el tap mantiene el modo loco mientras se sostiene
  nameRow.addEventListener('touchstart', enter, { passive: true });
  nameRow.addEventListener('touchend', leave);
}

// Reset automatico cada 60 s: vuelve a decodificar (si no hay hover activo).
function setupAutoReset() {
  clearInterval(autoResetItv);
  autoResetItv = setInterval(() => { if (!hoverActive) playDecodeAnimation(); }, 60000);
}

// Avatar: archivo normal (lo cachea el navegador y no ensucia el DOM).
function setupAvatar() {
  document.getElementById('avatarImg').src = 'assets/avatar.png';
}

// ---------------------------------------------------------------------------
// Boton de animaciones de la musica (junto al de ocultar el reproductor).
// Se recuerda entre visitas; si el navegador no deja guardar, funciona igual.
// ---------------------------------------------------------------------------
const FX_STORAGE_KEY = 'xatspace.musicFx';

function setupFxToggle() {
  const btn = document.getElementById('fxToggle');
  if (!btn) return;

  try { if (localStorage.getItem(FX_STORAGE_KEY) === '0') sync.fxEnabled = false; } catch (e) {}

  const render = () => {
    const on = sync.fxEnabled;
    btn.classList.toggle('on', on);
    btn.setAttribute('aria-pressed', String(on));
    const label = on ? 'Desactivar animaciones de la música' : 'Activar animaciones de la música';
    btn.setAttribute('aria-label', label);
    btn.title = 'Animaciones de la música: ' + (on ? 'activadas' : 'desactivadas');
  };
  render();

  btn.addEventListener('click', () => {
    sync.fxEnabled = !sync.fxEnabled;
    try { localStorage.setItem(FX_STORAGE_KEY, sync.fxEnabled ? '1' : '0'); } catch (e) {}
    render();
  });
}

// ---------------------------------------------------------------------------
// Play gate: al pulsar arranca toda la lista local desde la pista 1, el titulo
// de bienvenida se retira, el dock aparece y el nombre se decodifica.
// ---------------------------------------------------------------------------
function setupPlayGate() {
  const gate = document.getElementById('playGate');
  const btn = document.getElementById('playBtn');
  const dock = document.getElementById('dock');
  // Perla de cristal (WebGL propio de 120 px sobre los glifos): se crea ANTES
  // del listener para que el clic pueda profundizarla y retirarla.
  const bead = setupBead(btn, gate);

  // Un solo arranque posible. Con Enter y el boton enfocado el navegador
  // dispara un click propio ADEMAS del nuestro (btn.click()): sin esta guarda
  // el gate arrancaba dos veces (dos playTrack(0), doble fetch y reinicio).
  let started = false;
  btn.addEventListener('click', () => {
    if (started || gate.classList.contains('hidden')) return;
    started = true;
    if (bead) { bead.boost(); bead.stop(); }   // se profundiza un instante y se retira
    sync.welcomeDone = true;                    // titulo de bienvenida: fuera para siempre
    gate.classList.add('hidden');
    dock.classList.add('show');
    playDecodeAnimation();
    setupAutoReset();
    playlistStart();                            // reproduce la lista completa desde la pista 1
    scheduleRepelUpdate(400);
  });

  // Enter (solo mientras el gate es visible; el auto-repeat se ignora).
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' || e.repeat) return;
    if (gate.classList.contains('hidden')) return;
    btn.click();
  });
}

// -----------------------------------------------------------------------
// Auto-hide de la UI: si el mouse deja de moverse, el dock (y el panel de
// Spotify si está abierto) se desvanecen. Se reactivan apenas el mouse
// vuelve a moverse. Mientras el puntero está físicamente encima de la
// card o del panel, el fade no se dispara (el usuario puede estar
// leyendo o interactuando sin mover el mouse).
// -----------------------------------------------------------------------
function setupIdleFade() {
  const dock = document.getElementById('dock');
  const panel = document.getElementById('spotifyPanel');
  const card = document.querySelector('.card');
  const wrap = panel.querySelector('.spotify-frame-wrap');
  const stage = document.getElementById('stage');

  const IDLE_DELAY = 2400; // ms de quietud antes de desvanecer
  const REVEAL_DELAY = 300; // hover en fondo antes de ocultar cards
  let idleTimer = null;
  let revealTimer = null;
  let pointerOverUI = false;

  const refreshRepel = () => scheduleRepelUpdate(0);

  function reveal() {
    dock.classList.remove('idle');
    dock.classList.remove('reveal-hidden');
    // El panel pineado nunca recibe idle mientras esta abierto/en uso.
    if (!panel.classList.contains('pinned')) {
      panel.classList.remove('idle');
    }
    clearTimeout(revealTimer);
    refreshRepel();
  }

  function armIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      if (!pointerOverUI) {
        dock.classList.add('idle');
        if (!panel.classList.contains('pinned')) {
          panel.classList.add('idle');
        }
        refreshRepel();
      }
    }, IDLE_DELAY);
  }

  function armRevealTimer() {
    clearTimeout(revealTimer);
    revealTimer = setTimeout(() => {
      if (!pointerOverUI && dock.classList.contains('show')) {
        dock.classList.add('reveal-hidden');
        refreshRepel();
      }
    }, REVEAL_DELAY);
  }

  // Movimiento en cualquier parte: revela y rearma timers.
  ['mousemove', 'pointermove'].forEach(evt => {
    window.addEventListener(evt, () => {
      reveal();
      armIdleTimer();
    }, { passive: true });
  });

  // Hover sobre el fondo (stage): oculta cards para ver el ASCII detras.
  stage.addEventListener('mousemove', () => {
    if (!pointerOverUI) armRevealTimer();
  }, { passive: true });
  stage.addEventListener('mouseleave', () => clearTimeout(revealTimer));

  // Touch: un tap también revela.
  window.addEventListener('touchstart', () => {
    reveal();
    armIdleTimer();
  }, { passive: true });

  // Sobre la card o el panel: no hay fade ni reveal, scroll protegido.
  [card, panel].forEach(el => {
    if (!el) return;
    el.addEventListener('mouseenter', () => {
      pointerOverUI = true;
      clearTimeout(idleTimer);
      clearTimeout(revealTimer);
      reveal();
      refreshRepel();
    });
    el.addEventListener('mouseleave', () => {
      pointerOverUI = false;
      wrap.classList.remove('halo-near');
      armIdleTimer();
      refreshRepel();
    });
  });

  // Halo reactivo solido: proximidad al wrap, misma silueta rounded-rect.
  window.addEventListener('mousemove', (e) => {
    if (!panel.classList.contains('show')) return;
    const b = wrap.getBoundingClientRect();
    const cx = b.left + b.width / 2, cy = b.top + b.height / 2;
    const d = Math.hypot(e.clientX - cx, e.clientY - cy);
    wrap.classList.toggle('halo-near', d < 320);
  }, { passive: true });

  armIdleTimer();
}

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
  setupAvatar();
  setupNameHover();
  setupPlayGate();
  initPlaylist();
  setupFxToggle();
  setupIdleFade();
  // Texto ya resuelto detras del gate, listo para animar desde cero.
  renderSpans(TARGET_TEXT);
});
