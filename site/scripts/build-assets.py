"""Build web assets from the GRIM Drive shoot.

Source files were downloaded from Google Drive (folders "GRIM FUNDAL NEGRU EDIT"
and "GRIM SHOOTING FUNDAL ALB"). Run once; outputs go to public/assets.
Usage: python3 scripts/build-assets.py <dir-with-downloads>
"""
import sys, os
from PIL import Image, ImageOps

SRC = sys.argv[1]
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "assets")
os.makedirs(OUT, exist_ok=True)

def p(blob):
    return os.path.join(SRC, f"mcp-Google_Drive-blob-{blob}.jpg")

# (drive file, blob id, output name, crop box in 1600-wide display coords or None, display scale)
FULL = [
    ("IMG_3996", "1794777786872-5iruzs", "snake-skin-natural-black-cap-worn-front"),
    ("IMG_3979", "1794777811438-f6jq77", "snake-skin-natural-black-cap-grillz"),
    ("IMG_3860", "1794777778641-9fwbjk", "snake-skin-natural-black-cap-portrait"),
    ("IMG_3883", "1794777782026-rr5u30", "snake-skin-natural-black-cap-python"),
    ("IMG_4106", "1794777805370-7sf67h", "snake-skin-red-black-cap-worn-front"),
    ("IMG_3900", "1794777812005-7cjy3s", "snake-skin-red-black-cap-red-snake"),
    ("IMG_4170", "1794777779542-5s113r", "snake-skin-grey-black-cap-worn-front"),
    ("IMG_4050", "1794777791141-7xt6ng", "snake-skin-grey-black-cap-back-view"),
    ("IMG_4043", "1794777782893-il7pcg", "snake-skin-grey-black-cap-side-profile"),
    ("IMG_3921", "1794777808309-0e2s1o", "snake-skin-blue-black-cap-worn-front"),
    ("IMG_3961", "1794777810408-f0tk1y", "snake-skin-pink-black-cap-worn-front"),
    ("IMG_4086", "1794777791797-i631ni", "snake-skin-green-black-cap-worn-front"),
    ("IMG_4055", "1794777789399-7l51g5", "snake-skin-green-black-cap-grillz"),
    ("IMG_4201", "1794777786361-1p2n1g", "snake-skin-grey-black-cap-profile-snake"),
    ("IMG_4211", "1794777784716-t97e4d", "snake-skin-grey-black-cap-covered-face"),
    ("IMG_4209", "1794777785744-jmkpg4", "snake-skin-grey-black-cap-over-shoulder"),
    ("IMG_4171", "1794777781397-wdhp5p", "snake-skin-grey-black-cap-eyes-down"),
    ("IMG_3993", "1794777787872-qgdqjp", "snake-skin-natural-black-cap-side"),
    ("IMG_4365", "1794777784310-76r83e", "snake-skin-green-and-pink-caps-duo"),
    ("IMG_4361", "1794777806713-nkjhac", "snake-skin-green-and-pink-caps-duo-wide"),
    ("IMG_4290", "1794777802964-zyafbi", "snake-skin-blue-and-red-caps-duo"),
    ("IMG_4133", "1794777805553-fpitgc", "snake-skin-three-caps-stacked"),
    ("IMG_4520", "1794777822427-qkhgyq", "og-lot-triple-black-cap-full-look"),
    ("IMG_4450", "1794777824929-6zpfe4", "og-drank-purple-black-cap-worn"),
    ("IMG_4432", "1794777823885-xxvefi", "og-drank-purple-black-cap-backwards"),
]

# square cap close-ups: (blob, name, (x0, y0, size) in display coords, display scale)
CROPS = [
    ("1794777805370-7sf67h", "snake-skin-red-black-cap-detail", (560, 160, 480), 2.06),
    ("1794777786872-5iruzs", "snake-skin-natural-black-cap-detail", (560, 60, 500), 2.02),
    ("1794777779542-5s113r", "snake-skin-grey-black-cap-detail", (560, 60, 480), 2.03),
    ("1794777808309-0e2s1o", "snake-skin-blue-black-cap-detail", (470, 40, 540), 2.16),
    ("1794777810408-f0tk1y", "snake-skin-pink-black-cap-detail", (560, 10, 500), 2.16),
    ("1794777791797-i631ni", "snake-skin-green-black-cap-detail", (420, 80, 580), 2.16),
    ("1794777822427-qkhgyq", "og-lot-triple-black-cap-detail", (620, 110, 320), 2.15),
    ("1794777824929-6zpfe4", "og-drank-purple-black-cap-detail", (500, 80, 480), 2.06),
]

def save(im, name, max_side):
    im = ImageOps.exif_transpose(im).convert("RGB")
    im.thumbnail((max_side, max_side), Image.LANCZOS)
    path = os.path.join(OUT, name + ".webp")
    im.save(path, "WEBP", quality=74, method=6)
    print(f"{name}.webp {im.size} {os.path.getsize(path)//1024}KB")

for _, blob, name in FULL:
    save(Image.open(p(blob)), name, 1800)

for blob, name, (x, y, s), k in CROPS:
    im = ImageOps.exif_transpose(Image.open(p(blob)))
    box = tuple(int(v * k) for v in (x, y, x + s, y + s))
    save(im.crop(box), name, 1000)
