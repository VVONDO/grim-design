"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";
import { Bag } from "./Icons";
import { Logo } from "./Logo";

export function Header() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background,backdrop-filter] duration-300 ${
        scrolled ? "bg-ink/75 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-white focus:px-3 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <nav className="gutter mx-auto flex h-16 max-w-[1600px] items-center justify-between" aria-label="Main">
        <Link href="/" aria-label="GRIM home" className="block">
          <Logo className="h-9 w-auto md:h-10" />
        </Link>
        <div className="flex items-center gap-1 md:gap-6">
          <Link href="/caps" className="link-underline hidden px-2 py-3 text-[15px] font-medium sm:block">Caps</Link>
          <Link href="/#story" className="link-underline hidden px-2 py-3 text-[15px] font-medium sm:block">Story</Link>
          <Link href="/caps" className="px-3 py-3 text-[15px] font-medium sm:hidden">Shop</Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="relative flex h-11 w-11 items-center justify-center"
            aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
          >
            <Bag size={22} />
            {count > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center bg-white px-1 font-mono text-[11px] font-medium text-ink">
                {count}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
