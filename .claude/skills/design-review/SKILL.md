---
name: design-review
description: Use when I ask to review a GRIM screen ("Run design-review on ..."). Judges the screen against principles and specs, PASS or FAIL per check. Never redesigns.
---

# design-review — judecătorul

## O singură treabă
Judecă un ecran. **Nu îl rescrie, nu îl repară.** Doar verdict.

## Citește întâi
`skills/design-principles/SKILL.md`, `skills/specs/SKILL.md`, `never-list.md`, `glossary.md`.

## Verificări (fiecare poate pica)
| # | Verificare | Sursa |
|---|---|---|
| C1 | Există exact un buton plin pe ecran | principles 1 |
| C2 | Disponibilitatea apare înaintea prețului, în text de corp (≥16px), nu doar ca etichetă mică | principles 2, specs Text |
| C3 | Butonul principal corespunde stării de stoc (În stoc → coș, Precomandă → precomandă, Epuizat → Anunță-mă) | principles 3, never 3 |
| C4 | Niciun preț tăiat, „Sale”, cronometru sau „doar N bucăți” | principles 4, never 1–2 |
| C5 | Livrarea (cost + zile) e pe ecran, fără derulare la 390×844 | principles 5, never 6 |
| C6 | Fiecare culoare din CSS e un token din specs | specs Culori |
| C7 | Fiecare font-size din CSS e în tabelul Text din specs; corpul nu e sub 16px | specs Text |
| C8 | Fiecare spațiu (margin, padding, gap) e în pașii din specs | specs Spații |
| C9 | Tot textul vizibil e în română, cu cuvintele din glossary | principles 7 |
| C10 | Fiecare imagine are rând în LICENSES cu uz comercial confirmat | never 5 |
| C11 | Suma totală (preț + livrare) e scrisă pe ecran, fără derulare, când produsul se poate cumpăra sau precomanda | day-one „Pentru cine”, never 6 |

## Format output (în `reviews/NN-<ecran>-review.md`)
```
PASS C1 un singur buton plin („Anunță-mă”)
FAIL C7 font-size 14px pe .stock — specs: corp minim 16px
   reparația minimă: .stock → 16px / 24px
```
Fiecare FAIL are: regula, valoarea găsită, locul, cea mai mică reparație.
La final: `X PASS · Y FAIL`. Fără „arată bine”, fără „poate”.

Dacă nu pică nimic, scrie asta explicit și propune o verificare mai strictă.
