/* =========================================================================
   REPRODUCTOR — playlist local del concierto "After Hours (Live At SoFi
   Stadium)" (31 pistas) con crossfade entre dos elementos <audio>.
   -------------------------------------------------------------------------
   El audio es local (assets/tracks/*.mp3) y se reproduce SIN pasar por Web
   Audio: ya no hay analizador en vivo. La sincronia visual sale de los mapas de
   ritmo precalculados (assets/beatmaps/*.json): este modulo solo le dice al
   motor que pista suena y en que milisegundo (sync.read).
   ========================================================================= */
import PLAYLIST from './playlist.js';
import { sync, createAudioClock } from './beat-sync.js';
import { loadBeatmap, trackKey } from './beatmap.js';
import { scheduleRepelUpdate } from './repel.js';

let plIndex = -1;          // pista en curso (-1 = parado)
let plPlaying = false;
let plPanelOpen = false;   // visibilidad del panel (el toggle solo muestra/oculta)
// Crossfade CORTO (450 ms, antes 1000 ms). Con 1 s se oian las dos pistas
// mezcladas al 50% durante un segundo entero y la gente lo reportaba como
// "audio doble"; 450 ms mantiene el empalme suave sin que se perciba solape.
const plFadeMs = 450;      // crossfade entre tracks
const plPreMs = 4000;      // preroll: prepara la siguiente pista con adelanto
let plFadeItv = null;
let plTickItv = null;
let plToastTimer = null;
let plNxtIndex = -1;       // pista cargada en el buffer auxiliar
let plFading = false;      // true mientras dure un crossfade (evita re-entradas)
const audioA = new Audio();
const audioB = new Audio();
let audioCur = audioA;     // el que suena
let audioNxt = audioB;     // el que entrara en el crossfade

