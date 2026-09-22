#!/usr/bin/env python3
"""Provisiona la playlist local del concierto "The Weeknd - After Hours (Live At
SoFi Stadium)" para xatspace-thony.

- Metadatos GRATIS (sin credenciales): titulos limpios extraidos de la propia
  lista de YouTube (yt-dlp --flat-playlist) + album/caratula via oEmbed de
  Spotify (embed gratuito).
- Descarga: yt-dlp (instalado global, actualizado) + ffmpeg -> mp3 ~192kbps.
- Organizacion: assets/tracks/<md5(video_id)[:12]>.mp3 (nombres OPACOS
  deterministas; la identidad real vive en el manifest y en los tags ID3),
  assets/cover.jpg, assets/playlist.json (canonico) y assets/playlist.js
  (manifest para el runtime, evita fetch en file://).

Uso:
  python3 scripts/provision-playlist.py             # descarga todo
  python3 scripts/provision-playlist.py --list-only # solo muestra el plan
"""

import argparse
import hashlib
import json
import re
import shutil
import subprocess
import sys
import urllib.request
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent          # raiz del sitio (xatspace-thony)
ASSETS = BASE / "assets"
TRACKS = ASSETS / "tracks"
PLAYLIST_URL = "https://www.youtube.com/playlist?list=PLVOXUojQhsNopodrs_5D_BLVIHpfox0UN"
SPOTIFY_ALBUM = "1OARrXe5sB0gyy3MhQ8h92"               # "Live At SoFi Stadium" (verificado por oEmbed)
OEMBED_URL = f"https://open.spotify.com/oembed?url=https://open.spotify.com/album/{SPOTIFY_ALBUM}"
PLAYLIST_TITLE = "After Hours (Live At SoFi Stadium)"
ARTIST = "The Weeknd"
KNOWN_SUFFIX = " (After Hours (Live At SoFi) /Pseudo Video)"


def log(msg=""):
    print(msg, flush=True)


def run(cmd, **kw):
    return subprocess.run(cmd, capture_output=True, text=True, **kw)


def yt_playlist_json():
    r = run(["yt-dlp", "--flat-playlist", "-J", "--no-warnings", PLAYLIST_URL])
    if r.returncode != 0:
        sys.exit(f"yt-dlp fallo: {r.stderr.strip()}")
    return json.loads(r.stdout)


def clean_title(raw):
    """'The Weeknd - Intro (After Hours (Live At SoFi) /Pseudo Video)'
    -> ('The Weeknd', 'Intro (Live At SoFi Stadium)')"""
    s = (raw or "").strip()
    if s.endswith(KNOWN_SUFFIX):
        s = s[: -len(KNOWN_SUFFIX)]
    else:
        s = re.sub(r"\s*\([^)]*?Pseudo Video[^)]*\)\s*$", "", s).strip()
    s = re.sub(r"\s*\[Official Audio\]\s*$", "", s).strip()
    m = re.match(r"^(The Weeknd(?:,[^\-]+)?)\s*-\s*(.+)$", s)
    if m:
        artist, title = m.group(1).strip(), m.group(2).strip()
    else:
        artist, title = ARTIST, s
    return artist, f"{title} (Live At SoFi Stadium)"


def fetch(url, ua="Mozilla/5.0"):
    req = urllib.request.Request(url, headers={"User-Agent": ua})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read()


def download_cover():
    data = json.loads(fetch(OEMBED_URL).decode("utf-8"))
    thumb = data.get("thumbnail_url") or data.get("url")
    if not thumb:
        log("aviso: oEmbed sin thumbnail_url; no hay cover")
        return None
    raw = fetch(thumb)
    (ASSETS / "cover.jpg").write_bytes(raw)
    return ASSETS / "cover.jpg"


def opaque_name(vid):
    return hashlib.md5(vid.encode("utf-8")).hexdigest()[:12] + ".mp3"


def mp3_duration(path):
    from mutagen.mp3 import MP3

    return int(round(MP3(str(path)).info.length))


def tag_mp3(path, title, artist, album, track_no, cover_path):
    from mutagen.id3 import APIC, ID3, TALB, TIT2, TPE1, TRCK

    try:
        tags = ID3(str(path))
    except Exception:
        tags = ID3()
    tags.add(TIT2(encoding=3, text=title))
    tags.add(TPE1(encoding=3, text=artist))
    tags.add(TALB(encoding=3, text=album))
    tags.add(TRCK(encoding=3, text=str(track_no)))
    if cover_path and cover_path.exists():
        tags.add(APIC(encoding=3, mime="image/jpeg", type=3, desc="Cover", data=cover_path.read_bytes()))
    tags.save(str(path))


