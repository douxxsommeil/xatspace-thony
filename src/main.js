/* =========================================================================
   xatspace-thony — punto de entrada (Vite)
   -------------------------------------------------------------------------
   Orden de importacion = orden de ejecucion (los modulos ES son diferidos,
   asi que el DOM ya esta listo cuando esto corre):

     1. style.css        -> Vite lo extrae a assets/app.<hash>.css
     2. ascii-engine.js  -> campo de glifos + efectos de ritmo
     3. overlay.js       -> avatar, dock, play-gate, auto-hide
                            (importa player.js y bead.js)

   El motor y el reproductor se hablan por UN objeto compartido
   (beat-sync.js): el reproductor dice que pista suena y en que milisegundo; el
   motor lee los mapas de ritmo precalculados (assets/beatmaps/*.json).
   ========================================================================= */
import './style.css';
import './ascii-engine.js';
import './overlay.js';
