# connectors.md — ce are voie AI-ul să atingă

| Unealtă | Acces | Ce are voie | Ce NU are voie niciodată |
|---|---|---|---|
| Folderul acesta (repo) | read-write | să scrie ecrane, review-uri, fișiere .md | să șteargă fișierele din `skills/` fără să întrebe |
| Shopify: produse, colecții | **read-only** (azi) | să citească titluri, prețuri, stoc, poze | să schimbe prețuri, stoc, status sau să publice ceva |
| Shopify: comenzi, clienți | **never** | — | să citească sau să exporte date de clienți (sunt minori) |
| Shopify: plăți, reduceri | **never** | — | să creeze coduri de reducere, să umble la plăți |
| Site-ul public grimxo.com | read-only | să citească paginile ca să le analizeze | — |
| Instagram / TikTok @grim.ro | **never** | — | să posteze, să răspundă, să trimită mesaje |
| Figma | nefolosit încă | — | — |

Regula: orice nu se poate anula stă în coloana „never”.
Când trecem Shopify produse pe read-write, schimbăm întâi rândul de aici, cu data.
