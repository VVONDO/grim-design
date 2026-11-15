"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/products";
import { fmtRON } from "@/lib/site";
import { loadGsap } from "../Motion";
import { StockBadge } from "../StockBadge";
import { CapPlaceholder } from "../CapPlaceholder";
import { Arrow } from "../Icons";

/**
 * Apple-style product stage: one big image, a color switcher that swaps the cap.
 * With `scrollDriven`, the stage is pinned and scrolling walks through the colorways.
 */
export function ColorStage({ products, scrollDriven = false, label }: { products: Product[]; scrollDriven?: boolean; label: string }) {
  const [i, setI] = useState(0);
  const [pinned, setPinned] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const st = useRef<{ start: number; end: number } | null>(null);
  const p = products[i];

  useEffect(() => {
    if (!scrollDriven) return;
    let ctx: { revert: () => void } | undefined;
    loadGsap().then((g) => {
      if (!g || !wrap.current) return;
      setPinned(true);
      ctx = g.gsap.context(() => {
        const t = g.ScrollTrigger.create({
          trigger: wrap.current,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => setI(Math.min(products.length - 1, Math.floor(self.progress * products.length))),
          onRefresh: (self) => (st.current = { start: self.start, end: self.end }),
        });
        st.current = { start: t.start, end: t.end };
      });
      requestAnimationFrame(() => g.ScrollTrigger.refresh());
    });
    return () => ctx?.revert();
  }, [scrollDriven, products.length]);

  const pick = (k: number) => {
    if (pinned && st.current) {
      const { start, end } = st.current;
      const y = start + ((k + 0.5) / products.length) * (end - start);
      const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number, o?: object) => void } }).__lenis;
      if (lenis) lenis.scrollTo(y, { duration: 0.9 });
      else window.scrollTo({ top: y, behavior: "smooth" });
    }
    setI(k);
  };

  return (
    <div ref={wrap} style={pinned ? { height: `${products.length * 70 + 30}svh` } : undefined} className="relative">
      <div className={pinned ? "sticky top-0 h-[100svh] overflow-hidden" : "relative"}>
        <div className="gutter mx-auto grid h-full max-w-[1600px] grid-rows-[1fr_auto] gap-4 pb-6 pt-20 md:grid-cols-[1.15fr_1fr] md:grid-rows-1 md:items-center md:gap-16 md:py-16">
          {/* Image */}
          <div className={`relative w-full overflow-hidden ${pinned ? "h-full min-h-0" : "aspect-[4/5]"} md:h-[78svh] md:aspect-auto`}>
            {products.map((q, k) =>
              q.hasPhoto ? (
                <Image
                  key={q.slug}
                  src={q.images[0].src}
                  alt={q.images[0].alt}
                  fill
                  sizes="(min-width: 768px) 55vw, 100vw"
                  loading="lazy"
                  className={`object-cover object-[50%_12%] transition-[opacity,transform] duration-700 ease-[cubic-bezier(.2,.7,0,1)] ${k === i ? "opacity-100 scale-100" : "opacity-0 scale-[1.04]"}`}
                  aria-hidden={k !== i}
                />
              ) : (
                <div key={q.slug} className={`transition-opacity duration-700 ${k === i ? "opacity-100" : "opacity-0"}`} aria-hidden={k !== i}>
                  <CapPlaceholder />
                </div>
              ),
            )}
          </div>

          {/* Info + switcher */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <StockBadge product={p} />
              <span className="font-mono text-[13px] text-white/70">{fmtRON(p.price)}</span>
            </div>
            <h3 className="display mt-3 text-[13vw] md:text-[5.2vw]" aria-live="polite">
              {p.colorway}
            </h3>
            <p className="mt-2 min-h-[3em] text-[18px] leading-snug text-bone md:text-[22px]">{p.tagline}</p>

            <div className="mt-5 flex flex-wrap gap-2" role="radiogroup" aria-label={`${label} colorways`}>
              {products.map((q, k) => (
                <button
                  key={q.slug}
                  role="radio"
                  aria-checked={k === i}
                  aria-label={q.colorway}
                  onClick={() => pick(k)}
                  className={`relative h-12 w-12 overflow-hidden rounded-full border-2 transition md:h-14 md:w-14 ${k === i ? "border-white" : "border-transparent opacity-70 hover:opacity-100"}`}
                >
                  {q.hasPhoto ? (
                    <Image src={q.swatch.src} alt="" fill sizes="56px" className="scale-[1.6] object-cover object-[50%_30%]" />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center bg-white/10 font-mono text-[10px]">{q.name.replace(/[“”]/g, "").slice(0, 3)}</span>
                  )}
                </button>
              ))}
            </div>

            <Link href={`/caps/${p.slug}`} className="btn-ghost mt-6 self-start">
              View {p.colorway} <Arrow size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
