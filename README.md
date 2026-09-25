# xatspace-thony

Profile para **xat.com**
Peticiones para xatspace a: `DouxSommeiL` (1550490712)

Campo de glifos ASCII + capa WebGL (Three.js) + reproductor del concierto
*After Hours (Live At SoFi Stadium)*. Vanilla JS, empaquetado con **Vite**
(sin framework de UI: el 90 % del proyecto es canvas, shaders y Web Audio, y
ahí un framework no pinta nada).

---

## Estructura

```
index.html            <- GENERADO por la build (no editar a mano)
assets/               <- assets de runtime (los publica GitHub Pages)
  app.<hash>.js/css     bundle generado
  ascii_data.bin.gz     campo ASCII comprimido (4,4 MB)
  avatar.png, cover.jpg
  tracks/*.mp3          31 pistas (no se tocan: 135 MB)
src/                  <- CÓDIGO FUENTE
  index.html            plantilla (Vite entry)
  main.js               punto de entrada
  style.css
  ascii-engine.js       campo de glifos + capa 3D + análisis de audio
  overlay.js            avatar, dock, play-gate, perla, panel de la playlist
  playlist.js/.json     manifest del concierto
  vendor/three.module.min.js
vite.config.js
scripts/provision-playlist.py
```

> **Ojo:** GitHub Pages publica la **raíz** de `main`, así que la build escribe
> `index.html` y `assets/app.<hash>.{js,css}` en la raíz del repo, junto a los
> mp3 (que por eso siguen donde están). El `index.html` de la raíz es un
> artefacto generado: edita `src/index.html`.

## Comandos

```bash
npm install
npm run dev       # servidor de desarrollo (http://localhost:5173)
npm run build     # regenera index.html + assets/app.<hash>.js|.css en la raíz
npm run preview   # sirve la build
```

`npm run build` limpia los bundles viejos (`assets/app-*`) y reescribe el
`<script>` del HTML como script clásico con `defer`: el bundle sale como IIFE
de un solo fichero, así que **no necesita soporte de módulos ES** ni `import()`
en caliente.

Después de `npm run build`, commitea `index.html` y `assets/app.<hash>.*`:
es lo que publica Pages.

## Capas

- **Campo ASCII** (`src/ascii-engine.js`): 600 frames de luminancia en
  `assets/ascii_data.bin.gz`, descomprimidos una vez con `DecompressionStream`
  nativo o con `pako` (empaquetado, sin CDN). El título pre-play se esculpe
  como espacio negativo y el repel mantiene limpias las zonas de UI.
- **Capa 3D**: olas de glassmorphism por bombo y halo de sub-bass, leyendo un
  analizador de Web Audio; se arma perezosamente en el gesto de play.
- **Perla del play**: escena WebGL de 120 px dentro del botón, con el campo
  comprimido dentro, refracción radial, dispersión cromática y especular que
  recorre el canto.
- **Reproductor**: dos `<audio>` (A/B) con crossfade corto (450 ms) y preroll.
