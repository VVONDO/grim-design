// Data for the 3D scenes.
import { asset } from "@/lib/links";

// The six SNAKE SKIN cutouts (scripts/build-cutouts.py), in hero cycle order.
// `logo` = centre of the embroidered logo in the cutout, 0..1 from top-left.
export const HERO_CAPS = [
  { slug: "snake-skin-natural", color: "Natural", logo: [0.509, 0.442] },
  { slug: "snake-skin-red", color: "Red", logo: [0.447, 0.386] },
  { slug: "snake-skin-grey", color: "Grey", logo: [0.5, 0.4] },
  { slug: "snake-skin-blue", color: "Blue", logo: [0.361, 0.35] },
  { slug: "snake-skin-pink", color: "Pink", logo: [0.478, 0.335] },
  { slug: "snake-skin-green", color: "Green", logo: [0.484, 0.354] },
].map((c) => ({ ...c, src: asset(`${c.slug}-black-cap-cutout.webp`) }));

// Artist cards in the story. No cleared artist photos exist yet, so cards are typographic.
// [TO FILL] drop /public/artists/<slug>.webp to show a real photo on a card.
export const ARTIST_CARDS = [
  { name: "Young Thug", slug: "young-thug" },
  { name: "Future", slug: "future" },
  { name: "Quavo", slug: "quavo" },
  { name: "Offset", slug: "offset" },
];

// Product-viewer hotspots, positioned on each product's close-up shot (0..1 from top-left).
// Positions are eyeballed from the photos. The strap sits at the back, out of frame: its pin marks where.
export type Hotspot = { id: string; title: string; text: string; at: [number, number] };
const spots = (e: [number, number], m: [number, number], s: [number, number]): Hotspot[] => [
  { id: "embroidery", title: "3D embroidery", text: "The GRIM logo is stitched thick and stands off the panel.", at: e },
  { id: "mesh", title: "Mesh back", text: "Black mesh behind the front panels. Breathes, keeps the trucker shape.", at: m },
  { id: "strap", title: "Adjustable strap", text: "At the back. One size, tightens in seconds.", at: s },
];
export const HOTSPOTS: Record<string, Hotspot[]> = {
  "snake-skin-natural": spots([0.53, 0.47], [0.2, 0.3], [0.84, 0.3]),
  "snake-skin-red": spots([0.42, 0.38], [0.76, 0.36], [0.84, 0.5]),
  "snake-skin-grey": spots([0.5, 0.38], [0.15, 0.42], [0.86, 0.42]),
  "snake-skin-blue": spots([0.3, 0.27], [0.7, 0.24], [0.88, 0.36]),
  "snake-skin-pink": spots([0.5, 0.25], [0.2, 0.3], [0.84, 0.3]),
  "snake-skin-green": spots([0.48, 0.3], [0.08, 0.4], [0.93, 0.42]),
  "og-lot-triple-black": spots([0.5, 0.3], [0.24, 0.36], [0.2, 0.5]),
  "og-drank-purple-black": spots([0.16, 0.42], [0.62, 0.22], [0.8, 0.34]),
};
