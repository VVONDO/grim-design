import { asset } from "@/lib/links";
// Demo catalogue. Prices are real list prices from the brief; STOCK IS DEMO DATA.
// Replace `stock` with live inventory before launch: "Low stock" must only show when it's true.

export type Img = { src: string; alt: string; w: number; h: number };

export type Product = {
  slug: string;
  collection: "snake-skin" | "og";
  name: string; // e.g. SNAKE SKIN
  colorway: string; // e.g. Red/Black
  title: string; // full display title
  tagline: string;
  price: number; // RON
  /** DEMO stock count. 0 = sold out, <= LOW_STOCK = low-stock badge. */
  stock: number;
  swatch: Img; // close-up of the cap, used as color swatch and detail shot
  images: Img[]; // first image is the hero shot
  hasPhoto: boolean;
};

export const LOW_STOCK = 6; // DEMO threshold

const a = (file: string, alt: string, w = 1440, h = 1800): Img => ({
  src: asset(`${file}.webp`),
  alt,
  w,
  h,
});
const detail = (file: string, alt: string): Img => a(file, alt, 1000, 1000);

export const SNAKE_HOOK = "Keep ur friends close, but ur friends closer...";

export const COLLECTIONS = {
  "snake-skin": {
    name: "SNAKE SKIN",
    price: 249,
    hook: SNAKE_HOOK,
    copy: "Snakeskin-textured panels. Black mesh back. Signature GRIM logo in 3D embroidery.",
  },
  og: {
    name: "OG",
    price: 219,
    hook: "Where it started.",
    copy: "The first GRIM shapes. Mesh back, 3D embroidered logo, colorways that stay.",
  },
} as const;

const snake = (
  color: string,
  slug: string,
  tagline: string,
  stock: number,
  images: Img[],
  swatch: Img,
): Product => ({
  slug: `snake-skin-${slug}`,
  collection: "snake-skin",
  name: "SNAKE SKIN",
  colorway: `${color}/Black`,
  title: `SNAKE SKIN ${color}/Black`,
  tagline,
  price: 249,
  stock,
  images,
  swatch,
  hasPhoto: true,
});

