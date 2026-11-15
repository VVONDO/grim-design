"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { stockState, type Product } from "@/lib/products";
import { fmtRON } from "@/lib/site";
import { useCart } from "../CartProvider";
import { StockBadge } from "../StockBadge";
import { ShippingInfo } from "../ShippingInfo";
import { EmailForm } from "../EmailForm";

export function BuyBox({ product, siblings }: { product: Product; siblings: Product[] }) {
  const { add } = useCart();
  const state = stockState(product);
  const btn = useRef<HTMLDivElement>(null);
  const [btnVisible, setBtnVisible] = useState(true);
  const [added, setAdded] = useState(false);

  // Mobile sticky bar shows whenever the main button is off-screen.
  useEffect(() => {
    if (!btn.current) return;
    const io = new IntersectionObserver(([e]) => setBtnVisible(e.isIntersecting), { threshold: 0 });
    io.observe(btn.current);
    return () => io.disconnect();
  }, []);

  const onAdd = () => {
    add(product.slug, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div>
      {/* Availability first, then name, then price */}
      <div className="flex items-center gap-3">
        <StockBadge product={product} large />
        {state === "low" && <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/60">demo data</span>}
      </div>
      <h1 className="display mt-4 text-[15vw] md:text-[5vw]">
        <span className="block text-[0.45em] text-white/70">{product.name}</span>
        {product.colorway}
      </h1>
      <p className="mt-3 text-[19px] leading-snug text-bone">{product.tagline}</p>
      <p className="mt-5 font-mono text-[22px]">{fmtRON(product.price)}</p>

      {siblings.length > 1 && (
        <fieldset className="mt-7">
          <legend className="eyebrow">Color · {product.colorway}</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {siblings.map((s) => {
              const current = s.slug === product.slug;
              return (
                <Link
                  key={s.slug}
                  href={`/caps/${s.slug}`}
                  scroll={false}
                  aria-current={current ? "true" : undefined}
                  aria-label={`${s.colorway}${stockState(s) === "out" ? ", sold out" : ""}`}
                  className={`relative h-14 w-14 overflow-hidden rounded-full border-2 ${current ? "border-white" : "border-transparent opacity-75 hover:opacity-100"}`}
                >
                  {s.hasPhoto ? (
                    <Image src={s.swatch.src} alt="" fill sizes="56px" className="scale-[1.6] object-cover object-[50%_30%]" />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center bg-white/10 font-mono text-[10px]">{s.name.replace(/[“”]/g, "").slice(0, 3)}</span>
                  )}
                  {stockState(s) === "out" && <span className="absolute inset-0 bg-[linear-gradient(135deg,transparent_47%,rgba(255,255,255,.8)_48%,rgba(255,255,255,.8)_52%,transparent_53%)]" aria-hidden />}
                </Link>
              );
            })}
          </div>
        </fieldset>
      )}

      <div ref={btn} className="mt-8">
        {state === "out" ? (
          <div>
            <p className="mb-3 text-[16px] text-bone">Sold out. Get one email when it&apos;s back.</p>
            <EmailForm cta="Notify me" done="We’ll tell you when it’s back." />
          </div>
        ) : (
          <button type="button" onClick={onAdd} className="btn-primary w-full" aria-live="polite">
            {added ? "Added ✓" : `Add to cart · ${fmtRON(product.price)}`}
          </button>
        )}
      </div>

      {/* Shipping & returns right under the button */}
      <div className="mt-6 border-t border-white/10 pt-6">
        <ShippingInfo />
      </div>

      <dl className="mt-8 divide-y divide-white/10 border-y border-white/10 text-[15px]">
        {[
          ["Size", "One size · adjustable strap"],
          ["Logo", "3D embroidered GRIM logo"],
          ["Front", product.collection === "snake-skin" ? "Snakeskin-textured panels" : "Structured front panels"],
          ["Back", "Black mesh"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 py-3">
            <dt className="text-white/70">{k}</dt>
            <dd className="text-right">{v}</dd>
          </div>
        ))}
      </dl>

      {/* Mobile sticky CTA */}
      <div
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-ink/95 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur transition-transform duration-300 md:hidden ${
          btnVisible ? "translate-y-full" : "translate-y-0"
        }`}
        aria-hidden={btnVisible}
      >
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-semibold">{product.title}</p>
            <p className="font-mono text-[12px] text-white/70">{fmtRON(product.price)} · 1–2 day delivery</p>
          </div>
          {state === "out" ? (
            <button type="button" tabIndex={btnVisible ? -1 : 0} onClick={() => btn.current?.scrollIntoView({ behavior: "smooth", block: "center" })} className="btn-ghost min-h-[48px] px-5">
              Notify me
            </button>
          ) : (
            <button type="button" tabIndex={btnVisible ? -1 : 0} onClick={onAdd} className="btn-primary min-h-[48px] px-5">
              {added ? "Added ✓" : "Add to cart"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
