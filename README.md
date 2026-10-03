# xatspace-thony

Profile para **xat.com**

Peticiones para xatspace a: `DouxSommeiL` (1550490712)

## Efectos de ritmo

El campo de glifos ASCII reacciona a la música con mapas **precalculados**
(`assets/beatmaps/<id>.json`, uno por mp3): el navegador no analiza audio en
vivo, solo lee el reloj del `<audio>` y dispara cada golpe en su instante.

| Carril | Qué detecta | Efecto |
|---|---|---|
| `kick` | bombo (45–130 Hz) | anillo de parpadeo desde el centro hacia fuera |
| `bass` | notas graves sostenidas | marea que sube; glifos densos que se mecen |
| `mid`  | caja / palmas / voz | barrido vertical con glitch en la estela |
| `hi`   | charles / platillos | chispas `*` con cruz `+` por toda la pantalla |

Regenerar los mapas (requiere `ffmpeg`, `numpy`, `scipy`):

```
npm run beats                 # solo los que faltan
python3 scripts/analyze-beats.py --force
python3 scripts/analyze-beats.py --only 12 --plot .   # una pista + gráfica de control
```

Colores, duraciones y densidades de cada efecto: `FX_STYLE` en `src/beat-fx.js`.
Sin movimiento (`prefers-reduced-motion`) los efectos se desactivan.