function fmtTime(s) {
  if (!isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const ss = Math.floor(s % 60);
  return m + ':' + (ss < 10 ? '0' : '') + ss;
}
function trackAt(i) {
  return (PLAYLIST && PLAYLIST.tracks && PLAYLIST.tracks[i]) || null;
}
function currentTrack() { return trackAt(plIndex); }

// --- Toast now-playing: caratula, titulo y artista del track en curso ---
function showNowPlaying() {
  const toast = document.getElementById('nowPlaying');
  const t = currentTrack();
  if (!toast || !t) return;
  document.getElementById('npTitle').textContent = t.title || '';
  const ar = document.getElementById('npArtist');
  if (ar) {
    const albumArtist = PLAYLIST && PLAYLIST.artist;
    ar.textContent = (t.artist && t.artist !== albumArtist)
      ? t.artist + ' \u00b7 ' + (albumArtist || '')
      : (t.artist || albumArtist || '');
  }
  const cover = document.getElementById('npCover');
  if (PLAYLIST && PLAYLIST.cover) {
    cover.style.display = '';
    cover.src = PLAYLIST.cover;
    cover.onerror = () => { cover.style.display = 'none'; };
  } else {
    cover.style.display = 'none';
  }
  toast.classList.add('show');
  clearTimeout(plToastTimer);
  plToastTimer = setTimeout(() => toast.classList.remove('show'), 4000);
  toast.onclick = () => {
    clearTimeout(plToastTimer);
    toast.classList.remove('show');
  };
}

// --- Tracklist (UI aprendida del embed de Spotify) ---
function renderTracklist() {
  const list = document.getElementById('plList');
  if (!list || !PLAYLIST || !PLAYLIST.tracks) return;
  const cov = document.getElementById('plCover');
  if (cov) cov.src = PLAYLIST.cover || '';
  const ti = document.getElementById('plTitle');
  if (ti) ti.textContent = PLAYLIST.title || '';
  const ar = document.getElementById('plArtist');
  if (ar) ar.textContent = PLAYLIST.artist || '';
  list.textContent = '';
  PLAYLIST.tracks.forEach((t, i) => {
    const li = document.createElement('li');
    li.dataset.i = i;
    if (i === plIndex) li.classList.add('active');
    const num = document.createElement('span');
    num.className = 'pl-num';
    num.textContent = String(i + 1);
    const tit = document.createElement('span');
    tit.className = 'pl-tit';
    tit.textContent = t.title || '';
    const dur = document.createElement('span');
    dur.className = 'pl-dur';
    dur.textContent = fmtTime(t.duration || 0);
    li.append(num, tit, dur);
    li.addEventListener('click', (e) => {
      e.stopPropagation(); // no dispara el expand del panel
      playTrack(i);
    });
    list.appendChild(li);
  });
}
function updateTracklistActive() {
  document.querySelectorAll('#plList li').forEach(r => {
    r.classList.toggle('active', Number(r.dataset.i) === plIndex);
  });
}

// --- Barra now-playing del panel ---
function renderBar() {
  const bt = document.getElementById('plBarTitle');
  const t = currentTrack();
  if (bt) bt.textContent = t ? (t.title || '') : 'Pulsa play para empezar';
  refreshBarTime();
}
function refreshBarTime() {
  const el = document.getElementById('plBarTime');
  if (!el) return;
  if (plIndex < 0 || !audioCur.src) { el.textContent = '0:00'; return; }
  const d = (audioCur.duration && isFinite(audioCur.duration))
    ? audioCur.duration : (currentTrack() ? currentTrack().duration : 0);
  el.textContent = fmtTime(audioCur.currentTime) + ' / ' + fmtTime(d);
}
function setBarIcon(playing) {
  const ic = document.getElementById('plPlayIcon');
  if (ic) {
    ic.innerHTML = playing
      ? '<path d="M6 4h4v16H6zM14 4h4v16h-4z"/>'
      : '<path d="M8 5v14l11-7z"/>';
  }
  const b = document.getElementById('plPlayBtn');
  if (b) b.setAttribute('aria-label', playing ? 'Pausar' : 'Reproducir');
}

// --- Visibilidad del panel: el toggle solo muestra/oculta; la musica sigue ---
function openPanel() {
  const panel = document.getElementById('spotifyPanel');
  const toggle = document.getElementById('spotifyToggle');
  plPanelOpen = true;
  if (toggle) toggle.classList.add('on');
  if (panel) {
    panel.classList.add('show');
    panel.classList.add('compact');
    panel.classList.remove('idle');
  }
  scheduleRepelUpdate(550);
}
function closePanel() {
  const panel = document.getElementById('spotifyPanel');
  const toggle = document.getElementById('spotifyToggle');
  plPanelOpen = false;
  if (toggle) toggle.classList.remove('on');
  if (panel) {
    panel.classList.remove('show');
    panel.classList.remove('expanded');
    setPinned(false);
  }
  scheduleRepelUpdate(550);
}

// Pin acotado al uso real (no a "abierto"): protege el scroll sin dejarlo siempre visible.
let pinGraceTimer = null;
function setPinned(on) {
  const panel = document.getElementById('spotifyPanel');
  if (!panel) return;
  if (on) {
    clearTimeout(pinGraceTimer);
    if (!panel.classList.contains('pinned')) panel.classList.add('pinned');
    panel.classList.remove('idle');
  } else {
    clearTimeout(pinGraceTimer);
    pinGraceTimer = setTimeout(() => panel.classList.remove('pinned'), 300);
  }
}

// --- Motor de reproduccion: audio A/B con crossfade ---
function resetAudio(el) {
  el.pause();
  el.removeAttribute('src');
  el.load();
  el.volume = 1;
}
// El avance de pista se apoyaba solo en setInterval: en pestana oculta Chrome
// estrangula los timers (hasta 1 vez por minuto), el fundido no cerraba y la
// lista se cortaba o solapaba dos pistas. 'timeupdate' lo dispara el propio
// elemento de audio y NO se estrangula, asi que es la fuente fiable; el
// intervalo de 1 s se queda solo como red de seguridad.
audioA.addEventListener('timeupdate', () => trackProgress());
audioB.addEventListener('timeupdate', () => trackProgress());
const onEnded = (e) => {
  // Fin natural sin crossfade en curso. Solo cuenta el elemento que sonaba: el
  // otro puede estar liberandose. Si habia siguiente pista (el crossfade no
  // llego a armarse: pestana estrangulada, metadatos imprecisos) se avanza en
  // vez de cortar la lista; en la ultima, parada limpia.
  if (!plPlaying || plFadeItv !== null || e.target !== audioCur) return;
  if (PLAYLIST.tracks[plIndex + 1]) playTrack(plIndex + 1); else stopPlayback();
};
audioA.addEventListener('ended', onEnded);
audioB.addEventListener('ended', onEnded);

function stopPlayback() {
  clearInterval(plFadeItv); plFadeItv = null;
  clearInterval(plTickItv); plTickItv = null;
  plFading = false;
  resetAudio(audioA); resetAudio(audioB);
  plIndex = -1; plPlaying = false; plNxtIndex = -1;
  setBarIcon(false);
  updateTracklistActive();
  renderBar();
}
// Regla de oro del reproductor: SOLO el elemento "actual" puede sonar.
// El otro se para y se libera. Sin esto, cualquier crossfade interrumpido
// (clic en otra pista, pausa, salto) dejaba al elemento entrante sonando
// por su cuenta y se escuchaban DOS PISTAS A LA VEZ: el "audio doble".
function releaseOther(keep) {
  [audioA, audioB].forEach((el) => {
    if (el === keep) return;
    try {
      el.pause();
      el.removeAttribute('src');
      el.load();
      el.volume = 1;
    } catch (e) { /* liberar es decorativo: nunca rompe el play */ }
  });
}

function pausePlayback() {
  if (!plPlaying) return;
  audioCur.pause();
  // Si se pausa en medio de un crossfade, el entrante tambien se calla
  // (pero no se libera: al reanudar el fundido sigue donde estaba).
  if (audioNxt && audioNxt !== audioCur) audioNxt.pause();
  plPlaying = false;
  setBarIcon(false);
}
function resumePlayback() {
  if (plIndex < 0) { playTrack(0); return; }
  if (!audioCur.src) { playTrack(plIndex); return; }
  audioCur.volume = 1;
  const p = audioCur.play();
  if (p && p.catch) p.catch(() => {});
  // Fundido en pausa: se reanuda tambien el entrante, con su volumen actual.
  if (plFadeItv !== null && audioNxt && audioNxt.src) {
    const q = audioNxt.play();
    if (q && q.catch) q.catch(() => {});
  }
  plPlaying = true;
  setBarIcon(true);
}
function togglePlay() {
  if (plPlaying) pausePlayback(); else resumePlayback();
}

function armPreroll() {
  if (!PLAYLIST || !PLAYLIST.tracks) return;
  const nxt = plIndex + 1;
  if (nxt >= PLAYLIST.tracks.length) return;
  if (plNxtIndex === nxt && audioNxt.src) return; // ya preparado
  plNxtIndex = nxt;
  audioNxt.volume = 0;
  audioNxt.src = PLAYLIST.tracks[nxt].file;
  audioNxt.load();
  loadBeatmap(keyOf(nxt));      // el mapa de ritmo llega antes que la pista
}

function startFade() {
  if (!PLAYLIST || !PLAYLIST.tracks) return;
  const nxt = plIndex + 1;
  if (nxt >= PLAYLIST.tracks.length) return;
  if (plFading) return; // ya hay un crossfade en marcha
  plFading = true;
  const out = audioCur, inc = audioNxt;
  if (plNxtIndex !== nxt || !inc.src) armPreroll();
  plIndex = nxt;
  plPlaying = true;
  inc.volume = 0;
  const p = inc.play();
  if (p && p.catch) p.catch(() => {});
  const t0 = performance.now();
  // Cierre del fundido, IDEMPOTENTE: puede llegar por el intervalo, por el
  // 'ended' del saliente o por el vigilante de trackProgress. Importa porque
  // Chrome estrangula los setInterval en pestana oculta (hasta 1 vez por
  // minuto) y el intervalo por si solo podia dejar DOS pistas sonando
  // durante casi un minuto, que es justo el "audio doble" reportado.
  let closed = false;
  const close = () => {
    if (closed || !plFading) return;   // fundido ya cerrado o interrumpido
    closed = true;
    clearInterval(plFadeItv); plFadeItv = null;
    plFading = false;
    try { out.removeEventListener('ended', close); } catch (e) {}
    out.pause();
    out.volume = 1;
    out.removeAttribute('src');
    out.load();
    const swap = audioCur; audioCur = audioNxt; audioNxt = swap;
    plNxtIndex = -1;
    showNowPlaying();
    updateTracklistActive();
    renderBar();
  };
  try { out.addEventListener('ended', close); } catch (e) {}
  clearInterval(plFadeItv);
  plFadeItv = setInterval(() => {
    const k = Math.min(1, (performance.now() - t0) / plFadeMs);
    out.volume = 1 - k;
    inc.volume = k;
    refreshBarTime();
    if (k >= 1) close();
  }, 32);
}

function trackProgress() {
  if (plIndex < 0 || !audioCur.src || !plPlaying) return;
  // Vigilante: fuera de un crossfade el segundo elemento NUNCA puede estar
  // sonando. Si lo esta (fundido interrumpido por un salto de pista, carrera
  // de reloj o pestana estrangulada) se calla y se libera aqui mismo: es la
  // red que garantiza que nunca se oigan dos pistas a la vez.
  if (!plFading && audioNxt && audioNxt !== audioCur && !audioNxt.paused) {
    releaseOther(audioCur);
  }
  const t = currentTrack();
  if (!t) return;
  const d = (audioCur.duration && isFinite(audioCur.duration))
    ? audioCur.duration : (t.duration || 0);
  const rem = d - audioCur.currentTime;
  refreshBarTime();
  if (rem <= plPreMs / 1000 + 0.3 && rem > plFadeMs / 1000 + 0.2) armPreroll();
  if (rem <= plFadeMs / 1000 + 0.1) startFade();
}

// Reproduce la pista i; si ya sonaba algo, lo corta (salto inmediato).
function playTrack(i) {
  if (!PLAYLIST || !PLAYLIST.tracks || !PLAYLIST.tracks[i]) return;
  clearInterval(plFadeItv); plFadeItv = null;
  clearInterval(plTickItv); plTickItv = null;
  plFading = false;
  plIndex = i;
  loadBeatmap(keyOf(i));
  // Si habia un crossfade en marcha, el entrante puede estar sonando: se
  // libera ANTES de nada (aqui estaba el bug del audio doble al saltar de
  // pista justo en el segundo del fundido).
  releaseOther(audioCur);
  audioCur.pause();
  audioCur.volume = 1;
  audioCur.src = PLAYLIST.tracks[i].file;
  audioCur.currentTime = 0;
  const p = audioCur.play();
  if (p && p.catch) p.catch(() => {});
  plPlaying = true;
  setBarIcon(true);
  openPanel();
  showNowPlaying();
  updateTracklistActive();
  renderBar();
  armPreroll();
  plTickItv = setInterval(trackProgress, 1000);   // red (el primario es timeupdate)
  scheduleRepelUpdate(550);
}

// El play del gate arranca toda la lista desde la pista 1.
function playlistStart() { playTrack(0); }

function setupPlaylist() {
  const panel = document.getElementById('spotifyPanel');
  const wrap = panel ? panel.querySelector('.spotify-frame-wrap') : null;
  const toggle = document.getElementById('spotifyToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      if (plPanelOpen) closePanel(); else openPanel();
    });
  }
  if (wrap) {
    // Tap = hover en touch: alterna expandido en modo compact (musica intacta).
    wrap.addEventListener('click', (e) => {
      if (e.target.closest('.pl-list li')) return; // los rows gestionan su click
      if (panel.classList.contains('compact')) {
        panel.classList.toggle('expanded');
        scheduleRepelUpdate(500);
      }
    });
    // Pin solo mientras el puntero/foco esta dentro; wheel rearma (scroll sin mover mouse).
    wrap.addEventListener('mouseenter', () => setPinned(true));
    wrap.addEventListener('mouseleave', () => setPinned(false));
    wrap.addEventListener('focusin', () => setPinned(true));
    wrap.addEventListener('focusout', () => setPinned(false));
    wrap.addEventListener('wheel', () => setPinned(true), { passive: true });
  }
  const playBtn = document.getElementById('plPlayBtn');
  if (playBtn) {
    playBtn.addEventListener('click', (e) => { e.stopPropagation(); togglePlay(); });
  }
  renderTracklist();
  renderBar();
}

// ---------------------------------------------------------------------------
// Sincronia con el motor ASCII
// ---------------------------------------------------------------------------
const readClock = createAudioClock();
const keyOf = (i) => trackKey(PLAYLIST.tracks[i] && PLAYLIST.tracks[i].file);

/**
 * Que suena y donde, para el motor (una vez por frame). Durante un crossfade
 * manda el elemento ENTRANTE: plIndex ya apunta a la pista nueva, pero
 * audioCur sigue siendo el saliente hasta que el fundido cierra.
 */
sync.read = function (ts) {
  if (plIndex < 0 || !plPlaying) return null;
  const el = plFading ? audioNxt : audioCur;
  if (!el.src || el.paused || el.seeking) return null;
  return { key: keyOf(plIndex), ms: readClock(el, ts) };
};

export { setupPlaylist as initPlaylist, playlistStart };
