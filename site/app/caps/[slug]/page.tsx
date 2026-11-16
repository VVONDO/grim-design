import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, PRODUCTS } from "@/lib/products";
import { fmtRON } from "@/lib/site";
import { ProductView } from "@/components/product/ProductView";
import { capModelUrl } from "@/lib/server-assets";

export const dynamicParams = false;
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  const isSnake = p.collection === "snake-skin";
  const title = isSnake ? `${p.title} Snakeskin Cap · ${fmtRON(p.price)}` : `${p.title} Trucker Cap · ${fmtRON(p.price)}`;
  const description = `${p.tagline} ${isSnake ? "Snakeskin trucker cap" : "Trap trucker cap"} by GRIM, the Romanian streetwear brand. 3D embroidered logo, black mesh back, one size with adjustable strap. Delivered in 1–2 business days.`;
  return {
    title,
    description,
    alternates: { canonical: `/caps/${p.slug}` },
    openGraph: { title: `GRIM ${p.title}`, description, url: `/caps/${p.slug}`, images: p.hasPhoto ? [{ url: p.images[0].src, width: p.images[0].w, height: p.images[0].h, alt: p.images[0].alt }] : undefined },
    twitter: { card: "summary_large_image", title: `GRIM ${p.title}`, description, images: p.hasPhoto ? [p.images[0].src] : undefined },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return <ProductView product={product} modelUrl={capModelUrl()} />;
}
