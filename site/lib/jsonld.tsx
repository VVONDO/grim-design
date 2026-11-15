import { SITE } from "./site";
import { stockState, type Product } from "./products";

export const abs = (path: string) => new URL(path, SITE.url).toString();

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GRIM",
  url: SITE.url,
  logo: abs("/assets/grim-logo-white.svg"),
  slogan: "wear your shadow",
  description: SITE.description,
  sameAs: [SITE.instagram],
  areaServed: "RO",
});

export const productLd = (p: Product) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: `GRIM ${p.title} Cap`,
  description: `${p.tagline} ${p.collection === "snake-skin" ? "Snakeskin-textured trucker cap, black mesh back, 3D embroidered GRIM logo." : "Trucker cap with mesh back and 3D embroidered GRIM logo."} One size, adjustable strap.`,
  brand: { "@type": "Brand", name: "GRIM" },
  sku: p.slug,
  image: p.hasPhoto ? [abs(p.images[0].src), abs(p.swatch.src)] : undefined,
  color: p.colorway,
  offers: {
    "@type": "Offer",
    url: abs(`/caps/${p.slug}`),
    priceCurrency: "RON",
    price: p.price.toFixed(2),
    availability: stockState(p) === "out" ? "https://schema.org/OutOfStock" : stockState(p) === "low" ? "https://schema.org/LimitedAvailability" : "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
  },
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
});

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
