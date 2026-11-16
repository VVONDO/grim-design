// Server-only: optional drop-in files. Nothing here ships to the browser.
import { existsSync } from "node:fs";
import { join } from "node:path";
import { ARTIST_CARDS } from "./experience";

const pub = (p: string) => join(process.cwd(), "public", p);

/** If /public/models/cap.glb exists, the 3D scenes use it instead of photo planes. */
export const capModelUrl = () => (existsSync(pub("models/cap.glb")) ? "/models/cap.glb" : undefined);

/** Artist photos are optional: /public/artists/<slug>.webp. Only add photos you have the rights to. */
export const artistPhotos = () => {
  const out: Record<string, string> = {};
  for (const a of ARTIST_CARDS) if (existsSync(pub(`artists/${a.slug}.webp`))) out[a.slug] = `/artists/${a.slug}.webp`;
  return out;
};
