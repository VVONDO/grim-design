"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Product } from "@/lib/products";
import { CapPlaceholder } from "../CapPlaceholder";

/** Swipeable on phones (scroll-snap), stacked grid on desktop. Includes a detail close-up. */
export function Gallery({ product }: { product: Product }) {
  const [idx, setIdx] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  if (!product.hasPhoto)
    return (
      <div className="relative aspect-[4/5] w-full bg-white/[0.03]">
        <CapPlaceholder label="Product photo coming" />
      </div>
    );

  const imgs = [product.images[0], { ...product.swatch }, ...product.images.slice(1)];

  return (
    <div>
      {/* Mobile: horizontal snap carousel */}
      <div
        ref={track}
        className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] md:hidden"
        onScroll={(e) => {
          const el = e.currentTarget;
          setIdx(Math.round(el.scrollLeft / el.clientWidth));
        }}
        aria-label={`${product.title} photos`}
        role="region"
        tabIndex={0}
      >
        {imgs.map((im, k) => (
          <div key={im.src + k} className="relative aspect-[4/5] w-full shrink-0 snap-center">
            <Image src={im.src} alt={im.alt} fill priority={k === 0} fetchPriority={k === 0 ? "high" : undefined} sizes="100vw" className="object-cover" />
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-center gap-1.5 md:hidden" aria-hidden>
        {imgs.map((_, k) => (
          <span key={k} className={`h-[3px] transition-all ${k === idx ? "w-6 bg-white" : "w-3 bg-white/30"}`} />
        ))}
      </div>

      {/* Desktop: editorial grid */}
      <div className="hidden gap-2 md:grid md:grid-cols-2">
        {imgs.map((im, k) => (
          <div key={im.src + k} className={`relative overflow-hidden ${k === 0 ? "col-span-2 aspect-[4/5]" : "aspect-[4/5]"}`}>
            <Image src={im.src} alt={im.alt} fill priority={k === 0} sizes={k === 0 ? "60vw" : "30vw"} className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
