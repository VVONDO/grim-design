// Internal URLs in one place. NEXT_PUBLIC_FLAT_LINKS=1 (used only for the static preview build)
// turns them into flat relative files: caps-snake-skin-red.html, assets/x.webp.
const flat = process.env.NEXT_PUBLIC_FLAT_LINKS === "1";

export const href = {
  home: flat ? "home.html" : "/",
  section: (id: string) => (flat ? `home.html#${id}` : `/#${id}`),
  caps: flat ? "caps.html" : "/caps",
  cap: (slug: string) => (flat ? `caps-${slug}.html` : `/caps/${slug}`),
  checkout: flat ? "checkout.html" : "/checkout",
};

export const asset = (file: string) => (flat ? `assets/${file}` : `/assets/${file}`);

/** Update the address bar to another colorway without a page load (product page color swap). */
export const replaceCap = (slug: string) => {
  if (typeof window !== "undefined") window.history.replaceState(null, "", href.cap(slug));
};
