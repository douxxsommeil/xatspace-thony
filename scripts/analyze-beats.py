#!/usr/bin/env python3
"""Mapa de ritmo OFFLINE de la playlist de xatspace-thony.

Para cada mp3 de `src/playlist.json` calcula, una sola vez y fuera del
navegador, DONDE ocurre cada golpe y lo guarda en `assets/beatmaps/<id>.json`
(mismo nombre opaco que el mp3). El navegador ya no analiza audio en vivo: solo
lee estos ficheros y dispara el efecto visual de cada carril en su instante.

Carriles (cada uno tiene su efecto propio en src/beat-fx.js):

  kick  bombo        45-130 Hz, pico con caida rapida   -> anillo desde el centro
  bass  bajo         notas graves sostenidas (sub/bajo) -> marea que sube
  mid   medios       caja / palmas / ataques de voz     -> barrido horizontal
  hi    agudos       charles / platillos / sibilancia   -> chispas

Formato del JSON (todo entero, tiempos en ms desde el inicio del mp3):

  { "v": 1, "dur": 95893,
    "kick": [t, s,    t, s,    ...],     # s = fuerza 1..100
    "bass": [t, s, d, t, s, d, ...],     # d = duracion de la nota en ms
    "mid":  [t, s,    ...],
    "hi":   [t, s,    ... ] }

Los umbrales son ADAPTATIVOS (relativos al rango dinamico local de cada
cancion) para que un directo flojo y un tema muy comprimido den eventos
comparables. La fuerza se normaliza por cancion y carril.

Uso:
  python3 scripts/analyze-beats.py                 # toda la playlist
  python3 scripts/analyze-beats.py --only 2427823cc686 --plot   # una pista + grafica
  python3 scripts/analyze-beats.py --force         # rehacer aunque exista

Requiere: ffmpeg en el PATH, numpy, scipy (y matplotlib solo con --plot).
"""

import argparse
import json
import subprocess
import sys
from pathlib import Path

import numpy as np
from scipy import ndimage, signal

BASE = Path(__file__).resolve().parent.parent
PLAYLIST = BASE / "src" / "playlist.json"
OUT_DIR = BASE / "assets" / "beatmaps"

SR = 24000            # frecuencia de trabajo (los agudos se miden hasta 10 kHz).
                      # Con 24000 todos los saltos de HOP_MS son enteros: con 22050 el
                      # salto salia a 22,05 muestras y los tiempos derivaban ~0,2 %.
HOP_MS = 10           # resolucion temporal de las envolventes
FRAME_HZ = 1000 // HOP_MS
FORMAT_VERSION = 1


# --------------------------------------------------------------------------
# Audio -> envolventes en dB por banda
# --------------------------------------------------------------------------
def decode(path):
    """mp3 -> float32 mono a SR Hz (ffmpeg compensa el retardo del codificador)."""
    p = subprocess.run(
        ["ffmpeg", "-v", "error", "-i", str(path), "-f", "f32le",
         "-ac", "1", "-ar", str(SR), "-"],
        capture_output=True,
    )
    if p.returncode != 0 or not p.stdout:
        raise RuntimeError(p.stderr.decode("utf-8", "replace").strip() or "ffmpeg sin salida")
    return np.frombuffer(p.stdout, dtype=np.float32)


