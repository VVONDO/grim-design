// Site-wide config. Everything marked [TO FILL] must be set before a real launch.

export const SITE = {
  name: "GRIM",
  tagline: "wear your shadow",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  instagram: "https://www.instagram.com/grim.ro/",
  instagramHandle: "@grim.ro",
  // [TO FILL] real contact address before launch.
  email: "[TO FILL]",
  store: "AFI Cotroceni, Bucharest",
  festival: "Nibiru Festival",
  description:
    "GRIM is a Romanian streetwear brand making statement trucker caps. Snakeskin caps, 3D embroidery, mesh backs. Worn by rappers. Wear your shadow.",
};

// Shipping. Delivery time and returns are confirmed facts; cost and threshold are not.
export const SHIPPING = {
  deliveryText: "Delivered in 1–2 business days",
  returnsText: "14-day returns",
  // [TO FILL] shipping cost in RON. null renders "[TO FILL]" in the UI.
  costRON: null as number | null,
  // [TO FILL] free-shipping threshold in RON. null renders "[TO FILL]".
  freeOverRON: null as number | null,
};

export const fmtRON = (n: number) => `${n.toLocaleString("en-US")} RON`;
export const shippingCostLabel = () =>
  SHIPPING.costRON === null ? "[TO FILL]" : fmtRON(SHIPPING.costRON);
export const freeOverLabel = () =>
  SHIPPING.freeOverRON === null ? "[TO FILL]" : fmtRON(SHIPPING.freeOverRON);

// Facts from the brand. Do not add numbers that aren't true.
export const PROOF = {
  nibiruCaps: 1700, // caps sold in 2 months at Nibiru (official partner, 5-year deal)
  onlineOrders2026: 741,
  internationalArtists: 18,
};

// Romanian artists who got the first caps.
export const FIRST_ARTISTS = ["Albert NBN", "Petre Ștefan", "NMW Yanni"];

// International artists who have interacted with GRIM. 6 of 18 are named in the brief.
// [TO FILL] add the remaining 12 names; the wall shows "+N more" until then.
export const INTERNATIONAL_ARTISTS = [
  "Young Thug",
  "Future",
  "Quavo",
  "Offset",
  "A$AP Rocky",
  "Ken Carson",
];
