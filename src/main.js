/* =========================================================================
   xatspace-thony — punto de entrada (Vite)
   -------------------------------------------------------------------------
   Orden de importacion = orden de ejecucion (los modulos ES son diferidos,
   asi que el DOM ya esta listo cuando esto corre):

     1. style.css        -> Vite lo extrae a assets/app.<hash>.css
     2. playlist.js      -> define window.__PLAYLIST__ (manifest del concierto)
     3. ascii-engine.js  -> campo de glifos + capa 3D + analisis de audio
     4. overlay.js       -> avatar, dock, play-gate, panel de la playlist

   El motor y el overlay NO se importan entre si: se comunican por los pocos
   puentes explicitos en window (__FX, __GL3D, __gl3dBoot, __threeModule,
   __updateRepelRects), igual que cuando eran dos <script> separados.
   ========================================================================= */
import './style.css';
import './playlist.js';
import './ascii-engine.js';
import './overlay.js';
