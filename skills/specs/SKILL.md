---
name: specs
description: Valorile exacte pentru GRIM — culori, text, spații, colțuri, componente și stările lor. Sursa unică de adevăr. Dacă o valoare lipsește, întreabă, nu alege.
---

# specs — GRIM

Status: **propunere v1 (4 oct 2026)**, derivată din site-ul actual (alb/negru). De confirmat de GRIM.

## Culori
| Token | Valoare | Folosire |
|---|---|---|
| `--ink` | `#0A0A0A` | text principal, butonul plin |
| `--paper` | `#FFFFFF` | fundal |
| `--muted` | `#6B6B6B` | text secundar (contrast 5.3:1 pe alb) |
| `--line` | `#E4E4E4` | linii, borduri |
| `--surface` | `#F4F4F4` | fundal poze, carduri |
| `--ok` | `#1F7A3E` | punctul „În stoc” — doar acolo |
| `--wait` | `#9A6B00` | punctul „Precomandă” — doar acolo |
Nicio altă culoare. Roșul nu există în interfață.

## Text
| Rol | Font | Mărime / înălțime rând | Greutate |
|---|---|---|---|
| Nume produs | Archivo Black | 28px / 32px, majuscule | 400 |
| Preț | Inter | 20px / 28px | 600 |
| Corp | Inter | **16px** / 24px (minim absolut 16px pentru corp) | 400 |
| Etichetă mică | Inter | 13px / 18px, majuscule, spațiere 0.06em | 500 |
Etichetele mici nu poartă niciodată informație esențială (disponibilitate, preț, livrare).

## Spații
Pași: `4, 8, 12, 16, 24, 32, 48` px. Margine laterală pe telefon: `16px`.

## Colțuri
Butoane și câmpuri: `0px` (pătrat, stil streetwear). Poze: `0px`.

## Componente

**Buton plin** — fundal `--ink`, text alb, Inter 16/600, înălțime **52px**, lățime 100%.
Stări: normal · apăsat (`opacity .85`) · dezactivat (nu există: un buton dezactivat se înlocuiește cu acțiunea corectă).

**Buton contur** — bordură 1.5px `--ink`, fundal transparent, aceeași mărime. Folosit doar când butonul plin există deja pe ecran (ex. „Ghid mărimi” nu e buton, e link).

**Indicator stoc** — punct 8px + text Corp. Stări:
- `În stoc` (punct `--ok`) → buton „Adaugă în coș”
- `Precomandă · livrare în N zile` (punct `--wait`) → buton „Precomandă”
- `Stoc epuizat · revine în stoc` (punct gol, bordură `--muted`) → buton „Anunță-mă” + câmp email

**Rând livrare** — iconiță Lucide `truck` 20px + text Corp: „Livrare prin curier în 1–2 zile · 25 lei”. (Confirmat de GRIM, 4 oct 2026.)

**Galerie** — poze pătrate 1:1, fundal `--surface`, puncte de navigare 6px sub ea.

**Detalii produs** — listă cu linie `--line` între rânduri: Închidere, Broderie, Mărime.
**Materialul nu apare pe site** (decizia GRIM, 4 oct 2026). Nu adăuga rândul „Material” și nu ghici materialul în texte.
