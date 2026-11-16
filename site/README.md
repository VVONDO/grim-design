# GRIM: showcase prototype

A local prototype of the GRIM website. It is **not** a store: it has no Shopify, no real payments and no backend. The cart lives in your browser (localStorage), and checkout is a demo page that takes no money.

Next.js 15 (App Router) + TypeScript + Tailwind. Every page is statically generated at build time.

## Run it

Requires Node 20+.

```bash
cd site
npm install
npm run dev          # http://localhost:3000, for editing
```

To show it to people, run the production build (faster, and it matches the Lighthouse numbers below):

```bash
npm run build
npm start            # http://localhost:3000
```

To open it on a phone on the same Wi-Fi: `npm start -- -H 0.0.0.0`, then open `http://<your-computer-ip>:3000`.

## View it without a computer (single-file preview)

`node preview/build.mjs` builds the whole site into one self-contained HTML file (`preview/dist/grim-preview.html`, about 4.7 MB). It inlines images, CSS and JS; pages become `#caps`, `#cap-snake-skin-red`, `#checkout`. It uses the same components as the real site, with small stand-ins for Next.js pieces (`preview/stubs/`). This is the version published as a private claude.ai page for viewing on an iPad. Fonts load from Google Fonts.

## 3D version (desktop)

On screens 768px and wider, with motion allowed, the hero, the story and the product page run in 3D (React Three Fiber + drei, GSAP ScrollTrigger, Lenis). Phones and `prefers-reduced-motion` get the earlier static versions. Built and checked at 1440px only.

- **Hero** (`components/home/Hero3D.tsx`, scene in `components/three/HomeCanvas.tsx`): pinned. Spotlight comes up on a floating cap in front of a giant "GRIM"; scrolling turns the cap, pushes in on the embroidery, pulls back through the six SNAKE SKIN colors and ends on "Shop now".
- **Story** (`components/home/Story3D.tsx`): pinned. Typed line, a cap thrown onto the first artist card with a red flash (the only thing that blooms), the count-up to 18 with cards drifting in depth, then a row of the six caps that tilt toward the cursor.
- **Product page** (`components/product/ProductStage.tsx`, `components/three/ViewerCanvas.tsx`): drag to rotate through the shots, scroll to zoom into three hotspots, swatches swap the color in place, "Add to cart" flies the cap into the cart icon.
- One canvas per page. The home canvas sleeps when neither pinned section is on screen.

There is no 3D model of the cap, so depth is faked with photos on planes. Drop a model at `public/models/cap.glb` and both scenes use it instead (this path is untested: no model exists yet).

**Placeholders added in this version**
- **Artist photos:** none are cleared for use (see `../materials/LICENSES.md`), so the story cards show names with "photo pending". Add `public/artists/young-thug.webp`, `future.webp`, `quavo.webp`, `offset.webp` to show real photos. Only add photos you have the rights to.
- **Hotspot positions** (`lib/experience.ts`) are placed by eye on each close-up. The strap is at the back and out of frame in every photo: its pin marks where it sits.
- **Cap cutouts** (`public/assets/*-cutout.webp`, made by `scripts/build-cutouts.py`) are automatic. The blue one has a soft dark halo because the cap is nearly black on a black background. Proper product cutouts would look sharper.

## What's on the site

| Route | What it is |
|---|---|
| `/` | Hero (cap zooms on scroll, "wear your shadow", Shop now) → manifesto (3 values, one per screen) → story (first Romanian artists, the Young Thug sequence pinned to scroll, wall of the 18 artists) → SNAKE SKIN (pinned stage: scrolling walks through the 6 colorways, with a color switcher) → detail zoom → OG → animated counters (1,700+ / 741 / 18) → fit guide and delivery → Instagram grid placeholder, drop newsletter, "More from GRIM" teaser |
| `/caps` | All caps, with the availability badge on each card |
| `/caps/[slug]` | Product page: swipeable gallery with a detail close-up, availability shown before the price, color picker, red "Add to cart", delivery and returns directly under the button, details, quality, fit guide, empty "real reviews go here" box, related caps. On phones, a sticky "Add to cart" bar appears whenever the main button is off-screen |
| `/checkout` | Demo checkout (marked `noindex`) |
| `/sitemap.xml`, `/robots.txt` | Generated from the product list |

Clean URLs: `/caps/snake-skin-red`, `/caps/snake-skin-natural`, `/caps/snake-skin-grey`, `/caps/snake-skin-blue`, `/caps/snake-skin-pink`, `/caps/snake-skin-green`, `/caps/og-lot-triple-black`, `/caps/og-drank-purple-black`, `/caps/og-sea-cyan-black`, `/caps/og-royal-blue-black`.

Motion: GSAP ScrollTrigger + Lenis smooth scroll, loaded after the page becomes interactive. Reveal-on-scroll uses an IntersectionObserver. With `prefers-reduced-motion`, all of it is switched off and the pinned sequences render as plain, static text.

The drop-alert popup appears once per session, after 20 seconds or on exit intent (desktop). It never appears on checkout.

## Where to change things

