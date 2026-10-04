# build-order.md — pagina de produs „COLD”

## Treaba ecranului
Clientul vine dintr-un clip și vrea să afle: **o pot lua acum, cât costă în total și când ajunge?**
Starea aleasă: **stoc epuizat** (azi „COLD” e cea mai vândută și apare SOLD OUT), pentru că acolo e bucla „Anunță-mă”.

## Ce citim
day-one · never-list · design-principles · specs · glossary · LICENSES

## Componente (doar din specs)
Galerie · Nume produs · Indicator stoc · Preț · Buton plin · Câmp email · Rând livrare · Detalii produs

## Ordinea de construcție
1. **Adună:** date „COLD” din Shopify (read-only): nume, 199 lei, 6 poze. Poze → status ⚠️ în LICENSES, folosite doar în prototip.
2. **Instalează:** totul în `screens/`, fișier unic.
3. **Asamblează:** galerie → nume → stoc → preț → buton + email → livrare → detalii.
4. **Verifică:** `design-review` → `reviews/01-…`. Repară cel puțin un FAIL → `reviews/02-…`.
5. **Livrează:** ecranul + review-urile + lista LIPSĂ (livrare, material).

## Pasul repetat de 3 ori (candidat la automatizare)
Verificarea „fiecare valoare din CSS e în specs” (C6–C8). E mecanică: se poate scrie ca script peste toate ecranele.
