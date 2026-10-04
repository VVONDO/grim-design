---
name: design-principles
description: De ce arată GRIM cum arată. Citește înainte de orice ecran sau review. Răspunde la întrebări de judecată, nu de valori (valorile sunt în specs).
---

# design-principles — GRIM

Fiecare regulă are un număr, un motiv și un exemplu de încălcare, ca review-ul să poată spune FAIL și să arate linia.

**1. Un singur buton plin pe ecran.**
De ce: clientul vine dintr-un clip cu o singură întrebare („o pot lua?”); două butoane egale îl opresc.
Încălcare: „Adaugă în coș” și „Cumpără acum” unul lângă altul, ambele negre.

**2. Disponibilitatea se citește înaintea prețului.**
De ce: întrebarea reală e „o mai pot lua?”. Dacă e epuizat, prețul nu contează.
Încălcare: preț mare sus, „SOLD OUT” mic, jos, lângă buton.

**3. Butonul spune adevărul despre stoc.**
De ce: un adolescent care plătește și nu primește nimic nu mai revine.
Încălcare: „SOLD OUT” afișat, dar butonul de coș e activ.

**4. Prețul e prețul.**
De ce: clienții noștri sunt minori; nu le arătăm reduceri inventate.
Încălcare: 219 lei tăiat → 199 lei, permanent, pe toate produsele.

**5. Totul pe un ecran de telefon: poză, nume, disponibilitate, preț, livrare, buton.**
De ce: 9 din 10 vin de pe telefon dintr-un story; dacă trebuie să deruleze ca să afle livrarea, pleacă. **[procentul e o estimare, nu o măsurătoare]**
Încălcare: livrarea apare doar la checkout.

**6. Produsul real, nu o promisiune.**
De ce: șapca e brodată; clientul vrea să vadă broderia și materialul.
Încălcare: imagine generată cu AI în loc de foto cu șapca reală; galerie fără detaliu de broderie.

**7. Tot textul în română, cu cuvintele din glossary.**
De ce: amestecul „Regular price / Produse / Add to cart” arată neterminat și scade încrederea.
Încălcare: „Sale” sau „Unit price / per” vizibile.

**8. Negru și alb; culoarea vine doar din produs.**
De ce: fiecare șapcă are culoarea ei (LOT roșu, DRANK mov, SEA cyan); interfața nu are voie să concureze cu ea.
Încălcare: butoane colorate, badge-uri roșii „SALE”.