def download_one(vid, dst):
    for attempt in range(1, 4):
        tmp = TRACKS / f".{opaque_name(vid)}"
        r = run(
            [
                "yt-dlp", "-x", "--audio-format", "mp3", "--audio-quality", "2",
                "--no-part", "--no-playlist", "--no-mtime", "--no-warnings",
                "-o", str(tmp.with_suffix(".%(ext)s")),
                f"https://www.youtube.com/watch?v={vid}",
            ]
        )
        if tmp.exists():
            tmp.rename(dst)
            return True
        log(f"  reintento {attempt}/3 para {vid}")
    return False


def plan():
    data = yt_playlist_json()
    cover = download_cover()
    rows = []
    for i, e in enumerate(data.get("entries", [])):
        if not e or "id" not in e:
            continue
        artist, title = clean_title(e.get("title", ""))
        rows.append(
            {
                "n": len(rows) + 1,
                "id": e["id"],
                "raw": e.get("title", ""),
                "duration": e.get("duration") or 0,
                "artist": artist,
                "title": title,
                "file": f"assets/tracks/{opaque_name(e['id'])}",
            }
        )
    return rows, cover


def build_manifest(rows, cover_path):
    asset = "assets/cover.jpg" if cover_path and cover_path.exists() else ""
    manifest = {
        "title": PLAYLIST_TITLE,
        "artist": ARTIST,
        "cover": asset,
        "tracks": [
            {
                "n": r["n"],
                "id": r["id"],
                "file": r["file"],
                "title": r["title"],
                "artist": r["artist"],
                "duration": r["duration"],
            }
            for r in rows
        ],
    }
    (ASSETS / "playlist.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    (ASSETS / "playlist.js").write_text(
        "window.__PLAYLIST__ = " + json.dumps(manifest, ensure_ascii=False) + ";",
        encoding="utf-8",
    )
    return manifest


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--list-only", action="store_true", help="solo muestra el plan sin descargar")
    args = ap.parse_args()

    TRACKS.mkdir(parents=True, exist_ok=True)
    rows, cover = plan()

    total = sum(r["duration"] for r in rows)
    log(f"playlist: {PLAYLIST_TITLE} | tracks: {len(rows)} | total: {total // 60} min")
    if args.list_only:
        log(f"{'#':>2} {'id':<12} {'dur':>4}  titulo limpio  ->  archivo opaco")
        for r in rows:
            log(f"{r['n']:>2} {r['id']:<12} {r['duration']:>4}s  {r['title'][:40]:<42} -> {r['file'].split('/')[-1]}")
        log("list-only: no se descargo nada")
        return

    if cover is None:
        log("advertencia: no se pudo obtener la caratula via oEmbed")
    else:
        log(f"cover: {cover} ({cover.stat().st_size // 1024} KB)")

    ok, tot = [], []
    for r in rows:
        dst = TRACKS / opaque_name(r["id"])
        if dst.exists() and dst.stat().st_size > 0:
            log(f"[{r['n']:>2}] ya existe: {dst.name}")
        else:
            log(f"[{r['n']:>2}] descargando {r['title'][:44]!r} ...")
            if not download_one(r["id"], dst):
                log(f"[{r['n']:>2}] ERROR en {r['id']} tras 3 intentos")
                continue
            log(f"  -> {dst.name} ({dst.stat().st_size // 1024} KB)")
        if dst.exists():
            r["duration"] = mp3_duration(dst)
            tag_mp3(dst, r["title"], r["artist"], PLAYLIST_TITLE, r["n"], cover)
            ok.append(r)
            tot.append(r["duration"])

    manifest = build_manifest(ok, cover)
    log(f"\nlisto: {len(ok)}/{len(rows)} tracks | total real: {sum(tot) // 60} min")
    if len(ok) < len(rows):
        log("aviso: algunos tracks fallaron; genera manifest solo con los OK")
    log(f"manifest: {ASSETS / 'playlist.json'} y {ASSETS / 'playlist.js'}")
    log(f"artista: {manifest['artist']} | album: {manifest['title']}")


if __name__ == "__main__":
    main()