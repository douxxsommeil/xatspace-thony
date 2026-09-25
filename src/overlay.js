/* =========================================================================
   OVERLAY — avatar / card / nombre glitch / play-gate / spotify
   ========================================================================= */
(function () {
  "use strict";

  // Set de caracteres "glitch": mezcla de símbolos tipo terminal/matrix +
  // algunas letras góticas-ish para que el scramble se sienta coherente
  // con la fuente gótica final.
  const GLITCH_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+-<>/\\|~^ᛝᚱᛟ§Ω✕✦";

  const nameEl = document.getElementById('nameGlitch');
  const nameRow = document.getElementById('nameRow');

  let scrambleTimer = null;
  let resetInterval = null;
  let hoverActive = false;
  let settleTimeout = null;

  function randChar() {
    return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
  }

  function renderSpans(text) {
    // Cada carácter va en su propio <span> para poder animarlos individualmente
    nameEl.innerHTML = '';
    for (const ch of text) {
      const span = document.createElement('span');
      span.className = 'ch';
      span.textContent = ch;
      nameEl.appendChild(span);
    }
    return Array.from(nameEl.children);
  }

  // -----------------------------------------------------------------------
  // Animación de "decodificación": cada carácter empieza aleatorio y va
  // "resolviéndose" al carácter real, de izquierda a derecha con un poco
  // de solape, como un efecto hacker típico de reveal de texto.
  // -----------------------------------------------------------------------
  function playDecodeAnimation(onDone) {
    clearInterval(scrambleTimer);
    const spans = renderSpans(TARGET_TEXT);
    const n = spans.length;

    const perCharDuration = 260; // ms que cada char pasa "scrambleando" antes de resolverse
    const stagger = 70;          // ms de desfase entre el inicio de cada char
    const totalDuration = stagger * (n - 1) + perCharDuration;

    const startTime = performance.now();

    function frame(now) {
      const elapsed = now - startTime;
      let allDone = true;

      spans.forEach((span, i) => {
        const charStart = i * stagger;
        const charElapsed = elapsed - charStart;

        if (charElapsed < 0) {
          // todavía no le toca: mostrar espacio en blanco sutil o char aleatorio suave
          span.textContent = randChar();
          allDone = false;
        } else if (charElapsed < perCharDuration) {
          span.textContent = randChar();
          allDone = false;
        } else {
          span.textContent = TARGET_TEXT[i];
        }
      });

      if (!allDone) {
        scrambleTimer = requestAnimationFrame(frame);
      } else {
        // asegurar texto final exacto
        spans.forEach((span, i) => { span.textContent = TARGET_TEXT[i]; });
        if (typeof onDone === 'function') onDone();
      }
    }

    scrambleTimer = requestAnimationFrame(frame);
  }

  // -----------------------------------------------------------------------
  // Modo "loco": mientras el mouse está encima, TODOS los caracteres
  // cambian aleatoriamente sin parar (glitch intenso continuo).
  // Se usa un token de sesión (en vez de solo cancelAnimationFrame) para
  // que, ante un enter/leave/enter muy rápido, cualquier loop anterior
  // se auto-invalide de inmediato en vez de quedar corriendo en paralelo.
  // -----------------------------------------------------------------------
  let crazyRAF = null;
  let crazySession = 0;

  function startCrazyGlitch() {
    cancelAnimationFrame(scrambleTimer);
    clearInterval(scrambleTimer);
    cancelAnimationFrame(crazyRAF);

    const mySession = ++crazySession;
    const spans = nameEl.querySelectorAll('.ch');
    let lastSwap = 0;
    const swapEvery = 55; // ms — velocidad del parpadeo loco

    function loop(ts) {
      if (!hoverActive || mySession !== crazySession) return; // loop obsoleto o mouse afuera: se corta
      if (ts - lastSwap >= swapEvery) {
        spans.forEach(span => { span.textContent = randChar(); });
        lastSwap = ts;
      }
      crazyRAF = requestAnimationFrame(loop);
    }
    crazyRAF = requestAnimationFrame(loop);
  }

  function stopCrazyGlitch() {
    crazySession++; // invalida cualquier loop en vuelo, incluso si ya se agendó otro frame
    cancelAnimationFrame(crazyRAF);
  }

  // -----------------------------------------------------------------------
  // Wiring de hover: al entrar -> modo loco; al salir -> corre decode y
  // se queda estable.
  // -----------------------------------------------------------------------
  function setupNameHover() {
    nameRow.addEventListener('mouseenter', () => {
      hoverActive = true;
      clearTimeout(settleTimeout);
      startCrazyGlitch();
    });
    nameRow.addEventListener('mouseleave', () => {
      hoverActive = false;
      stopCrazyGlitch();
      playDecodeAnimation();
    });
    // soporte touch: tap mantiene el loco mientras se sostiene
    nameRow.addEventListener('touchstart', (e) => {
      hoverActive = true;
      clearTimeout(settleTimeout);
      startCrazyGlitch();
    }, { passive: true });
    nameRow.addEventListener('touchend', () => {
      hoverActive = false;
      stopCrazyGlitch();
      playDecodeAnimation();
    });
  }

  // -----------------------------------------------------------------------
  // Reset automático cada 60s: vuelve a correr la animación de decodificación
  // (solo si no está en medio de un hover activo).
  // -----------------------------------------------------------------------
  function setupAutoReset() {
    resetInterval = setInterval(() => {
      if (!hoverActive) {
        playDecodeAnimation();
      }
    }, 60000);
  }

  // -----------------------------------------------------------------------
  // Avatar: se inyecta desde el blob base64
  // -----------------------------------------------------------------------
  function setupAvatar() {
    const img = document.getElementById('avatarImg');
    // El avatar era un PNG de 360 KB inlineado en base64 dentro del HTML.
    // Ahora es un archivo normal: lo cachea el navegador y no ensucia el DOM.
    img.src = 'assets/avatar.png';
  }

  // -----------------------------------------------------------------------
  // Playlist local: reproductor del concierto "After Hours (Live At SoFi
  // Stadium)" (31 tracks). Sustituye al embed de Spotify: la tracklist imita
  // la UI del iframe, pero el audio es local. El manifest llega via
  // assets/playlist.js (window.__PLAYLIST__): cada mp3 tiene nombre opaco y
  // el manifest lo indexa con su metadata real.
  // -----------------------------------------------------------------------
  let PLAYLIST = null;         // manifest: se rellena bajo demanda (lazy)
  function PL() {
    if (!PLAYLIST) PLAYLIST = window.__PLAYLIST__ || null;
    return PLAYLIST;
  }
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

  // -----------------------------------------------------------------------
  // Análisis de bajo para el color reactivo del ASCII + onda del gate.
  // Tapa (tap) de Web Audio sobre audioA/audioB: NO altera volumen,
  // crossfade ni ducking. Decorativo y aislado: si Web Audio no arranca,
  // degrada a reposo estático sin errores (la regla: nunca rompe el play).
  // -----------------------------------------------------------------------
  const FX = {
    ctx: null, analyser: null, freq: null, els: [audioA, audioB],
    ok: false, failed: false,
    subLo: 1, subHi: 5, kickLo: 6, kickHi: 13,
    srcs: new WeakSet(),       // createMediaElementSource es irrevocable
    sub: 0, kick: 0,           // envolventes 0..1 (lo que pinta el color)
    rawSub: 0, rawKick: 0,     // lecturas crudas (verificación/calibración)
    peak: 0.10, avgK: 0, lastKick: -1e9, kickArmed: true,
    kickHits: [],              // marcas de kick (cap 64, depuración)
    // Paleta SATURADA de la portada (D1): salmón, rosa salmón, terracota
    // y ladrillo — excluidos negro/blanco/gris (los neutrales de la
    // paleta anterior eran imperceptibles). Un color por bombo, ciclo
    // (i+1)%4; -1 = aún sin bombo (el primero pinta salmón).
    pal: [[191, 112, 96], [191, 131, 120], [159, 76, 60], [128, 48, 32]],
    palIdx: -1,
    kickEvents: [],            // bombos pendientes de pintar en la capa 3D
    welcomeDone: false,        // título pre-play: se apaga en el 1er gate (D7)
    lastTs: 0, mql: null,
    rippleT0: null, rippleDone: false   // onda expansiva (única por sesión)
  };
  window.__FX = FX;

  // Se llama SOLO desde el click del gate (política de autoplay = gesto).
  FX.init = function () {
    if (FX.ok || FX.failed) return;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) { FX.failed = true; return; }
      // file:// = origen opaco: createMediaElementSource saldría en silencio
      // (verificado: energía 0 con música "sonando") y dejaría la página muda.
      // Allí manda la degradación (design Non-Goals): sin enrutar, la música
      // suena normal y los glifos se quedan en reposo estático.
      if (location.protocol === 'file:') { FX.failed = true; return; }
      if (!FX.ctx) {
        const ctx = new AC();
        const an = ctx.createAnalyser();
        an.fftSize = 4096;                 // bin ≈ 11.7 Hz @48k: resuelve 20-60 Hz
        an.smoothingTimeConstant = 0.55;
        const binHz = ctx.sampleRate / an.fftSize;
        FX.subLo = Math.max(1, Math.ceil(20 / binHz));
        FX.subHi = Math.max(FX.subLo, Math.floor(60 / binHz));
        FX.kickLo = FX.subHi + 1;
        FX.kickHi = Math.max(FX.kickLo, Math.ceil(150 / binHz));
        FX.freq = new Uint8Array(an.frequencyBinCount);
        // TAP PURO: el analizador solo ESCUCHA, nunca lleva el audio a los
        // altavoces. Antes la cadena era elemento -> analizador -> destination,
        // es decir el camino audible pasaba por el analizador; en Chrome, con
        // cambios de src en un elemento ya enrutado, ese montaje se ha
        // reportado como sonido DUPLICADO/distorsionado. Ahora el camino
        // audible es unico y explicito (fuente -> destination) y el analizador
        // cuelga en paralelo hacia un sumidero mudo (lo mantiene procesando
        // sin sumar ni un sample al altavoz).
        const mute = ctx.createGain();
        mute.gain.value = 0;
        an.connect(mute);
        mute.connect(ctx.destination);
        FX.els.forEach((el) => {
          if (FX.srcs.has(el)) return;     // una sola vez por elemento
          FX.srcs.add(el);
          const node = ctx.createMediaElementSource(el);
          node.connect(an);                // solo analisis (mudo)
          node.connect(ctx.destination);   // unico camino audible
        });
        FX.ctx = ctx;
        FX.analyser = an;
      }
      FX.mql = FX.mql || window.matchMedia('(prefers-reduced-motion: reduce)');
      if (FX.ctx.state === 'suspended') FX.ctx.resume().catch(() => {});
      FX.ok = true;
    } catch (e) {
      FX.failed = true; FX.ok = false;     // degradación silenciosa
    }
  };

  // Una lectura por frame (desde tick). Todo envuelto: nunca tira el loop.
  FX.update = function (ts) {
    if (!FX.ok || !FX.analyser) { FX.sub = 0; FX.kick = 0; return; }
    try {
      if (FX.ctx.state !== 'running') {    // reintenta resume sin romper nada
        FX.ctx.resume().catch(() => {});
        FX.sub *= 0.9; FX.kick = 0;
        return;
      }
      FX.analyser.getByteFrequencyData(FX.freq);
      const dt = Math.min(120, ts - (FX.lastTs || ts));
      FX.lastTs = ts;

      // --- sub-bass 20-60 Hz: media de banda -> envolvente lenta ---
      let s = 0;
      for (let i = FX.subLo; i <= FX.subHi; i++) s += FX.freq[i];
      s = s / ((FX.subHi - FX.subLo + 1) * 255);
      FX.rawSub = s;
      // Techo adaptativo: pico con caída lenta (~half-life 23 s) para que un
      // tema "siempre fuerte" no se quede en blanco fijo sin dramatismo.
      FX.peak = Math.max(0.10, FX.peak * (1 - 0.03 * dt / 1000));
      if (s > FX.peak) FX.peak = s;
      const target = Math.min(1, s / Math.max(0.10, FX.peak * 0.85));
      const tau = target > FX.sub ? 0.40 : 1.10;  // ataque ≈0.4 s / caída ≈1.1 s
      FX.sub += (target - FX.sub) * (1 - Math.exp(-dt / 1000 / tau));

      // --- kick 60-150 Hz: transitorio vs media corriendo ---
      let k = 0;
      for (let i = FX.kickLo; i <= FX.kickHi; i++) k += FX.freq[i];
      k = k / ((FX.kickHi - FX.kickLo + 1) * 255);
      FX.rawKick = k;
      // Media corrienda dt-dependiente (τ≈160 ms real: igual a 19 fps que a 60).
      const aK = 1 - Math.pow(0.9, dt / 16.7);
      FX.avgK = FX.avgK * (1 - aK) + k * aK;
      // Umbral relativo + cooldown ~150 ms + re-armado en borde de bajada:
      // tras un golpe hay que salir del umbral (k < media) para no re-disparar
      // con la sostenida del bajo aún alta. Calibrado con el mp3 real
      // (traza de 31 s, picos cada ~2.1 s): ~1 golpe por bombo, 0 dobles.
      if (FX.kickArmed) {
        if (k > FX.avgK * 1.15 + 0.05 && k > 0.12 && ts - FX.lastKick > 150) {
          FX.lastKick = ts;
          FX.kickArmed = false;
          FX.kickHits.push(Math.round(ts));
          if (FX.kickHits.length > 64) FX.kickHits.shift();
          // Bombo (D2): el detector solo AVISA. Cada golpe avanza el ciclo
          // de 4 colores de portada y encola un evento para la capa 3D,
          // que es quien pinta la ola glassmorphism detrás de los glifos.
          // El canvas 2D ya no reacciona al kick. reduced-motion: sin ola.
          FX.palIdx = (FX.palIdx + 1) % FX.pal.length;
          if (!FX.mql || !FX.mql.matches) {
            FX.kick = 1.0;
            FX.kickEvents.push({ t: ts, idx: FX.palIdx });
            if (FX.kickEvents.length > 8) FX.kickEvents.shift();
          }
        }
      } else if (k < FX.avgK) {
        FX.kickArmed = true;
      }
      FX.kick *= Math.exp(-dt / 300);      // caída ≈300 ms
      if (FX.kick < 0.004) FX.kick = 0;
    } catch (e) {
      FX.ok = false; FX.sub = 0; FX.kick = 0;
    }
  };

  function fmtTime(s) {
    if (!isFinite(s) || s < 0) s = 0;
    const m = Math.floor(s / 60);
    const ss = Math.floor(s % 60);
    return m + ':' + (ss < 10 ? '0' : '') + ss;
  }
  function trackAt(i) {
    return (PL() && PL().tracks && PL().tracks[i]) || null;
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
      const albumArtist = PL() && PL().artist;
      ar.textContent = (t.artist && t.artist !== albumArtist)
        ? t.artist + ' \u00b7 ' + (albumArtist || '')
        : (t.artist || albumArtist || '');
    }
    const cover = document.getElementById('npCover');
    if (PL() && PL().cover) {
      cover.style.display = '';
      cover.src = PL().cover;
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
    if (!list || !PL() || !PL().tracks) return;
    const cov = document.getElementById('plCover');
    if (cov) cov.src = PL().cover || '';
    const ti = document.getElementById('plTitle');
    if (ti) ti.textContent = PL().title || '';
    const ar = document.getElementById('plArtist');
    if (ar) ar.textContent = PL().artist || '';
    list.textContent = '';
    PL().tracks.forEach((t, i) => {
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
    if (window.__updateRepelRects) setTimeout(window.__updateRepelRects, 550);
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
    if (window.__updateRepelRects) setTimeout(window.__updateRepelRects, 550);
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
  audioA.onended = audioB.onended = () => {
    // Fin natural sin crossfade en curso (p.ej. ultima pista): parar limpio.
    if (plPlaying && plFadeItv === null) stopPlayback();
  };

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
    if (!PL() || !PL().tracks) return;
    const nxt = plIndex + 1;
    if (nxt >= PL().tracks.length) return;
    if (plNxtIndex === nxt && audioNxt.src) return; // ya preparado
    plNxtIndex = nxt;
    audioNxt.volume = 0;
    audioNxt.src = PL().tracks[nxt].file;
    audioNxt.load();
  }

  function startFade() {
    if (!PL() || !PL().tracks) return;
    const nxt = plIndex + 1;
    if (nxt >= PL().tracks.length) return;
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
    if (!PL() || !PL().tracks || !PL().tracks[i]) return;
    clearInterval(plFadeItv); plFadeItv = null;
    clearInterval(plTickItv); plTickItv = null;
    plFading = false;
    plIndex = i;
    // Si habia un crossfade en marcha, el entrante puede estar sonando: se
    // libera ANTES de nada (aqui estaba el bug del audio doble al saltar de
    // pista justo en el segundo del fundido).
    releaseOther(audioCur);
    audioCur.pause();
    audioCur.volume = 1;
    audioCur.src = PL().tracks[i].file;
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
    if (window.__updateRepelRects) setTimeout(window.__updateRepelRects, 550);
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
          if (window.__updateRepelRects) setTimeout(window.__updateRepelRects, 500);
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

  // -----------------------------------------------------------------------
  // Play gate: al presionar arranca toda la lista local desde la pista 1
  // (flash + reveal + decode) y el panel se abre con la tracklist.
  // -----------------------------------------------------------------------
  function setupPlayGate() {
    const gate = document.getElementById('playGate');
    const btn = document.getElementById('playBtn');
    const dock = document.getElementById('dock');
    // Perla de cristal (D7): se crea ANTES del listener para que el clic
    // pueda profundizarla y retirarla. Escena WebGL propia de 120 px sobre
    // los glifos; al arrancar se destruye y solo queda la capa de olas.
    const bead = setupBead(btn, gate);
    window.__bead = bead;                  // lectura para verificación

    // Un solo arranque posible. Con Enter y el boton enfocado, el navegador
    // dispara un click propio ADEMAS del nuestro (btn.click()): sin esta
    // guarda el gate arrancaba dos veces seguidas (dos playTrack(0), doble
    // fetch del mp3 y un reinicio visible de la primera pista).
    let gateStarted = false;
    btn.addEventListener('click', () => {
      if (gateStarted || gate.classList.contains('hidden')) return;
      gateStarted = true;
      // Respuesta al gesto (D6): la capa 3D se inicializa aquí (dentro del
      // gesto de usuario) y emite la OLA DE ARRANQUE. Fuera el flash blanco
      // de glifos y los anillos del canvas (D6).
      if (window.__gl3dBoot) window.__gl3dBoot();
      try { if (window.__GL3D) window.__GL3D.emitStartup(FX.palIdx); } catch (e) {}
      if (bead) bead.boost();     // la perla se profundiza un instante (D7)
      if (bead) bead.stop();      // y se retira: su contexto se libera (D7)
      FX.welcomeDone = true;  // título de bienvenida: fuera para siempre (D7)
      FX.init();            // análisis de bajo dentro del gesto de usuario
      gate.classList.add('hidden');
      dock.classList.add('show');
      playDecodeAnimation();
      setupAutoReset();
      playlistStart(); // gate: reproduce la lista completa desde la pista 1
      refreshRepelGlobal();
    });

    // Tecla Enter (gate-start): mismo flujo que el clic, solo mientras el
    // gate es visible; el auto-repeat se ignora y, tras el play, la guarda
    // del .hidden vuelve este listener inerte por sí sola.
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' || e.repeat) return;
      if (gate.classList.contains('hidden')) return;
      btn.click();
    });

    // (la perla se creo arriba, antes del listener de click: es una escena
    //  WebGL de 120 px dentro del boton que lleva el campo comprimido dentro,
    //  con refraccion radial, dispersion en el canto y especular girando)
  }

  // PERLA DE CRISTAL DEL BOTON, EN THREE.JS (D7) --------------------------------
  // El boton deja de pintarse a mano con canvas 2D: es una pequena escena WebGL
  // (120 px) que se dibuja SOBRE los glifos, dentro del propio boton, y lleva
  // el campo comprimido dentro como una canica. El shader hace lo que el 2D no
  // podia: refraccion radial suave, dispersion cromatica en el canto,
  // sombreado de esfera y un especular que recorre el canto a 60 fps — eso es
  // lo que se lee como MOVIMIENTO y no como un circulo gris quieto.
  //
  // Coste y limites (decidido con el usuario):
  //  · La perla abre su contexto WebGL al cargar la pagina, antes del play. La
  //    capa de olas sigue siendo perezosa (se arma en el gesto del play) y su
  //    contexto es el unico que queda: al arrancar, la perla se destruye y
  //    libera el suyo (forceContextLoss).
  //  · Three.js se vendoriza y se carga con un unico import compartido por
  //    ambas capas; sin CDN ni red.
  //  · Sin WebGL (o bajo file://, donde los modulos ES no importan) el boton
  //    cae a una perla estatica de CSS: nunca se rompe ni ensucia.
  //  · prefers-reduced-motion: se pinta un frame y el bucle para.
  const BEAD_PX = 120;          // lado logico de la perla
  const BEAD_TEX = 192;         // textura del campo (pequeña a proposito)
  // Ventana de campo que ve la perla, en px CSS. ANTES era 200 y la perla no
  // refractaba nada: el repel del gate (push(playBtn, 48) + margen 12) deja un
  // circulo LIMPIO de glifos de radio 60 px alrededor del centro del boton, y
  // con 200 px solo se muestreaban +/-97 px -> el 62% interior del radio salia
  // negro y los glifos quedaban en un anillo de ~14 px justo donde el shader
  // ya los apaga (rim desde 0.86). Con 380 px la perla mira un angular ancho
  // (como una canica de verdad): el hueco tranquilo se queda en el tercio
  // central y el resto del cuerpo se llena de campo comprimido.
  const BEAD_WIN = 380;
  const BEAD_K_IDLE = 0.97;     // zoom relativo: <1 mas dentro, >1 mas comprimida
  const BEAD_K_HOVER = 1.10;
  const BEAD_K_CLICK = 1.20;
  const BEAD_AMP_IDLE = 1.2;    // refraccion del canto (px)
  const BEAD_AMP_HOVER = 2.6;
  const BEAD_AMP_CLICK = 4.2;
  const BEAD_CAUSTIC_MS = 5200; // periodo del especular
  const BEAD_BREATH_MS = 1300;  // periodo de la respiracion (~8.2 s)

  const BEAD_VERT = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`;

  const BEAD_FRAG = `
    precision highp float;
    varying vec2 vUv;
    uniform sampler2D uTex;
    uniform float uK;        // zoom relativo de la imagen interior
    uniform float uAmp;      // refraccion del canto
    uniform float uTheta;    // angulo del especular
    uniform float uPan;      // centro optico (sigue al puntero)
    uniform float uPanY;
    uniform float uI;        // intensidad (hover / foco)
    uniform float uClick;    // profundizacion del clic
    uniform vec3  uTint;     // color de portada
    const float PI = 3.14159265;

    vec2 mapUV(vec2 p, vec2 dir, float r, float scale, float ca) {
      return vec2(uPan, uPanY) + (p * scale * (1.0 + ca)
                                  + dir * (r * r) * uAmp * 0.055) * 0.5;
    }

    void main() {
      vec2 p = vUv * 2.0 - 1.0;
      float r = length(p);
      if (r > 1.0) discard;
      vec2 dir = r > 0.0001 ? p / r : vec2(0.0);

      // Campo comprimido dentro, con dispersion cromatica que crece al canto.
      float ca = (0.0015 + 0.0075 * r * r) * (0.5 + 0.9 * uI);
      float cr = texture2D(uTex, mapUV(p, dir, r, uK,  ca)).r;
      float cg = texture2D(uTex, mapUV(p, dir, r, uK, 0.0)).g;
      float cb = texture2D(uTex, mapUV(p, dir, r, uK, -ca)).b;
      vec3 col = vec3(cr, cg, cb);

      // Volumen: la esfera se hunde hacia el borde (si no, parece una foto),
      // pero sin comerse las letras del centro: el campo tiene que leerse.
      col *= 1.22 * (1.0 - 0.58 * pow(r, 2.8));
      col += vec3(0.055, 0.050, 0.047) * (1.0 - r);   // velo calido en el centro

      // Especular que recorre el canto: arco ancho + punto de luz.
      float ang = atan(p.y, p.x);
      float da = abs(mod(ang - uTheta + PI, 2.0 * PI) - PI);
      float arc = exp(-da * da * 13.0) * smoothstep(0.30, 0.97, r);
      col += vec3(1.0) * arc * (0.22 + 0.26 * uI);
      vec2 lp = vec2(cos(uTheta), sin(uTheta)) * 0.66;
      float dl = length(p - lp);
      col += vec3(1.0) * exp(-dl * dl * 300.0) * (0.60 + 0.35 * uI);

      // Canto: banda cromatica de portada + un filo de luz blanco arriba del
      // todo, que es lo que delata el vidrio.
      float rim = smoothstep(0.86, 0.99, r);
      col = mix(col, uTint, rim * (0.20 + 0.30 * uI + 0.22 * uClick));
      col += uTint * rim * 0.26;
      float edge = smoothstep(0.955, 1.0, r);
      col += vec3(1.0) * edge * (0.22 + 0.18 * uI + 0.15 * uClick);

      // El borde final se apaga para que no haya un corte circular.
      float a = 0.95 * smoothstep(1.0, 0.955, r);
      gl_FragColor = vec4(col, a);
    }`;

  function setupBead(btn, gate) {
    const cv = document.querySelector('.play-lens');
    if (!cv) return null;
    const src = document.getElementById('ascii');
    let rm = false;
    try { rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
    let renderer = null, scene = null, camera = null, mesh = null, mat = null;
    let tex = null, field = null, fg = null, lastTex = 0;
    let ox = 0, oy = 0, targetOx = 0, targetOy = 0;   // centro optico (px del canvas)
    let intensity = 0, targetI = 0, clickT0 = -1e9;
    let running = true, stopped = false, frames = 0;
    let lastK = BEAD_K_IDLE, lastAmp = BEAD_AMP_IDLE, lastTheta = 2.1;
    // Reloj propio (ms acumulados) + contador de fallos del bucle.
    let tNow = 0, tPrev = -1, errs = 0, lastErr = null;

    // La perla lee el campo de glifos: se copia la ventana de BEAD_WIN px que
    // rodea al boton a una textura pequena. Sin esto no habria "letras dentro".
    function refreshField(t, k) {
      if (t - lastTex < 42) return;              // ~24 fps: la textura pesa
      lastTex = t;
      const b = btn.getBoundingClientRect();
      const box = src.getBoundingClientRect();
      const dpr = src.width / Math.max(1, box.width);
      if (!(dpr > 0)) return;                    // canvas aun sin medir: no copiar
      const cx = (b.left + b.width / 2 - box.left) * dpr;
      const cy = (b.top + b.height / 2 - box.top) * dpr;
      const half = (BEAD_WIN / 2) * dpr;
      // drawImage lanza IndexSizeError si el rectangulo fuente mide 0 o es NaN
      // (pasa si el canvas ASCII aun no esta dimensionado). Antes eso escapaba
      // de frame() sin que nada volviera a pedir otro rAF: la perla se quedaba
      // congelada en el primer frame. Ahora se aborta la copia y el bucle sigue.
      if (!(half > 0.5) || !isFinite(cx) || !isFinite(cy)) return;
      fg.fillStyle = '#000';
      fg.fillRect(0, 0, BEAD_TEX, BEAD_TEX);
      fg.drawImage(src, cx - half, cy - half, half * 2, half * 2,
                   0, 0, BEAD_TEX, BEAD_TEX);
      tex.needsUpdate = true;
    }

    function drawFrame(now) {
      // --- Reloj propio de la perla (integrado, no absoluto) ---------------
      // El especular y la respiracion se mueven con el INCREMENTO de tiempo,
      // nunca con el sello absoluto que entrega rAF. Motivo: Brave (farbling),
      // Firefox (resistFingerprinting) y Safari recortan la precision del reloj
      // y redondean performance.now()/rAF a saltos de 100 ms o mas. Midiendo la
      // fase como now/PERIODO, un reloj a trozos deja la fase clavada y la perla
      // parece CONGELADA (que es exactamente el sintoma: "el reflector pausado").
      // Sumando dt la velocidad media es la correcta aunque el reloj venga
      // escalonado, y el top de 100 ms evita saltos al volver de una pestana.
      let dt = 16.7;
      if (typeof now === 'number' && isFinite(now)) {
        if (tPrev >= 0) {
          dt = now - tPrev;
          if (!(dt > 0)) dt = 0;             // reloj redondeado: frame sin avance
          else if (dt > 100) dt = 100;       // pestana oculta / resume: sin salto
        }
        tPrev = now;
      }
      tNow += dt;
      // Centro optico siguiendo al puntero (dentro del canvas de 120 px).
      ox += (targetOx - ox) * 0.12;
      oy += (targetOy - oy) * 0.12;
      intensity += (targetI - intensity) * 0.10;
      const breath = rm ? 0 : (0.5 + 0.5 * Math.sin(tNow / BEAD_BREATH_MS));
      const age = tNow - clickT0;
      const click = age < 700 ? Math.sin(Math.PI * age / 700) : 0;
      const k = BEAD_K_IDLE + (BEAD_K_HOVER - BEAD_K_IDLE) * intensity
        + breath * 0.05 * (1 - intensity) + (BEAD_K_CLICK - BEAD_K_IDLE) * click;
      const amp = BEAD_AMP_IDLE + (BEAD_AMP_HOVER - BEAD_AMP_IDLE) * intensity
        + breath * 0.45 * (1 - intensity) + (BEAD_AMP_CLICK - BEAD_AMP_IDLE) * click;
      const theta = rm ? 2.1 : (tNow / BEAD_CAUSTIC_MS) * Math.PI * 2;
      lastK = k; lastAmp = amp; lastTheta = theta;
      // El centro optico desplaza la imagen interior (y el puntero la mueve).
      const u = mat.uniforms;
      u.uK.value = k; u.uAmp.value = amp; u.uTheta.value = theta;
      u.uI.value = intensity; u.uClick.value = click;
      // El desplazamiento del centro se aplica moviendo la UV de la textura.
      u.uPan.value = 0.5 + (targetOx - ox) / BEAD_PX * -0.22;
      u.uPanY.value = 0.5 + (targetOy - oy) / BEAD_PX * -0.22;
      refreshField(tNow, k);
      renderer.render(scene, camera);
    }

    // Envoltorio del frame: si algo revienta dentro del pintado, el bucle debe
    // SEGUIR. Antes cualquier excepcion (p.e. un drawImage con rectangulo
    // fuente invalido) salia de frame() sin volver a pedir rAF y la perla se
    // quedaba clavada en el ultimo frame: eso es lo que se lee como "efecto
    // pausado". Si el fallo se repite, se cae a la perla CSS (que si se mueve).
    function frame(now) {
      if (!running || stopped || !renderer) return;
      frames++;
      try {
        drawFrame(now);
        errs = 0;
      } catch (e) {
        lastErr = String((e && e.message) || e);
        if (++errs > 8) { try { fallbackCSS(); } catch (e2) {} return; }
      }
      // Reduced-motion: un frame y el bucle para (nada de rAF perpetuo).
      if (rm) { running = false; return; }
      requestAnimationFrame(frame);
    }

    // Degradacion explicita: perla de CSS animada (nunca un circulo muerto).
    function fallbackCSS() {
      running = false;
      btn.classList.add('no-gl3d');
      try { if (renderer) { renderer.dispose(); } } catch (e) {}
      renderer = null;
    }

    function build(THREE) {
      renderer = new THREE.WebGLRenderer({
        canvas: cv, antialias: false, alpha: true,
        premultipliedAlpha: false, powerPreference: 'low-power',
        // El buffer se conserva para que las sondas puedan leer los pixeles
        // de la perla y verificar que se esta moviendo. En un canvas de
        // 120x120 el coste es despreciable.
        preserveDrawingBuffer: true
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(BEAD_PX, BEAD_PX, false);
      renderer.setClearColor(0x000000, 0);
      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
      camera.position.z = 2;
      field = document.createElement('canvas');
      field.width = BEAD_TEX; field.height = BEAD_TEX;
      fg = field.getContext('2d', { alpha: false });
      tex = new THREE.CanvasTexture(field);
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      mat = new THREE.ShaderMaterial({
        vertexShader: BEAD_VERT, fragmentShader: BEAD_FRAG,
        uniforms: {
          uTex: { value: tex },
          uK: { value: BEAD_K_IDLE }, uAmp: { value: BEAD_AMP_IDLE },
          uTheta: { value: 2.1 }, uI: { value: 0 }, uClick: { value: 0 },
          uPan: { value: 0.5 }, uPanY: { value: 0.5 },
          uTint: { value: new THREE.Color(191/255, 112/255, 96/255) }
        },
        transparent: true, depthWrite: false, depthTest: false
      });
      mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
      mesh.frustumCulled = false;
      scene.add(mesh);
      // Contexto perdido (cambio de GPU, pestana mucho tiempo oculta, Brave con
      // shields agresivos): sin este aviso la perla se quedaba congelada en el
      // ultimo frame pintado. Con el aviso cae a la perla de CSS, que si gira.
      cv.addEventListener('webglcontextlost', (e) => {
        e.preventDefault();
        running = false;
        btn.classList.add('no-gl3d');
      }, false);
      const cv0 = cv.getContext('webgl2') || cv.getContext('webgl');
      if (!cv0) throw new Error('sin webgl');
    }

    // Un unico import para las dos capas 3D (perla y olas).
    window.__threeModule().then((THREE) => {
      if (stopped) return;
      try { build(THREE); requestAnimationFrame(frame); }
      catch (e) { btn.classList.add('no-gl3d'); }
    }).catch(() => { btn.classList.add('no-gl3d'); });

    const onMove = (e) => {
      if (gate.classList.contains('hidden')) return;
      const b = cv.getBoundingClientRect();
      const dx = (e.clientX - b.left) - b.width / 2;
      const dy = (e.clientY - b.top) - b.height / 2;
      // La distancia se mide con el puntero REAL (no con el valor ya
      // limitado): si no, un puntero lejano seguiría pareciendo "cerca" por el
      // recorte y la perla no volvería al reposo.
      targetI = Math.max(0, Math.min(1, 1 - Math.hypot(dx, dy) / 150));
      const lim = BEAD_PX * 0.22;               // el centro no sale de la perla
      if (Math.hypot(dx, dy) > 150) {          // puntero lejos: al centro
        targetOx = 0; targetOy = 0;
      } else {
        targetOx = Math.max(-lim, Math.min(lim, dx));
        targetOy = Math.max(-lim, Math.min(lim, dy));
      }
    };
    const onEnter = () => { targetI = 1; };
    const onLeave = () => { targetI = 0; targetOx = 0; targetOy = 0; };
    window.addEventListener('pointermove', onMove, { passive: true });
    btn.addEventListener('pointerenter', onEnter, { passive: true });
    btn.addEventListener('pointerleave', onLeave, { passive: true });
    btn.addEventListener('focus', onEnter);
    btn.addEventListener('blur', onLeave);

    return {
      // El clic usa el MISMO reloj integrado que el bucle: con performance.now()
      // (farbled en Brave / recortado en Firefox) el "age" del clic podia no
      // cuadrar y el destello se disparaba fuera de sitio o no se disparaba.
      boost: function () { clickT0 = tNow; },
      // Muestreo de la perla para verificacion: lee el frame actual del
      // contexto (por eso preserveDrawingBuffer va activado). Devuelve la
      // cobertura, el croma del canto y una firma para comparar dos
      // instantes: si la firma no cambia, la perla esta quieta.
      sample: function () {
        if (!renderer) return null;
        try {
          const gl = renderer.getContext();
          const w = gl.drawingBufferWidth, h = gl.drawingBufferHeight;
          const px = new Uint8Array(w * h * 4);
          gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, px);
          let ink = 0, n = 0, sum = 0, tint = 0, sig = 0;
          for (let y = 0; y < h; y += 2) for (let x = 0; x < w; x += 2) {
            const i = (y * w + x) * 4;
            const a = px[i + 3];
            n++;
            if (a > 10) {
              ink++;
              const m = (px[i] + px[i + 1] + px[i + 2]) / 3;
              sum += m;
              if (px[i] - px[i + 2] > 6) tint++;         // canto de portada
              sig = (sig * 31 + ((px[i] >> 3) << 10 | (px[i + 1] >> 3) << 5 | (px[i + 2] >> 3))) >>> 0;
            }
          }
          return { w: w, h: h, n: n, ink: ink, cov: ink / n,
                   mean: ink ? sum / ink : 0, tint: tint, sig: sig };
        } catch (e) { return null; }
      },
      // Al arrancar el play la perla se retira y libera su contexto: a partir de
      // aqui la unica capa 3D es la de las olas, debajo de los glifos.
      stop: function () {
        stopped = true; running = false;
        try {
          if (mesh) { scene.remove(mesh); mesh.geometry.dispose(); }
          if (mat) mat.dispose();
          if (tex) tex.dispose();
          if (renderer) {
            renderer.dispose();
            const gl = renderer.getContext();
            const lose = gl && gl.getExtension('WEBGL_lose_context');
            if (lose) lose.loseContext();
          }
        } catch (e) { /* decorativo: nunca rompe el play */ }
        renderer = null; mesh = null; mat = null; tex = null;
      },
      // Estado para verificacion.
      stats: function () {
        return { frames: frames, running: running, stopped: stopped,
                 ready: !!renderer, k: +lastK.toFixed(3), amp: +lastAmp.toFixed(2),
                 theta: +lastTheta.toFixed(2), intensity: +intensity.toFixed(3),
                 targetI: +targetI.toFixed(3),
                 ox: +ox.toFixed(1), oy: +oy.toFixed(1), rm: rm,
                 // Diagnostico del reloj: tNow avanza solo si el bucle corre, y
                 // noGl3d dice si la perla cayo al degradado de CSS.
                 tNow: Math.round(tNow), errs: errs, lastErr: lastErr,
                 noGl3d: btn.classList.contains('no-gl3d'),
                 size: BEAD_PX, win: BEAD_WIN };
      }
    };
  }

  // Refresco del repel de glifos tras cambios de UI (dock/panel/gate).
  function refreshRepelGlobal() {
    if (window.__updateRepelRects) {
      window.__updateRepelRects();
      setTimeout(window.__updateRepelRects, 400);
    }
  }

  // Texto que se "decodifica" en el dock al arrancar la sesión.
  const TARGET_TEXT = "Thony";

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

    function refreshRepel() {
      if (window.__updateRepelRects) window.__updateRepelRects();
    }

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

  // -----------------------------------------------------------------------
  // Boot
  // -----------------------------------------------------------------------
  window.addEventListener('DOMContentLoaded', () => {
    setupAvatar();
    setupNameHover();
    setupPlayGate();
    setupPlaylist();
    setupIdleFade();
    // Texto inicial ya resuelto detrás del play gate, para que al levantar
    // el gate el nombre ya esté listo para animar desde cero.
    renderSpans(TARGET_TEXT);
  });
})();
