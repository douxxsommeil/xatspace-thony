import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

/* =========================================================================
   Configuración de Vite
   -------------------------------------------------------------------------
   Particularidad del proyecto: GitHub Pages sirve la RAIZ de `main`
   (source: branch main, path /). Por eso el artefacto generado tiene que
   seguir siendo la raíz del repo, con la misma pinta de siempre:

       /index.html
       /assets/cover.jpg, tracks/*.mp3, ascii_data.bin.gz, avatar.png
       /assets/app.<hash>.js, app.<hash>.css

   y el código fuente vive aparte, en src/. Vite construye desde src/ y
   escribe en '../' (la raíz) sin vaciarla (los 135 MB de mp3 viven ahí).
   ========================================================================= */

const here = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(here);              // raiz del repo = salida de build
const SRC = path.resolve(here, 'src');
const OUT_ASSETS = path.join(ROOT, 'assets'); // assets de runtime (no gestionados por Vite)
const HOSTS = ['.e2b.app', '.localhost'];

const MIME = {
  '.mp3': 'audio/mpeg', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.png': 'image/png', '.gz': 'application/gzip', '.json': 'application/json',
  '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2', '.ico': 'image/x-icon'
};

/** En dev, sirve /assets/* desde la raíz del repo (los mp3 NO se mueven). */
function rootAssetsDevServer() {
  return {
    name: 'xatspace-root-assets',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url || '').split('?')[0];
        if (!url.startsWith('/assets/')) return next();
        let rel;
        try { rel = decodeURIComponent(url.slice('/assets/'.length)); } catch (e) { return next(); }
        const file = path.resolve(OUT_ASSETS, rel);
        if (!file.startsWith(OUT_ASSETS) || !fs.existsSync(file)) return next();
        const stat = fs.statSync(file);
        if (!stat.isFile()) return next();
        const type = MIME[path.extname(file).toLowerCase()] || 'application/octet-stream';
        res.setHeader('Content-Type', type);
        res.setHeader('Accept-Ranges', 'bytes');
        // Soporte de Range: Chrome lo pide siempre para audio.
        const range = req.headers.range;
        if (range) {
          const m = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
          if (m) {
            const start = m[1] ? Number(m[1]) : 0;
            const end = m[2] ? Math.min(Number(m[2]), stat.size - 1) : stat.size - 1;
            if (start <= end && start < stat.size) {
              res.statusCode = 206;
              res.setHeader('Content-Range', `bytes ${start}-${end}/${stat.size}`);
              res.setHeader('Content-Length', end - start + 1);
              fs.createReadStream(file, { start, end }).pipe(res);
              return;
            }
          }
        }
        res.setHeader('Content-Length', stat.size);
        fs.createReadStream(file).pipe(res);
      });
    }
  };
}

/** Limpia bundles viejos (assets/app-*.js|css) para que no se acumulen. */
function cleanStaleBundles() {
  return {
    name: 'xatspace-clean-stale-bundles',
    buildStart() {
      if (!fs.existsSync(OUT_ASSETS)) return;
      for (const f of fs.readdirSync(OUT_ASSETS)) {
        if (/^app-[A-Za-z0-9_-]{4,}\.(js|css|js\.map|css\.map)$/.test(f)) {
          fs.rmSync(path.join(OUT_ASSETS, f), { force: true });
        }
      }
    }
  };
}

/**
 * El bundle sale como IIFE (un solo fichero, sin code-splitting), así que no
 * necesita ser un módulo ES: se sirve como <script defer>. Con eso la página
 * funciona igual en navegadores sin soporte de módulos ES y sin depender de
 * import() en caliente.
 */
function classicScriptHtml() {
  return {
    name: 'xatspace-classic-script-html',
    apply: 'build',
    enforce: 'post',
    closeBundle() {
      const file = path.join(ROOT, 'index.html');
      if (!fs.existsSync(file)) return;
      let html = fs.readFileSync(file, 'utf8');
      html = html.replace(/<script([^>]*)>/g, (tag, attrs) => {
        if (!/\btype="module"/.test(attrs)) return tag;
        const clean = attrs
          .replace(/\btype="module"/g, '')
          .replace(/\bcrossorigin(?:="[^"]*")?/g, '')
          .replace(/\s+/g, ' ')
          .trim();
        return `<script${clean ? ' ' + clean : ''} defer>`;
      });
      html = html.replace(/[ \t]*<link[^>]*rel="modulepreload"[^>]*>\n?/g, '');
      html = html.replace(
        /(<html[^>]*>)/,
        '$1\n<!--\n  GENERADO POR VITE — no editar a mano.\n' +
        '  Fuentes: src/  ·  Build: npm run build  ·  Dev: npm run dev\n-->'
      );
      fs.writeFileSync(file, html);
    }
  };
}

export default defineConfig({
  root: SRC,
  base: './',
  publicDir: false,                 // los assets de runtime viven en la raíz
  plugins: [rootAssetsDevServer(), cleanStaleBundles(), classicScriptHtml()],
  server: { host: true, port: 5173, strictPort: false, allowedHosts: HOSTS },
  preview: { host: true, port: 4173, allowedHosts: HOSTS },
  build: {
    outDir: '../',                  // la raíz del repo = lo que publica Pages
    emptyOutDir: false,             // nunca borres los 135 MB de mp3
    assetsDir: 'assets',
    target: 'es2019',
    cssCodeSplit: false,
    sourcemap: false,
    reportCompressedSize: false,
    // Un solo bundle (three.js pesa ~690 kB): es deliberado, porque el HTML se
    // sirve como script clasico y no queremos code-splitting.
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        format: 'iife',             // un solo fichero, clásico
        inlineDynamicImports: true,
        entryFileNames: 'assets/app-[hash].js',
        assetFileNames: 'assets/app-[hash].[ext]'
      }
    }
  }
});
