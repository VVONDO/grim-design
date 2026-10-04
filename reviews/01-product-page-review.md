# design-review · screens/product-page.html · v1
Data: 4 oct 2026 · ecran verificat la 390×844 · C6–C8 rulate cu `scripts/check_specs.py`

```
PASS C1  un singur buton plin („Anunță-mă”)
FAIL C2  disponibilitatea e etichetă mică: .stock 13px majuscule, culoare --muted
         specs Text: „etichetele mici nu poartă niciodată informație esențială”
         reparația minimă: .stock → Inter 16px/24px, culoare --ink, fără majuscule
PASS C3  stoc epuizat → buton „Anunță-mă”, fără „Adaugă în coș”
PASS C4  preț simplu 199 lei, fără preț tăiat, „Sale” sau cronometru
FAIL C5  rândul de livrare e pe ecran (se termină la 841px din 844), dar costul
         și zilele lipsesc: „[LIPSĂ: cost și zile]” — never-list 6
         reparația minimă: GRIM completează costul și zilele în specs (Rând livrare)
PASS C6  toate culorile sunt tokeni din specs
PASS C7  font-size-uri: 13, 16, 20, 28 — toate în tabel
FAIL C8  .ship margin-top: 20px — nu e pas din specs (4, 8, 12, 16, 24, 32, 48)
         reparația minimă: 16px (24px ar împinge livrarea sub marginea ecranului)
PASS C9  tot textul în română, cuvinte din glossary („Anunță-mă”, „Coș”, „stoc epuizat”)
FAIL C10 pozele „COLD” au status ⚠️ în LICENSES (cine le-a făcut: UNKNOWN)
         reparația minimă: GRIM confirmă sursa pozelor în materials/LICENSES.md
```

**6 PASS · 4 FAIL**

Observație (nu e verificare): textul de retur „Retur gratuit? Nu — …” sună defensiv. Propunere pentru voice: „Retur în 14 zile. Transportul retur e al tău, cu excepția produselor defecte.”
