"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { ShippingInfo } from "@/components/ShippingInfo";
import { CapPlaceholder } from "@/components/CapPlaceholder";
import { fmtRON, SHIPPING, shippingCostLabel } from "@/lib/site";

export function CheckoutDemo() {
  const { lines, subtotal, clear } = useCart();
  const [done, setDone] = useState(false);
  const free = SHIPPING.freeOverRON !== null && subtotal >= SHIPPING.freeOverRON;
  const shipping = free ? 0 : SHIPPING.costRON;
  const total = shipping === null ? null : subtotal + shipping;

  if (done)
    return (
      <div className="gutter mx-auto flex min-h-[80svh] max-w-[900px] flex-col justify-center pt-24">
        <p className="eyebrow">Demo order</p>
        <h1 className="display mt-4 text-[18vw] md:text-[9vw]">It&apos;s yours.</h1>
        <p className="body-copy mt-4 max-w-[520px]">This is a prototype. No order was created and no payment was taken. Your demo cart has been cleared.</p>
        <Link href="/" className="btn-ghost mt-10 self-start">Back to GRIM</Link>
      </div>
    );

  return (
    <div className="gutter mx-auto max-w-[1200px] pb-24 pt-24 md:pt-32">
      <p className="eyebrow">Checkout</p>
      <h1 className="display mt-3 text-[18vw] md:text-[8vw]">Almost there.</h1>
      <p role="note" className="mt-4 inline-block border border-white/30 px-3 py-2 font-mono text-[12px] uppercase tracking-[0.1em]">
        Demo checkout · no real payments
      </p>

      {lines.length === 0 ? (
        <div className="mt-12">
          <p className="text-bone">Your cart is empty.</p>
          <Link href="/caps" className="btn-ghost mt-6">See the caps</Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-12 md:grid-cols-[1.2fr_1fr]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              clear();
              setDone(true);
              window.scrollTo(0, 0);
            }}
            className="space-y-4"
            aria-label="Delivery details"
          >
            <h2 className="text-[20px] font-semibold">Delivery</h2>
            {[
              ["name", "Full name", "name", "text"],
              ["phone", "Phone", "tel", "tel"],
              ["email", "Email", "email", "email"],
              ["address", "Street address", "street-address", "text"],
              ["city", "City", "address-level2", "text"],
            ].map(([id, label, ac, type]) => (
              <div key={id}>
                <label htmlFor={id} className="mb-1.5 block text-[14px] text-bone">{label}</label>
                <input id={id} name={id} type={type} autoComplete={ac} required className="field" />
              </div>
            ))}
            <div className="pt-2">
              <h2 className="text-[20px] font-semibold">Payment</h2>
              <p className="mt-2 text-[15px] text-bone">Not connected. Placing a demo order takes no money and creates nothing.</p>
            </div>
            <button type="submit" className="btn-primary mt-4 w-full">Place demo order</button>
          </form>

          <aside aria-label="Order summary" className="h-fit border border-white/10 p-5 md:p-6">
            <h2 className="text-[20px] font-semibold">Summary</h2>
            <ul className="mt-4 divide-y divide-white/10">
              {lines.map(({ slug, qty, product }) => (
                <li key={slug} className="flex items-center gap-3 py-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-white/5">
                    {product.hasPhoto ? <Image src={product.swatch.src} alt="" fill sizes="64px" className="object-cover" /> : <CapPlaceholder small />}
                  </div>
                  <div className="flex-1 text-[15px]">
                    <p className="font-semibold leading-tight">{product.title}</p>
                    <p className="font-mono text-[12px] text-white/70">× {qty}</p>
                  </div>
                  <span className="font-mono text-[14px]">{fmtRON(product.price * qty)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-2 border-t border-white/10 pt-4 text-[15px]">
              <div className="flex justify-between"><dt className="text-bone">Subtotal</dt><dd className="font-mono">{fmtRON(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-bone">Shipping</dt><dd className="font-mono">{free ? "Free" : shippingCostLabel()}</dd></div>
              <div className="flex justify-between border-t border-white/10 pt-2 text-[17px] font-semibold"><dt>Total</dt><dd className="font-mono">{total === null ? `${fmtRON(subtotal)} + shipping` : fmtRON(total)}</dd></div>
            </dl>
            <div className="mt-6 border-t border-white/10 pt-5">
              <ShippingInfo compact />
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
