# design-review · screens/product-page.html · v3 (final)
Data: 4 oct 2026 · 390×844 · `scripts/check_specs.py` → 0 FAIL automate

GRIM a completat: livrare 1–2 zile · 25 lei; pozele sunt făcute de GRIM; materialul nu se publică.

```
PASS C1  un singur buton plin („Anunță-mă”)
PASS C2  „Stoc epuizat · revine în stoc” e text de corp 16px, înaintea prețului
PASS C3  stoc epuizat → „Anunță-mă”
PASS C4  fără preț tăiat, „Sale”, cronometru
PASS C5  „Livrare prin curier în 1–2 zile · 25 lei” vizibil fără derulare (se termină la 843px din 844)   ← REPARAT
PASS C6  culori din specs
PASS C7  font-size-uri din specs
PASS C8  spații din specs
PASS C9  română, glossary; rândul „Material” scos, conform deciziei GRIM
PASS C10 pozele „COLD” sunt ale GRIM, uz comercial confirmat în LICENSES                          ← REPARAT
PASS C11 nu se aplică: produsul e epuizat, deci nu se cumpără acum
```

**11 PASS · 0 FAIL** pe starea „stoc epuizat”.

## Nimic n-a picat, deci strângem regulile
Am adăugat **C11** în `skills/design-review/SKILL.md`: când produsul se poate cumpăra, suma totală (199 + 25 = **224 lei**) trebuie scrisă pe ecran.
Starea „În stoc” a paginii nu există încă. E următorul ecran de construit cu `generate-design`, și C11 îl va verifica.

## Ce a rămas pentru GRIM (nu se repară din design)
- Acordul artiștilor pentru pozele de pe homepage (vezi `materials/LICENSES.md`).
- Scoaterea prețului tăiat 219 → 199 și a etichetei „Sale” din Shopify (AI-ul are doar acces de citire, conform `connectors.md`).
