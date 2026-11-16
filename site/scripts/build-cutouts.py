"""Cut the six SNAKE SKIN cap close-ups out of their black background for the 3D scenes.
Output: 900x900 alpha WebP, cap centred and scaled the same in every colour, face faded out.
Usage: python3 scripts/build-cutouts.py
"""
import os, json
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

A = os.path.join(os.path.dirname(__file__), "..", "public", "assets")
# per colour, in the detail crop's 0..1 coords: cap centre x/y, cap width, fade start/end (y), logo x/y
CAPS = {
    "natural": dict(cx=.52, cy=.50, w=.80, fade=(.84, .97), logo=(.53, .47), side=(.29, .35)),
    "red":     dict(cx=.47, cy=.46, w=.70, fade=(.60, .76), logo=(.42, .38), side=(.33, .40)),
    "grey":    dict(cx=.50, cy=.45, w=.74, fade=(.64, .80), logo=(.50, .38)),
    "blue":    dict(cx=.45, cy=.40, w=.80, fade=(.62, .78), logo=(.30, .27), ellipse=(.47, .36, .40, .30)),
    "pink":    dict(cx=.52, cy=.37, w=.66, fade=(.58, .74), logo=(.50, .25)),
    "green":   dict(cx=.50, cy=.44, w=.90, fade=(.74, .90), logo=(.48, .30)),
}
T, S, OUT, CAPW, CAPY = 22, 1000, 900, .74, .47

def smooth(a, b, x):
    t = np.clip((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t)

meta = {}
for c, k in CAPS.items():
    im = Image.open(os.path.join(A, f"snake-skin-{c}-black-cap-detail.webp")).convert("RGB").resize((S, S), Image.LANCZOS)
    mx = np.asarray(im).max(axis=2)
    b = Image.fromarray(np.where(mx > T, 255, 0).astype("uint8")).filter(ImageFilter.MedianFilter(7))
    pad = Image.new("L", (S + 2, S + 2), 0); pad.paste(b, (1, 1)); ImageDraw.floodfill(pad, (0, 0), 128)
    fg = np.asarray(pad.crop((1, 1, S + 1, S + 1))) != 128
    # fill interior holes (black logo, cords): row hull AND column hull
    def hull(m):
        idx = np.arange(m.shape[1])[None, :]
        any_ = m.any(axis=1)[:, None]
        first = np.where(m, idx, m.shape[1]).min(axis=1)[:, None]
        last = np.where(m, idx, -1).max(axis=1)[:, None]
        return any_ & (idx >= first) & (idx <= last)
    solid = hull(fg) & hull(fg.T).T
    alpha = Image.fromarray((solid * 255).astype("uint8")).filter(ImageFilter.MinFilter(5)).filter(ImageFilter.GaussianBlur(2))
    a = np.asarray(alpha).astype("float32") / 255
    yy, xx = np.mgrid[0:S, 0:S] / S
    if "ellipse" in k:  # cap too dark to key against black: keep a soft oval around it instead
        ex, ey, rx, ry = k["ellipse"]
        a = np.maximum(a, 1 - smooth(.85, 1.0, np.sqrt(((xx - ex) / rx) ** 2 + ((yy - ey) / ry) ** 2)))
    a *= 1 - smooth(k["fade"][0], k["fade"][1], yy)                      # face falls into shadow
    s0, s1 = k.get("side", (k["w"] * .54, k["w"] * .66))
    a *= 1 - smooth(s0, s1, np.abs(xx - k["cx"]))    # hands / hair at the sides
    rgba = np.dstack([np.asarray(im), (a * 255).astype("uint8")])
    src = Image.fromarray(rgba, "RGBA")
    scale = CAPW / k["w"]
    size = int(S * scale * OUT / S)
    src = src.resize((size, size), Image.LANCZOS)
    canvas = Image.new("RGBA", (OUT, OUT), (0, 0, 0, 0))
    ox, oy = int(OUT * .5 - k["cx"] * size), int(OUT * CAPY - k["cy"] * size)
    canvas.paste(src, (ox, oy), src)
    canvas.save(os.path.join(A, f"snake-skin-{c}-black-cap-cutout.webp"), "WEBP", quality=82, method=6)
    meta[c] = [round((ox + k["logo"][0] * size) / OUT, 3), round((oy + k["logo"][1] * size) / OUT, 3)]
print(json.dumps(meta))
