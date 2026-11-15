import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { byCollection, COLLECTIONS, getProduct, PRODUCTS, stockState } from "@/lib/products";
import { fmtRON, PROOF } from "@/lib/site";
import { breadcrumbLd, JsonLd, productLd } from "@/lib/jsonld";
import { Gallery } from "@/components/product/Gallery";
import { BuyBox } from "@/components/product/BuyBox";
import { FitGuide } from "@/components/FitGuide";
import { StockBadge } from "@/components/StockBadge";
import { CapPlaceholder } from "@/components/CapPlaceholder";

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
  const siblings = byCollection(product.collection);
  const col = COLLECTIONS[product.collection];
  const others = PRODUCTS.filter((p) => p.slug !== product.slug && p.hasPhoto).slice(0, 4);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Caps", path: "/caps" },
    { name: product.title, path: `/caps/${product.slug}` },
  ];

  return (
    <>
      <JsonLd data={productLd(product)} />
      <JsonLd data={breadcrumbLd(crumbs)} />

      <div className="gutter mx-auto max-w-[1600px] pt-20 md:pt-24">
        <nav aria-label="Breadcrumb" className="font-mono text-[12px] uppercase tracking-[0.1em] text-white/70">
          <ol className="flex flex-wrap gap-2">
            {crumbs.map((c, k) => (
              <li key={c.path} className="flex gap-2">
                {k < crumbs.length - 1 ? (
                  <>
                    <Link href={c.path} className="link-underline">{c.name}</Link>
                    <span aria-hidden>/</span>
                  </>
                ) : (
                  <span aria-current="page" className="text-white">{c.name}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <article className="gutter mx-auto mt-4 grid max-w-[1600px] gap-8 md:mt-8 md:grid-cols-[1.3fr_1fr] md:gap-14" aria-label={product.title}>
        <div className="-mx-[var(--gutter)] md:mx-0">
          <Gallery product={product} />
        </div>
        <div className="md:sticky md:top-24 md:self-start">
          <BuyBox product={product} siblings={siblings} />
        </div>
      </article>

      {product.collection === "snake-skin" && (
        <section className="gutter mx-auto mt-24 max-w-[1600px] md:mt-36" aria-label="Collection hook">
          <p className="display reveal text-[11vw] md:text-[6vw]">“{col.hook}”</p>
        </section>
      )}

      <section className="gutter mx-auto mt-24 max-w-[1600px] md:mt-36" aria-labelledby="quality-title">
        <p className="eyebrow">Quality</p>
        <h2 id="quality-title" className="display mt-3 text-[15vw] md:text-[6vw]">Built to be seen.</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div className="relative aspect-square overflow-hidden">
            {product.hasPhoto ? <Image src={product.swatch.src} alt={product.swatch.alt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" /> : <CapPlaceholder />}
          </div>
          <ul className="space-y-6">
            {[
              ["3D embroidery", "The GRIM logo is raised off the front panel, stitched thick so it holds its shape."],
              ["Mesh back", "Black mesh at the back. Breathes in a crowd, keeps the trucker silhouette."],
              [product.collection === "snake-skin" ? "Snakeskin texture" : "Structured front", product.collection === "snake-skin" ? "Textured front panels in the colorway. No two photos catch it the same." : "Front panels that stand up straight, wear after wear."],
            ].map(([t, d]) => (
              <li key={t} className="reveal border-t border-white/15 pt-5">
                <h3 className="text-[22px] font-semibold">{t}</h3>
                <p className="body-copy mt-2">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="gutter mx-auto mt-24 max-w-[1600px] md:mt-36">
        <FitGuide />
      </div>

      <section className="gutter mx-auto mt-24 max-w-[1600px] md:mt-36" aria-labelledby="proof-title">
        <h2 id="proof-title" className="eyebrow">Worn by the scene</h2>
        <p className="display mt-4 text-[11vw] md:text-[5vw]">
          {PROOF.internationalArtists} international artists. {PROOF.nibiruCaps.toLocaleString("en-US")}+ caps at Nibiru.
        </p>
      </section>

      {/* REAL REVIEWS GO HERE. Do not add invented reviews or testimonials. */}
      <section className="gutter mx-auto mt-24 max-w-[1600px] md:mt-36" aria-labelledby="reviews-title">
        <h2 id="reviews-title" className="eyebrow">Reviews</h2>
        <div className="mt-4 flex min-h-[160px] items-center justify-center border border-dashed border-white/25 p-8 text-center">
          <p className="font-mono text-[13px] uppercase tracking-[0.12em] text-white/70">Real reviews go here · prototype</p>
        </div>
      </section>

      <section className="gutter mx-auto mb-24 mt-24 max-w-[1600px] md:mt-36" aria-labelledby="more-caps">
        <h2 id="more-caps" className="display text-[12vw] md:text-[5vw]">More shadows.</h2>
        <ul className="mt-8 grid grid-cols-2 gap-2 md:grid-cols-4">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/caps/${o.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image src={o.images[0].src} alt={o.images[0].alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="text-[15px] font-semibold">{o.title}</span>
                  {stockState(o) === "low" && <StockBadge product={o} />}
                </div>
                <span className="font-mono text-[13px] text-white/70">{fmtRON(o.price)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
