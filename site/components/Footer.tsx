import Link from "next/link";
import { SITE } from "@/lib/site";
import { Insta, Store } from "./Icons";
import { ShippingInfo } from "./ShippingInfo";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="gutter border-t border-white/10 pb-28 pt-16 md:pb-12">
      <div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo className="h-14 w-auto" />
          <p className="mt-4 font-display text-[28px] font-extrabold uppercase leading-none">wear your shadow</p>
        </div>

        <div>
          <h2 className="eyebrow">Find us</h2>
          <ul className="mt-4 space-y-3 text-[15px]">
            <li>
              <a href={SITE.instagram} className="link-underline inline-flex items-center gap-2" rel="noopener">
                <Insta size={18} /> {SITE.instagramHandle}
              </a>
            </li>
            <li className="flex items-center gap-2 text-bone">
              <Store size={18} /> In store: {SITE.store}
            </li>
            <li className="text-bone">Official partner: {SITE.festival}</li>
          </ul>
        </div>

        <div>
          <h2 className="eyebrow">Shipping &amp; returns</h2>
          <div className="mt-4">
            <ShippingInfo compact />
          </div>
        </div>

        <div>
          <h2 className="eyebrow">Shop</h2>
          <ul className="mt-4 space-y-3 text-[15px]">
            <li><Link className="link-underline" href="/caps">All caps</Link></li>
            <li><Link className="link-underline" href="/#snake-skin">SNAKE SKIN</Link></li>
            <li><Link className="link-underline" href="/#og">OG</Link></li>
            <li className="text-bone">Contact: {SITE.email}</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-[1600px] flex-col gap-2 border-t border-white/10 pt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-white/60 md:flex-row md:justify-between">
        <span>© {new Date().getFullYear()} GRIM · Romania</span>
        <span>Prototype · not a real store · no payments</span>
      </div>
    </footer>
  );
}