- **Products, prices, demo stock, taglines:** `lib/products.ts`
- **Shipping, contact, proof numbers, artist names:** `lib/site.ts`
- **Images:** `public/assets/`. `scripts/build-assets.py` rebuilt them from the Drive originals (resize, WebP, descriptive names, cap close-up crops). `next/image` also serves AVIF/WebP at the right size for each device.
- **Colors:** `tailwind.config.ts` and `app/globals.css`. There are four: `#0A0A0A`, `#FFFFFF`, `#EDE6D6` and `#E3102B`.

## Placeholders: replace before a real launch

| What | Where | Status now |
|---|---|---|
| Shipping cost | `SHIPPING.costRON` in `lib/site.ts` | shows **[TO FILL]**. `day-one.md` says 25 lei; confirm, then set it to `25` |
| Free-shipping threshold | `SHIPPING.freeOverRON` in `lib/site.ts` | shows **[TO FILL]** |
| Stock levels and "Low stock" badges | `stock` in `lib/products.ts` | **DEMO DATA.** Red, Grey, Pink and DRANK show "Low stock"; SEA is set to sold out to demo the "Notify me" state. Connect to real inventory: the badge must only show when stock really is low |
| The other 12 artist names | `INTERNATIONAL_ARTISTS` in `lib/site.ts` | wall shows 6 names + "+12 more". (The Drive deck "Celebritati ce au purtat sapca GRIM" also names Lil Mabu; not added because the brief didn't list him) |
| "SEA" and "ROYAL" photos | `lib/products.ts` (`hasPhoto: false`) | line-drawn cap placeholder |
| OG product shots on black | `public/assets/og-*` | LOT and DRANK use white-background shots; a black-background shoot would match the site |
| OG taglines | `lib/products.ts` (marked `// draft copy`) | written for the prototype; GRIM to approve |
| Contact email | `SITE.email` in `lib/site.ts` | **[TO FILL]** |
| Instagram grid | `components/home/Community.tsx` | our own shoot photos linking to @grim.ro; swap for a real feed |
| Newsletter / drop alerts / "Notify me" | `components/EmailForm.tsx` | nothing is sent; connect to the real email list |
| Reviews | product page, "Real reviews go here" | empty on purpose; no invented reviews |
| Checkout and payments | `app/checkout/` | demo only |
| Site URL | `NEXT_PUBLIC_SITE_URL` env var | defaults to `http://localhost:3000`; canonical URLs, sitemap and JSON-LD use it |
| Photo rights | `../materials/LICENSES.md` | photographer and model consent still **to confirm** for the Drive shoots |
| Head-size range for the fit guide | `components/FitGuide.tsx` | says "one size, adjustable strap" only; add the cm range if GRIM has it |

## Assets used (from Google Drive)

- Logo: `PNG_LOGO_negru 2.svg`, recolored to white and inlined (`components/Logo.tsx`, `public/assets/grim-logo-white.svg`, `app/icon.svg`).
- Product photos: 22 from "GRIM FUNDAL NEGRU EDIT" (all 6 SNAKE SKIN colorways) and 3 from "GRIM SHOOTING FUNDAL ALB" (OG LOT and DRANK). 3.3 MB total, all WebP. Shots with third-party logos visible were skipped.
- **Not used:** "TOTI ARTISTII AD" holds only videos, and artist likeness is not cleared for selling (see `materials/LICENSES.md`), so the artist wall is text only. "GRIM SHOOTING" was empty. "Shoot grim" held one unrelated image ("Masked Figure Among Reeds.png") and a video.

## SEO

- `lang="en"`; unique title and description on every page; Open Graph and Twitter cards (`public/og/grim-og.jpg`, and the product photo on product pages).
- JSON-LD: `Organization` (all pages), `Product` with a RON price and availability (product pages), `BreadcrumbList` (product pages and `/caps`).
- Target keywords appear in titles, descriptions and copy: streetwear caps, trap caps, snakeskin cap, Romanian streetwear brand, caps worn by rappers.

## Lighthouse (mobile, production build, local)

| Page | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| `/` | 91–96 | 100 | 100 | 100 |
| `/caps` | 91 | 100 | 100 | 100 |
| `/caps/snake-skin-red` | 95–96 | 100 | 100 | 100 |
| `/caps/og-drank-purple-black` | 94 | 100 | 100 | 100 |
| `/checkout` | 93 | 100 | 100 | 66: intentionally `noindex` |

Performance varies by a few points between runs. CLS is 0 everywhere.

## Where this departs from the repo's design docs

The brief for this prototype asked for things that the older docs in this repo (`CLAUDE.md`, `skills/specs`, `never-list.md`) handle differently. The brief was followed; flagging the gaps so GRIM can decide:

1. **Language:** site copy is in English (the brief). `CLAUDE.md` asks for Romanian.
2. **Colors:** dark site with a red CTA (the brief). `skills/specs` v1 describes a white site with no red.
3. **"Low stock" badges:** they show as demo data. `never-list.md` #2 forbids showing low stock when it isn't true. Before launch, connect real stock or remove the badges. The badges show no counts and there are no timers or fake viewer counts.
4. **Sold-out products** show "Notify me", never "Add to cart" (`never-list.md` #3). No crossed-out prices anywhere (#1).
5. **Audience:** the brief says 14–24; `day-one.md` says 14–18. The copy avoids pressure either way: the drop popup is one calm email ask, once per session.
