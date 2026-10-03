import * as THREE from './vendor/three.module.min.js';

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

  function build() {
    renderer = new THREE.WebGLRenderer({
      canvas: cv, antialias: false, alpha: true,
      premultipliedAlpha: false, powerPreference: 'low-power',
      preserveDrawingBuffer: false
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
  }

  // Three.js va empaquetado (import estatico): la perla se arma al instante.
  try { build(); requestAnimationFrame(frame); }
  catch (e) { btn.classList.add('no-gl3d'); }

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
    // Al arrancar el play la perla se retira y libera su contexto.
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
    }
  };
}

export { setupBead };