export const PRODUCTS: Product[] = [
  snake(
    "Red",
    "red",
    "Cold-blooded. Red-hot.",
    4, // DEMO
    [
      a("snake-skin-red-black-cap-worn-front", "Red and black snakeskin GRIM trucker cap worn with a red snake around the shoulders"),
      a("snake-skin-red-black-cap-red-snake", "Model in sunglasses wearing the red snakeskin GRIM cap, holding a red snake"),
      a("snake-skin-blue-and-red-caps-duo", "Two models in GRIM caps: blue snakeskin and red snakeskin"),
    ],
    detail("snake-skin-red-black-cap-detail", "Close-up of the red snakeskin panel and black 3D embroidered GRIM logo"),
  ),
  snake(
    "Natural",
    "natural",
    "The original pattern, straight from the wild.",
    23, // DEMO
    [
      a("snake-skin-natural-black-cap-worn-front", "Natural snakeskin GRIM trucker cap worn with a ball python draped over the shoulders"),
      a("snake-skin-natural-black-cap-grillz", "Model with grillz wearing the natural snakeskin GRIM cap and a python"),
      a("snake-skin-natural-black-cap-portrait", "Portrait in the natural snakeskin GRIM cap and sunglasses, black mesh back visible"),
      a("snake-skin-natural-black-cap-side", "Side view of the natural snakeskin GRIM cap with mesh back"),
    ],
    detail("snake-skin-natural-black-cap-detail", "Close-up of the natural snakeskin texture and black 3D embroidered GRIM logo"),
  ),
  snake(
    "Grey",
    "grey",
    "Stone-cold and silent.",
    3, // DEMO
    [
      a("snake-skin-grey-black-cap-worn-front", "Grey snakeskin GRIM trucker cap worn with a grey snake around the neck"),
      a("snake-skin-grey-black-cap-back-view", "Back view: grey snakeskin GRIM cap worn backwards with a python on the shoulders"),
      a("snake-skin-grey-black-cap-side-profile", "Side profile in the grey snakeskin GRIM cap and black mesh back", 1350, 1800),
      a("snake-skin-grey-black-cap-eyes-down", "Model looking down, grey snakeskin GRIM cap shading the eyes"),
    ],
    detail("snake-skin-grey-black-cap-detail", "Close-up of the grey snakeskin panel and black 3D embroidered GRIM logo"),
  ),
  snake(
    "Blue",
    "blue",
    "Deep-water blue for the ones who move quiet.",
    12, // DEMO
    [
      a("snake-skin-blue-black-cap-worn-front", "Blue snakeskin GRIM trucker cap worn with a blue snake over the shoulders"),
      a("snake-skin-blue-and-red-caps-duo", "Two models in GRIM caps: blue snakeskin and red snakeskin"),
    ],
    detail("snake-skin-blue-black-cap-detail", "Close-up of the deep blue snakeskin panel and black 3D embroidered GRIM logo"),
  ),
  snake(
    "Pink",
    "pink",
    "Sweet on the surface, venom underneath.",
    5, // DEMO
    [
      a("snake-skin-pink-black-cap-worn-front", "Hot pink snakeskin GRIM trucker cap worn with a pink snake across the chest"),
      a("snake-skin-green-and-pink-caps-duo", "Two models back to back in green and pink snakeskin GRIM caps, sharing one snake"),
    ],
    detail("snake-skin-pink-black-cap-detail", "Close-up of the pink snakeskin panel and black 3D embroidered GRIM logo"),
  ),
  snake(
    "Green",
    "green",
    "Toxic green. Not for the shy.",
    18, // DEMO
    [
      a("snake-skin-green-black-cap-worn-front", "Toxic green snakeskin GRIM trucker cap, green snake wrapped around the arm"),
      a("snake-skin-green-black-cap-grillz", "Model with grillz in the green snakeskin GRIM cap, green snake on the arm"),
      a("snake-skin-green-and-pink-caps-duo", "Two models back to back in green and pink snakeskin GRIM caps, sharing one snake"),
    ],
    detail("snake-skin-green-black-cap-detail", "Close-up of the green snakeskin panel and black 3D embroidered GRIM logo"),
  ),
  {
    slug: "og-lot-triple-black",
    collection: "og",
    name: "“LOT” HAT V2",
    colorway: "Triple Black",
    title: "Triple BLACK “LOT” HAT V2",
    tagline: "Black on black on black. Nothing to explain.", // draft copy
    price: 219,
    stock: 30, // DEMO
    images: [a("og-lot-triple-black-cap-full-look", "Full look: triple black GRIM “LOT” cap with a washed black hoodie and shorts")],
    swatch: { src: asset("og-lot-triple-black-cap-detail.webp"), alt: "Close-up of the triple black GRIM “LOT” cap with black embroidered logo", w: 688, h: 688 },
    hasPhoto: true,
  },
  {
    slug: "og-drank-purple-black",
    collection: "og",
    name: "“DRANK”",
    colorway: "Purple/Black",
    title: "“DRANK” Purple/Black",
    tagline: "Purple cord, black body. Slow motion.", // draft copy
    price: 219,
    stock: 6, // DEMO
    images: [
      a("og-drank-purple-black-cap-worn", "Black GRIM “DRANK” cap with purple cord and white 3D embroidery"),
      a("og-drank-purple-black-cap-backwards", "GRIM “DRANK” cap worn backwards, showing the adjustable strap and side embroidery"),
    ],
    swatch: detail("og-drank-purple-black-cap-detail", "Close-up of the GRIM “DRANK” cap: purple cord and white 3D embroidered logo"),
    hasPhoto: true,
  },
  {
    slug: "og-sea-cyan-black",
    collection: "og",
    name: "“SEA”",
    colorway: "Cyan/Black",
    title: "“SEA” Cyan/Black",
    tagline: "Cyan on black. Cold water, no bottom.", // draft copy
    price: 219,
    stock: 0, // DEMO: shows the sold-out → "Notify me" state
    images: [],
    swatch: { src: "", alt: "", w: 1, h: 1 },
    hasPhoto: false, // [TO FILL] product photo missing
  },
  {
    slug: "og-royal-blue-black",
    collection: "og",
    name: "“ROYAL”",
    colorway: "Blue/Black",
    title: "“ROYAL” Blue/Black",
    tagline: "Royal blue on black. Crowned, not chosen.", // draft copy
    price: 219,
    stock: 15, // DEMO
    images: [],
    swatch: { src: "", alt: "", w: 1, h: 1 },
    hasPhoto: false, // [TO FILL] product photo missing
  },
];

export const TEASERS = [
  { name: "“CHAOS” Hoodie" },
  { name: "“CHAOS” Shorts" },
  { name: "“ANGEL” Tee" },
  { name: "“WAR” Tee" },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const byCollection = (c: Product["collection"]) => PRODUCTS.filter((p) => p.collection === c);

export type StockState = "in" | "low" | "out";
export const stockState = (p: Pick<Product, "stock">): StockState =>
  p.stock <= 0 ? "out" : p.stock <= LOW_STOCK ? "low" : "in";
