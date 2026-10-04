# GRIM — Better Design with No-Code

Dosarul cu „bilețelele” pentru AI, ca să proiecteze pentru GRIM (grimxo.com) fără să ghicească.
Temă: The Entrepreneurship Academy · 0205EE · Building with No-Code.

## Ce e aici

| Strat | Fișier | La ce folosește |
|---|---|---|
| L1 Knowledge | `day-one.md` | ce e GRIM, pentru cine, ce problemă rezolvă |
| L1 | `glossary.md` | cuvintele noastre, mereu la fel |
| L1 | `never-list.md` | ce nu facem niciodată (ghidajele) |
| L1 | `materials/LICENSES.md` | de unde vine fiecare poză/font și dacă avem voie |
| L1 | `skills/design-principles/` | regulile de design, cu motiv |
| L1 | `skills/specs/` | valorile exacte: culori, text, spații, componente |
| L1 | `connectors.md` | ce are voie AI-ul să atingă |
| L1 | `product-loop.md` | de ce revine un client, scris cinstit |
| L2 Skills | `skills/generate-design/` | makerul: face un ecran |
| L2 | `skills/design-review/` | judecătorul: PASS / FAIL |
| L2 | `build-order.md` | ordinea pentru ecranul de temă |
| Rezultat | `screens/product-page.html` | ecranul construit |
| Rezultat | `reviews/` | review-ul cu FAIL, apoi după reparare |

## Tema predată

1. `product-loop.md`
2. `screens/product-page.html`, construit cu generate-design
3. `reviews/01-product-page-review.md` (cu FAIL-uri) și `reviews/02-product-page-review-after-fix.md`
4. Propoziția:

> În GRIM voi folosi **anunțul „a revenit în stoc” pe email, la care te abonezi tu**, și nu voi folosi niciodată **reduceri false și cronometre de presiune**, pentru că clienții noștri au 14–18 ani, cumpără din banii lor sau ai părinților și merită să decidă fără să fie împinși.

## Cum îl folosești în Claude Code

```
cd grim-design
claude
> Run generate-design for the collection page.
> Run design-review on screens/product-page.html.
```
`CLAUDE.md` îi spune automat ce să citească întâi. Skill-urile sunt și în `.claude/skills/` ca să le găsească după nume.
