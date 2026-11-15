// Preview version of lib/links: every page is a #hash view of one file; images are inlined.
import { ASSETS } from "./assets.generated";
export const href = {
  home: "#home",
  section: (id: string) => `#${id}`,
  caps: "#caps",
  cap: (slug: string) => `#cap-${slug}`,
  checkout: "#checkout",
};
export const asset = (file: string) => ASSETS[file] ?? "";
