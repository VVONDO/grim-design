# LICENSES.md — de unde vine fiecare material

Regula: **UNKNOWN nu e o valoare, e o sarcină.** Nimic nu intră pe site fără sursă.

| Material | De unde vine | Licență | Uz comercial? | Credit datorat | Status |
|---|---|---|---|---|---|
| Logo GRIM (`PNG_LOGO.png`) | făcut de GRIM | al nostru | da | nu | ✅ |
| Poze produs șepci (CDN Shopify, ex. `59688B6D…jpg`) | făcute de GRIM (fondatorul) | ale noastre | da | nu | ✅ confirmat 4 oct 2026 |
| Poze CHAOS / WAR / ANGEL (`20D04791…png`, `IMG-0024/0025.png`) | făcute de GRIM (fondatorul) | ale noastre | da | nu | ✅ confirmat 4 oct 2026 |
| „SPACE” cap (`ChatGPTImage15iun.2026…png`) | generată cu AI | termenii furnizorului | de verificat | nu | ⚠️ nu folosi ca poză de produs: nu arată produsul real |
| Poza Young Thug (`young_thug_nedal.ro_BP25-25.jpg`) | fotograf nedal.ro | acord de la fotograf (GRIM, 4 oct 2026) | ⚠️ parțial | da, fotograful (nedal.ro) | ⚠️ vezi nota de mai jos |
| Poza Ken Carson (`IMG_8868.png`) | fotograf: acord confirmat de GRIM | acord de la fotograf | ⚠️ parțial | da, fotograful | ⚠️ vezi nota de mai jos |
| Font titluri: **Archivo Black** | Google Fonts | SIL OFL 1.1 | da | nu | ✅ |
| Font text: **Inter** | Google Fonts | SIL OFL 1.1 | da | nu | ✅ |
| Iconițe: **Lucide** | lucide.dev | ISC | da | nu | ✅ |
| Poze ședință foto „GRIM FUNDAL NEGRU EDIT” (Drive, ex. `IMG_3996`, `IMG_4106`…) → `site/public/assets/snake-skin-*.webp` | ședință foto GRIM, fotograf: cont Drive alexraducanu598 | de confirmat | ⚠️ de confirmat | de confirmat | ⚠️ folosite doar în prototipul local `site/`. Confirmă acordul fotografului și al modelelor înainte de lansare |
| Poze ședință foto „GRIM SHOOTING FUNDAL ALB” (Drive, `IMG_4520`, `IMG_4450`, `IMG_4432`) → `site/public/assets/og-*.webp` | ședință foto GRIM, același fotograf | de confirmat | ⚠️ de confirmat | de confirmat | ⚠️ ca mai sus |
| Logo `PNG_LOGO_negru 2.svg` (Drive), recolorat alb → `site/public/assets/grim-logo-white.svg`, `site/components/Logo.tsx` | făcut de GRIM | al nostru | da | nu | ✅ |
| Font titluri site: **Big Shoulders** | Google Fonts | SIL OFL 1.1 | da | nu | ✅ |
| Font detalii site: **IBM Plex Mono** | Google Fonts | SIL OFL 1.1 | da | nu | ✅ |
| Font text site: **Archivo** | Google Fonts | SIL OFL 1.1 | da | nu | ✅ |
| Animații: **GSAP** + **Lenis** | npm | GSAP Standard License (gratuit, inclusiv comercial) / MIT | da | nu | ✅ |
| Decupaje șepci (`site/public/assets/*-cutout.webp`) | derivate din pozele „GRIM FUNDAL NEGRU EDIT” de mai sus | ca sursa | ⚠️ de confirmat | ca sursa | ⚠️ doar în prototip |
| 3D: **three.js**, **React Three Fiber**, **drei**, **postprocessing** | npm | MIT / Zlib | da | nu | ✅ |
| Texte produse | scrise de GRIM | ale noastre | da | nu | ✅ (materialul nu se publică — decizia GRIM) |

## Prototipul `site/` (15 nov 2026)
Folderul Drive „TOTI ARTISTII AD” conține doar clipuri video. Prototipul **nu folosește nicio imagine cu artiști**: zidul cu cei 18 artiști e doar text (nume), conform notei de mai jos.

## Nota despre pozele cu artiști
Acordul fotografului acoperă **poza**. Pentru a folosi **chipul unui artist** ca să vinzi un produs, de obicei e nevoie și de acordul **persoanei** din poză (dreptul la imagine). Nu sunt jurist; verifică asta cu un avocat înainte să le folosești în reclame.
Până atunci, regula pentru AI: poate folosi pozele doar ca **„văzut purtat de”** (context editorial, cu credit pentru fotograf), nu în reclame sau pe butoane de cumpărare.

## Dovezi
- [ ] Pune acordul scris al fotografului (email sau mesaj, captură) în `materials/acorduri/` → GRIM
- [ ] Află dacă există acord de la artiști sau management → GRIM
