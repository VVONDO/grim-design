"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { loadGsap } from "../Motion";
import { Arrow } from "../Icons";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const img = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLDivElement>(null);
  const after = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    loadGsap().then((g) => {
      if (!g || !root.current) return;
      const { gsap } = g;
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.6 },
        });
        // Push into the cap: zoom toward the embroidered logo with a slight turn.
        tl.to(img.current, { scale: 1.35, rotate: -3, yPercent: 6, ease: "none" }, 0)
          .to(title.current, { yPercent: -30, opacity: 0, ease: "none" }, 0)
          .fromTo(after.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "none" }, 0.55);
      }, root);
    });
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={root} className="relative h-[200svh]" aria-labelledby="hero-title">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div ref={img} className="absolute inset-0 origin-[50%_22%] will-change-transform">
          <Image
            src="/assets/snake-skin-natural-black-cap-worn-front.webp"
            alt="GRIM natural snakeskin trucker cap, head bowed, a python draped over black"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-[50%_20%]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,transparent_30%,rgba(10,10,10,0.85)_80%)]" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink via-ink/70 to-transparent" />

        <div ref={title} className="gutter absolute inset-x-0 bottom-0 mx-auto max-w-[1600px] pb-10 md:pb-16">
          <p className="eyebrow mb-4">GRIM · Romanian streetwear caps</p>
          <h1 id="hero-title" className="display text-[22vw] md:text-[13vw] lg:text-[11.5vw]">
            wear your
            <br />
            shadow
          </h1>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/caps" className="btn-primary sm:min-w-[220px]">
              Shop now <Arrow size={18} />
            </Link>
            <span className="font-mono text-[13px] text-white/70">SNAKE SKIN · 249 RON</span>
          </div>
        </div>

        <p ref={after} className="gutter display pointer-events-none absolute inset-x-0 bottom-[10%] text-center text-[13vw] opacity-0 md:text-[7vw]" aria-hidden>
          Not a cap. A statement.
        </p>
      </div>
    </section>
  );
}
