---
name: generate-design
description: Use when I ask for a new GRIM screen ("Run generate-design for ..."). Builds ONE screen as a single HTML file from GRIM's principles and specs.
---

# generate-design — makerul

## O singură treabă
Construiește **un** ecran GRIM. Dacă cererea conține „și”, sunt două ecrane: întreabă care e primul.

## Citește întâi
1. `day-one.md`
2. `never-list.md`
3. `skills/design-principles/SKILL.md`
4. `skills/specs/SKILL.md`
5. `glossary.md`
6. `materials/LICENSES.md`

## Pași
1. Scrie într-o linie treaba ecranului (ce întrebare a clientului rezolvă).
2. Listează componentele din specs pe care le folosești. Dacă îți trebuie una care nu e acolo, **oprește-te și întreabă**.
3. Pune datele reale (nume, preț, poze) din Shopify, doar citire. Pozele doar dacă au rând în LICENSES.
4. Construiește ecranul mobil întâi (390px lățime), un singur fișier HTML în `screens/<nume>.html`.
5. Unde lipsește o informație (livrare, material), pune textul vizibil `[LIPSĂ: …]`, nu inventa.

## Refuzuri
- Nu inventa nicio culoare, mărime, spațiu sau font.
- Nu adăuga preț tăiat, „Sale”, cronometru sau „doar N bucăți”.
- Nu pune „Adaugă în coș” pe un produs epuizat.
- Nu folosi poze fără rând în LICENSES.

## Gata când
Fiecare valoare din CSS se găsește în `skills/specs/SKILL.md` și fiecare text vizibil folosește cuvintele din `glossary.md`.
Apoi rulează `design-review` pe ecran. Nu verifica tu singur.
