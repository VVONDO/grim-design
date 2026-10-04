# design-review · screens/product-page.html · v2 (după reparare)
Data: 4 oct 2026 · 390×844 · `scripts/check_specs.py` → 0 FAIL automate

```
PASS C1  un singur buton plin („Anunță-mă”)
PASS C2  „Stoc epuizat · revine în stoc” e acum text de corp 16px/24px, --ink, înaintea prețului   ← REPARAT
PASS C3  stoc epuizat → „Anunță-mă”
PASS C4  fără preț tăiat, „Sale”, cronometru
FAIL C5  livrarea e pe ecran (se termină la 843px din 844), dar costul și zilele lipsesc încă
         așteaptă: GRIM completează valorile în skills/specs/SKILL.md
PASS C6  culori din specs
PASS C7  font-size-uri din specs
PASS C8  .ship margin-top 16px                                                                       ← REPARAT
PASS C9  română, glossary; textul de retur rescris
FAIL C10 sursa pozelor „COLD” încă neconfirmată în LICENSES
         așteaptă: GRIM confirmă cine a făcut pozele
```

**8 PASS · 2 FAIL**

Cele 2 FAIL rămase nu se repară din design: lipsesc informații pe care doar GRIM le are. Asta e lecția: fișierele noastre nu aveau răspuns pentru ele.
