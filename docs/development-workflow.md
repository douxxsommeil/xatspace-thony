# Flujo de desarrollo y producción

Este proyecto usa **un solo repositorio Git**. El checkout local sirve para desarrollar; GitHub, especialmente `main`, es la copia de producción y la fuente de verdad del proyecto.

```text
GitHub: origin/main  ← producción + historial + build publicado
       ↕ fetch/pull
Checkout local         ← desarrollo; se puede eliminar y recrear
```

No hace falta mantener un segundo repositorio ni una rama de producción separada. Si se borra la carpeta local, el proyecto no se borra de GitHub: se recupera con `git clone`.

## Qué se edita y qué se genera

| Ruta | Responsabilidad | ¿Se edita a mano? |
|---|---|---|
| `src/` | Código fuente de la interfaz, motor ASCII, player y estilos | Sí |
| `index.html` de la raíz | HTML generado por Vite | No |
| `assets/app-*.js` | Bundle JavaScript generado | No |
| `assets/app-*.css` | Bundle CSS generado | No |
| `assets/cover.jpg`, `assets/tracks/` | Assets de runtime | No, salvo regenerar el provisioning |
| `assets/ascii_data.bin.gz`, `assets/avatar.png` | Datos runtime extraídos | No |
| `node_modules/` | Dependencias instaladas | No; se ignora en Git |

El build se versiona intencionadamente. GitHub Pages sirve la raíz de `main`, por lo que necesita encontrar el `index.html` generado y los bundles en sus rutas actuales. El archivo `.gitignore` excluye `node_modules/`, `.DS_Store` y `*.log`, pero no excluye los bundles de producción.

## Flujo local de desarrollo

Desde el checkout local:

```bash
npm ci
npm run dev
```

- `npm ci` instala exactamente las dependencias del lockfile.
- `npm run dev` inicia Vite y sirve el código fuente de `src/`.
- Los cambios de interfaz se realizan en `src/`, no en el `index.html` raíz.

## Preparar producción

Cuando el trabajo esté listo para publicar:

```bash
npm run build
npm run preview
```

- `npm run build` regenera el `index.html` raíz y los bundles `assets/app-<hash>.js/css`.
- `npm run preview` sirve el build resultante para revisar la versión de producción localmente.
- Antes de commitear, revisar `git status` y `git diff` para confirmar que solo se han incluido los cambios esperados.

El flujo de publicación es:

1. Editar `src/`.
2. Ejecutar `npm run build`.
3. Revisar el diff del código fuente y del build generado.
4. Commitear juntos el código fuente y los artefactos de producción.
5. Push a `main`.
6. Esperar el despliegue de GitHub Pages.

## Sincronizar y recuperar el checkout local

Antes de sincronizar, comprobar que no haya cambios locales accidentales:

```bash
git status
git fetch origin
git pull --ff-only origin main
```

Para reconstruir el checkout desde GitHub:

```bash
git clone https://github.com/douxxsommeil/xatspace-thony.git
cd xatspace-thony
npm ci
```

El repositorio remoto conserva el historial, la fuente y el build aunque se elimine el directorio local.

## Rollback de producción

Como `main` es producción, se prefiere un commit de reversión explícito frente a reescribir el historial compartido:

```bash
git revert <commit-de-publicación>
npm run build
git push origin main
```

Después se revisa el resultado servido por GitHub Pages.

## Archivado de changes OpenSpec

El archivado se gestiona fuera de este documento y fuera del ciclo de build:

1. Consultar `openspec list`.
2. Archivar solo changes marcados `complete`.
3. Dejar abiertos los changes `in-progress`.
4. Usar `/openspec-archive-change` individualmente.

No se deben archivar changes incompletos ni moverlos automáticamente junto con una publicación del sitio.
