import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/caps`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...PRODUCTS.map((p) => ({
      url: `${SITE.url}/caps/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      images: p.hasPhoto ? [`${SITE.url}${p.images[0].src}`] : undefined,
    })),
  ];
}
