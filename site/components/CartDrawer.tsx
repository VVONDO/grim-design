"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { fmtRON } from "@/lib/site";
import { useCart } from "./CartProvider";
import { Close } from "./Icons";
import { ShippingInfo } from "./ShippingInfo";
import { CapPlaceholder } from "./CapPlaceholder";

export function CartDrawer() {
  const { open, setOpen, lines, subtotal, setQty, remove } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Cart">
      <button aria-label="Close cart" className="absolute inset-0 bg-black/70 animate-[fade-in_.25s_ease]" onClick={() => setOpen(false)} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col bg-ink border-l border-white/10 animate-[drawer-in_.35s_cubic-bezier(.2,.7,0,1)]">
        <div className="flex h-16 items-center justify-between px-5 border-b border-white/10">
          <h2 className="display text-[28px]">Your cart</h2>
          <button ref={closeRef} onClick={() => setOpen(false)} aria-label="Close cart" className="flex h-11 w-11 items-center justify-center">
            <Close size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4" data-lenis-prevent>
          {lines.length === 0 ? (
            <div className="py-16 text-center">
              <p className="display text-[40px]">Empty.</p>
              <p className="mt-3 text-bone">Nothing on your head yet.</p>
              <Link href="/caps" onClick={() => setOpen(false)} className="btn-ghost mt-8">See the caps</Link>
            </div>
          ) : (
            <ul className="divide-y divide-white/10">
              {lines.map(({ slug, qty, product }) => (
                <li key={slug} className="flex gap-4 py-4">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-white/5">
                    {product.hasPhoto ? (
                      <Image src={product.swatch.src} alt={product.swatch.alt} fill sizes="96px" className="object-cover" />
                    ) : (
                      <CapPlaceholder small />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <Link href={`/caps/${slug}`} onClick={() => setOpen(false)} className="font-semibold leading-tight">
                      {product.title}
                    </Link>
                    <span className="mt-1 font-mono text-[13px] text-white/70">{fmtRON(product.price)}</span>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center border border-white/30">
                        <button className="h-9 w-9" aria-label={`Decrease ${product.title}`} onClick={() => setQty(slug, qty - 1)}>−</button>
                        <span className="w-8 text-center font-mono text-sm" aria-live="polite">{qty}</span>
                        <button
                          className="h-9 w-9 disabled:opacity-30"
                          aria-label={`Increase ${product.title}`}
                          disabled={qty >= product.stock}
                          onClick={() => setQty(slug, qty + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button onClick={() => remove(slug)} className="link-underline text-sm text-white/70">Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="space-y-4 border-t border-white/10 px-5 py-5">
            <ShippingInfo compact />
            <div className="flex items-baseline justify-between pt-2">
              <span className="text-bone">Subtotal</span>
              <span className="font-mono text-lg">{fmtRON(subtotal)}</span>
            </div>
            <Link href="/checkout" onClick={() => setOpen(false)} className="btn-primary w-full">
              Checkout
            </Link>
            <p className="text-center font-mono text-[11px] uppercase tracking-[0.12em] text-white/60">Prototype · no real payments</p>
          </div>
        )}
      </aside>
    </div>
  );
}
