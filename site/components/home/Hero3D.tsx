"use client";

import { href } from "@/lib/links";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { stage } from "@/lib/stage";
import { HERO_CAPS } from "@/lib/experience";
import { getProduct } from "@/lib/products";
import { Arrow } from "../Icons";
import { usePinProgress } from "./HomeStage";

const sm = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** Pinned hero. The 3D lives in the shared canvas (HeroScene); this is the text on top of it. */
export function Hero3D() {
  const wrap = useRef<HTMLElement>(null);
  const sticky = useRef<HTMLDivElement>(null);
  const tag = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLParagraphElement>(null);
  const callout = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const cta = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState(0);
  const shown = useRef(0);

  usePinProgress(wrap, (p) => (stage.hero = p));

  useEffect(() => {
    stage.heroEl = sticky.current;
    stage.onHero = (p, c, L) => {
      const set = (el: HTMLElement | null, o: number, y = 0) => {
        if (!el) return;
        el.style.opacity = o.toFixed(3);
        el.style.transform = `translate3d(0,${y.toFixed(1)}px,0)`;
        el.style.pointerEvents = o > 0.6 ? "auto" : "none";
      };
      const intro = sm(0.75, 1, L);
      set(tag.current, intro * (1 - sm(0.03, 0.14, p)), (1 - intro) * 24 - sm(0.03, 0.14, p) * 40);
      set(hint.current, intro * (1 - sm(0.01, 0.06, p)));
      set(callout.current, sm(0.36, 0.42, p) * (1 - sm(0.49, 0.54, p)));
      set(label.current, sm(0.56, 0.62, p), (1 - sm(0.56, 0.62, p)) * 24);
      set(cta.current, sm(0.9, 0.97, p), (1 - sm(0.9, 0.97, p)) * 24);
      if (c !== shown.current) {
        shown.current = c;
        setColor(c);
      }
    };
    return () => {
      stage.heroEl = null;
      stage.onHero = null;
    };
  }, []);

  const cap = HERO_CAPS[color];
  const product = getProduct(cap.slug);

  return (
    <section ref={wrap} className="relative h-[400vh]" aria-labelledby="hero-title">
      <div ref={sticky} className="sticky top-0 h-screen overflow-hidden">
        <div ref={tag} className="absolute inset-x-0 bottom-[9vh] text-center" style={{ opacity: 0 }}>
          <h1 id="hero-title" className="display text-[5.4vw]">wear your shadow</h1>
          <p className="eyebrow mt-4">GRIM · Romanian streetwear caps</p>
        </div>
        <p ref={hint} className="eyebrow absolute bottom-5 left-1/2 -translate-x-1/2" style={{ opacity: 0 }} aria-hidden>
          Scroll
        </p>

        <div ref={callout} className="absolute left-[7vw] top-1/2 max-w-[300px] -translate-y-1/2 border-l border-white/40 pl-5" style={{ opacity: 0 }} aria-hidden>
          <p className="eyebrow">Up close</p>
          <p className="display mt-2 text-[3vw]">3D embroidery</p>
          <p className="body-copy mt-2 text-[15px]">The logo stands off the panel. You can feel it.</p>
        </div>

        <div ref={label} className="absolute bottom-[9vh] left-[7vw] max-w-[420px]" style={{ opacity: 0 }}>
          <p className="eyebrow">
            SNAKE SKIN · {String(color + 1).padStart(2, "0")} / {String(HERO_CAPS.length).padStart(2, "0")}
          </p>
          <p className="display mt-2 text-[5.4vw]" aria-live="polite">{cap.color}/Black</p>
          <p className="mt-2 text-[18px] text-bone">{product?.tagline}</p>
        </div>

        <div ref={cta} className="absolute inset-x-0 bottom-[9vh] flex flex-col items-center gap-4" style={{ opacity: 0, pointerEvents: "none" }}>
          <Link href={href.caps} className="btn-primary min-w-[240px]">
            Shop now <Arrow size={18} />
          </Link>
          <span className="font-mono text-[13px] text-white/70">6 colors · 249 RON</span>
        </div>
      </div>
    </section>
  );
}