def band_db(x, lo, hi, work_sr):
    """Energia en dB de la banda [lo, hi] Hz, una muestra cada HOP_MS.

    Se diezma antes de filtrar (los graves no necesitan 22 kHz) y el filtro es
    de fase cero, asi que el pico de la envolvente cae donde suena el golpe.
    """
    q = max(1, SR // work_sr)
    y = signal.decimate(x, q, ftype="fir", zero_phase=True) if q > 1 else x
    fs = SR / q
    sos = signal.butter(4, [lo / (fs / 2), min(hi / (fs / 2), 0.98)], btype="band", output="sos")
    y = signal.sosfiltfilt(sos, y)
    hop = int(round(fs * HOP_MS / 1000))
    assert hop * 1000 == fs * HOP_MS, f"salto no entero ({fs} Hz): los tiempos derivarian"
    n = len(y) // hop
    power = (y[: n * hop] ** 2).reshape(n, hop).mean(axis=1)
    return 10.0 * np.log10(power + 1e-10)


def smooth(db, ms):
    return ndimage.uniform_filter1d(db, max(1, int(ms / HOP_MS)), mode="nearest")


def local_range(db, win_s=3.0):
    """Rango dinamico local (p85 - p20) en una ventana: escala del umbral."""
    size = int(win_s * FRAME_HZ) | 1
    hi = ndimage.percentile_filter(db, 85, size=size, mode="nearest")
    lo = ndimage.percentile_filter(db, 20, size=size, mode="nearest")
    return np.maximum(hi - lo, 1.0)


# --------------------------------------------------------------------------
# Deteccion de picos
# --------------------------------------------------------------------------
def rising_edge(db, i, prom):
    """Indice donde la subida hacia el pico `i` cruza media altura (el 'ataque')."""
    target = db[i] - 0.5 * prom
    j = i
    limit = max(0, i - 12)
    while j > limit and db[j - 1] > target:
        j -= 1
    return j


def pick_peaks(db_s, db_raw, min_gap_ms, rel, floor_db, level=0.5):
    """Picos con prominencia >= max(floor_db, rel * rango_local) que ademas
    llegan cerca del techo local de energia (`level` = fraccion del rango que
    se tolera por debajo). Sin esa puerta, los rebotes pequenos que hay en el
    valle profundo tras un golpe fuerte pasan por 'prominentes'."""
    rng = local_range(db_s)
    size = int(3.0 * FRAME_HZ) | 1
    ceil = ndimage.percentile_filter(db_s, 85, size=size, mode="nearest")
    peaks, props = signal.find_peaks(
        db_s, prominence=floor_db * 0.6, distance=max(1, int(min_gap_ms / HOP_MS))
    )
    out = []
    for i, prom in zip(peaks, props["prominences"]):
        if prom < max(floor_db, rel * rng[i]):
            continue
        if db_s[i] < ceil[i] - level * rng[i]:
            continue
        out.append((rising_edge(db_raw, i, prom), i, float(prom)))
    return out


def cap_density(events, per_second, key=lambda e: e[2]):
    """Como mucho `per_second` eventos por segundo (se quedan los mas fuertes)."""
    if not events:
        return events
    keep = []
    window = int(FRAME_HZ)  # 1 s en frames
    for e in sorted(events, key=key, reverse=True):
        near = sum(1 for k in keep if abs(k[0] - e[0]) <= window // 2)
        if near < per_second:
            keep.append(e)
    return sorted(keep, key=lambda e: e[0])


def finalize(events, min_gap_ms, n_frames):
    """Orden temporal, dentro de la pista y con separacion minima (si dos
    eventos chocan se queda el mas fuerte; el 3er campo es siempre la fuerza)."""
    gap = max(1, min_gap_ms // HOP_MS)
    out = []
    for e in sorted(events, key=lambda e: e[0]):
        if e[0] < 0 or e[0] >= n_frames:
            continue
        if out and e[0] - out[-1][0] < gap:
            if e[2] > out[-1][2]:
                out[-1] = e
            continue
        out.append(e)
    return out


def normalize(proms, floor=0.18):
    """Fuerza 1..100 normalizada por el percentil 95 de la cancion."""
    if not len(proms):
        return []
    ref = max(float(np.percentile(proms, 95)), 1e-3)
    return [int(round(100 * min(1.0, max(floor, p / ref)))) for p in proms]


# --------------------------------------------------------------------------
# Carriles
# --------------------------------------------------------------------------
def detect_kick(x):
    raw = band_db(x, 45, 130, 2400)
    sm = smooth(raw, 30)
    cand = pick_peaks(sm, raw, min_gap_ms=170, rel=0.32, floor_db=3.0, level=0.45)
    kicks, sustained = [], []
    for t, i, prom in cand:
        after = sm[i + 12: i + 19]
        decay = sm[i] - (after.mean() if len(after) else sm[i])
        (kicks if decay >= 3.5 else sustained).append((t, i, prom))
    kicks = cap_density(kicks, 4)
    return kicks, sustained, raw


def detect_bass(x, kicks, sustained):
    """Bajo = notas graves que NO son el bombo: picos de 60-220 Hz fuera de los
    golpes de bombo, bombos de cola larga (808) y vaivenes largos del sub."""
    kick_t = np.array([k[0] for k in kicks], dtype=float)

    def near_kick(t, ms=70):
        return len(kick_t) > 0 and np.min(np.abs(kick_t - t)) <= ms // HOP_MS

    raw_b = band_db(x, 60, 220, 2400)
    sm_b = smooth(raw_b, 40)
    notes = [(t, i, p) for t, i, p in pick_peaks(sm_b, raw_b, 160, 0.36, 3.5, level=0.40)
             if not near_kick(t)]
    notes += [c for c in sustained if not near_kick(c[0])]

    raw_s = band_db(x, 30, 90, 2400)
    sm_s = smooth(raw_s, 150)
    base = ndimage.percentile_filter(sm_s, 45, size=601, mode="nearest")
    excess = sm_s - base
    thr = np.maximum(5.0, 0.40 * local_range(sm_s))
    lab, n = ndimage.label(excess > thr)
    swells = []
    for k in range(1, n + 1):
        idx = np.where(lab == k)[0]
        if len(idx) * HOP_MS >= 300:
            swells.append((int(idx[0]), int(idx[0]), float(excess[idx].mean())))

    merged = []
    for t, i, p in sorted(notes + swells, key=lambda e: e[0]):
        if merged and t - merged[-1][0] < 220 // HOP_MS:
            if p > merged[-1][2]:
                merged[-1] = (merged[-1][0], i, p)
            continue
        merged.append((t, i, p))
    merged = cap_density(merged, 2)

    out = []
    for t, i, p in merged:
        ref = sm_b[min(len(sm_b) - 1, t + 2)]
        j = t
        while j < len(sm_b) - 1 and (j - t) < 150 and sm_b[j] > ref - 6.0:
            j += 1
        out.append((t, i, p, min(1200, max(150, (j - t) * HOP_MS))))
    return out, raw_b


def detect_flux(x, lo, hi, work_sr, min_gap_ms, rel, floor_db, per_second, smooth_ms=30, level=0.55):
    raw = band_db(x, lo, hi, work_sr)
    sm = smooth(raw, smooth_ms)
    return cap_density(pick_peaks(sm, raw, min_gap_ms, rel, floor_db, level), per_second), raw


def detect_mid(x, kicks):
    ev, raw = detect_flux(x, 300, 3000, 8000, 150, 0.30, 2.5, 3)
    kick_t = np.array([k[0] for k in kicks], dtype=float)
    if len(kick_t):
        ev = [e for e in ev if np.min(np.abs(kick_t - e[0])) > 45 // HOP_MS]
    return ev, raw


def detect_hi(x):
    return detect_flux(x, 6000, 10000, SR, 90, 0.30, 2.0, 6, smooth_ms=20)


# --------------------------------------------------------------------------
def analyze(path):
    x = decode(path)
    kicks, sustained, raw_k = detect_kick(x)
    bass, raw_b = detect_bass(x, kicks, sustained)
    mid, raw_m = detect_mid(x, kicks)
    hi, raw_h = detect_hi(x)
    n_frames = int(len(x) / SR * FRAME_HZ)
    kicks = finalize(kicks, 150, n_frames)
    bass = finalize(bass, 200, n_frames)
    mid = finalize(mid, 120, n_frames)
    hi = finalize(hi, 70, n_frames)

    def flat2(ev):
        out = []
        for (t, s) in zip((e[0] for e in ev), normalize([e[2] for e in ev])):
            out += [int(t * HOP_MS), s]
        return out

    bass_flat = []
    for (t, s, e) in zip((b[0] for b in bass), normalize([b[2] for b in bass]), bass):
        bass_flat += [int(t * HOP_MS), s, int(e[3])]

    data = {
        "v": FORMAT_VERSION,
        "dur": int(len(x) / SR * 1000),
        "kick": flat2(kicks),
        "bass": bass_flat,
        "mid": flat2(mid),
        "hi": flat2(hi),
    }
    debug = {"kick": (raw_k, kicks), "bass": (raw_b, bass), "mid": (raw_m, mid), "hi": (raw_h, hi)}
    return data, debug


def plot(data, debug, title, out_png, t0=60.0, span=14.0):
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt

    fig, ax = plt.subplots(4, 1, figsize=(15, 9), sharex=True)
    lo, hi_ = int(t0 * FRAME_HZ), int((t0 + span) * FRAME_HZ)
    colors = {"kick": "tab:red", "bass": "tab:green", "mid": "tab:orange", "hi": "tab:purple"}
    for a, (name, (raw, ev)) in zip(ax, debug.items()):
        tt = np.arange(len(raw)) / FRAME_HZ
        a.plot(tt[lo:hi_], raw[lo:hi_], lw=0.7, color="gray")
        for e in ev:
            if lo <= e[0] < hi_:
                a.axvline(e[0] / FRAME_HZ, color=colors[name], lw=1.4)
                if name == "bass":
                    a.axvspan(e[0] / FRAME_HZ, e[0] / FRAME_HZ + e[3] / 1000, color=colors[name], alpha=0.2)
        a.set_ylabel(name)
    ax[0].set_title(title)
    plt.tight_layout()
    plt.savefig(out_png, dpi=70)
    plt.close(fig)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--only", help="id del mp3 (nombre sin extension) o numero de pista")
    ap.add_argument("--force", action="store_true", help="rehacer aunque ya exista")
    ap.add_argument("--plot", metavar="DIR", nargs="?", const=".", help="guardar una grafica de control")
    args = ap.parse_args()

    playlist = json.loads(PLAYLIST.read_text(encoding="utf-8"))
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    todo = []
    for t in playlist["tracks"]:
        stem = Path(t["file"]).stem
        if args.only and args.only not in (stem, str(t["n"])):
            continue
        todo.append((t, stem))
    if not todo:
        sys.exit("ninguna pista coincide")

    total = {"kick": 0, "bass": 0, "mid": 0, "hi": 0}
    for t, stem in todo:
        out = OUT_DIR / f"{stem}.json"
        if out.exists() and not args.force:
            print(f"= {t['n']:>2} {t['title'][:44]:<44} (ya existe)")
            continue
        src = BASE / t["file"]
        if not src.exists():
            print(f"! {t['n']:>2} falta {src}", file=sys.stderr)
            continue
        data, debug = analyze(src)
        out.write_text(json.dumps(data, separators=(",", ":")), encoding="utf-8")
        n = {"kick": len(data["kick"]) // 2, "bass": len(data["bass"]) // 3,
             "mid": len(data["mid"]) // 2, "hi": len(data["hi"]) // 2}
        for k in total:
            total[k] += n[k]
        secs = max(1.0, data["dur"] / 1000)
        print(f"+ {t['n']:>2} {t['title'][:44]:<44} kick {n['kick']:>4} ({n['kick']/secs:.1f}/s)  "
              f"bass {n['bass']:>4}  mid {n['mid']:>4}  hi {n['hi']:>4}   {out.stat().st_size/1024:.1f} KB")
        if args.plot is not None:
            plot(data, debug, t["title"], Path(args.plot) / f"beats_{stem}.png")
    print("total:", total)


if __name__ == "__main__":
    main()
