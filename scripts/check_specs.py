"""Verifică automat C6–C8 din design-review: culori, mărimi de font și spații din CSS
trebuie să existe în skills/specs/SKILL.md.

Folosire:  python scripts/check_specs.py screens/product-page.html
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
specs = (ROOT / "skills/specs/SKILL.md").read_text(encoding="utf-8")

COLORS = {c.upper() for c in re.findall(r"#[0-9A-Fa-f]{6}", specs)}
FONT_SIZES = {16, 20, 28, 13}            # tabelul Text
SPACING = {0, 4, 8, 12, 16, 24, 32, 48}  # pașii Spații
# valori de componentă permise explicit în specs (nu sunt spații)
COMPONENT_SIZES = {52, 6, 8, 20, 1, 1.5}


def check(path: Path) -> int:
    html = path.read_text(encoding="utf-8")
    css = "\n".join(re.findall(r"<style>(.*?)</style>", html, re.S))
    fails = []

    for c in re.findall(r"#[0-9A-Fa-f]{6}", css):
        if c.upper() not in COLORS:
            fails.append(f"FAIL C6 culoare {c} nu e în specs")

    for size in re.findall(r"font:\s*\d+\s+(\d+)px", css) + re.findall(r"font-size:\s*(\d+)px", css):
        if int(size) not in FONT_SIZES:
            fails.append(f"FAIL C7 font-size {size}px nu e în tabelul Text")

    for prop, vals in re.findall(r"(margin(?:-\w+)?|padding(?:-\w+)?|gap):\s*([^;}]+)", css):
        for v in re.findall(r"(\d+(?:\.\d+)?)px", vals):
            if float(v) not in SPACING:
                fails.append(f"FAIL C8 {prop}: {v}px nu e un pas din specs (4,8,12,16,24,32,48)")

    for f in fails:
        print(f)
    print(f"{path.name}: {len(fails)} FAIL automate (C6–C8)")
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(max(check(Path(p)) for p in sys.argv[1:]))
