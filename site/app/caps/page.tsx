import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { byCollection, COLLECTIONS, type Product } from "@/lib/products";
import { fmtRON } from "@/lib/site";
import { breadcrumbLd, JsonLd } from "@/lib/jsonld";
import { StockBadge } from "@/components/StockBadge";
import { CapPlaceholder } from "@/components/CapPlaceholder";
import { ShippingInfo } from "@/components/ShippingInfo";

export const metadata: Metadata = {
  title: "All Caps: Snakeskin & Trap Trucker Caps",
  description:
    "Shop every GRIM cap: SNAKE SKIN snakeskin trucker caps (249 RON) and the OG collection (219 RON). Streetwear caps worn by rappers, from a Romanian streetwear brand. 1–2 day delivery.",
  alternates: { canonical: "/caps" },
  openGraph: { title: "All GRIM caps", url: "/caps" },
};

function Card({ p, priority }: { p: Product; priority?: boolean }) {
  return (
    <li>
      <Link href={`/caps/${p.slug}`} className="group block">
        <div className="relative aspect-[4/5] overflow-hidden bg-white/[0.03]">
          {p.hasPhoto ? (
            <Image src={p.images[0].src} alt={p.images[0].alt} fill priority={priority} sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
          ) : (
            <CapPlaceholder />
          )}
        </div>
        <div className="mt-3">
          <StockBadge product={p} />
        </div>
        <h3 className="mt-2 text-[16px] font-semibold leading-tight md:text-[18px]">{p.title}</h3>
        <p className="mt-1 font-mono text-[13px] text-white/70">{fmtRON(p.price)}</p>
      </Link>
    </li>
  );
}

export default function CapsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Caps", path: "/caps" }])} />
      <div className="gutter mx-auto max-w-[1600px] pb-24 pt-28 md:pt-36">
        <p className="eyebrow">Shop</p>
        <h1 className="display mt-4 text-[22vw] md:text-[12vw]">All caps.</h1>
        <div className="mt-6 max-w-[520px]">
          <ShippingInfo compact />
        </div>

        {(["snake-skin", "og"] as const).map((c, ci) => (
          <section key={c} className="mt-20" aria-labelledby={`h-${c}`}>
            <div className="flex items-end justify-between border-b border-white/15 pb-4">
              <h2 id={`h-${c}`} className="display text-[14vw] md:text-[6vw]">{COLLECTIONS[c].name}</h2>
              <span className="font-mono text-[13px] text-white/70">{fmtRON(COLLECTIONS[c].price)}</span>
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-x-2 gap-y-10 lg:grid-cols-3">
              {byCollection(c).map((p, k) => (
                <Card key={p.slug} p={p} priority={ci === 0 && k < 2} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
