"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { loadGsap } from "../Motion";

const CALLOUTS = [
  { t: "3D embroidery", d: "The GRIM logo stands off the panel. You can feel it." },
  { t: "Snakeskin texture", d: "Textured front panels that catch the light." },
  { t: "Black mesh back", d: "Breathes. Keeps the trucker shape." },
];

/** Scroll pushes the camera into the cap. */
export function DetailZoom() {
  const root = useRef<HTMLElement>(null);
  const img = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    loadGsap().then((g) => {
      if (!g || !root.current) return;
      ctx = g.gsap.context(() => {
        g.gsap.fromTo(
          img.current,
          { scale: 0.7, rotate: 3 },
          { scale: 1.35, rotate: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.5 } },
        );
      }, root);
    });
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={root} aria-labelledby="detail-title" className="relative overflow-hidden py-24 md:py-40">
      <div className="gutter mx-auto max-w-[1600px]">
        <p className="eyebrow reveal">Up close</p>
        <h2 id="detail-title" className="display reveal mt-4 text-[14vw] md:text-[7vw]" data-delay="1">Look closer.</h2>
      </div>
      <div className="relative mx-auto mt-10 aspect-square w-full max-w-[900px] overflow-hidden">
        <div ref={img} className="absolute inset-0 will-change-transform">
          <Image
            src="/assets/snake-skin-natural-black-cap-detail.webp"
            alt="Extreme close-up of the natural snakeskin GRIM cap: 3D embroidered logo, textured panel, black mesh back"
            fill
            sizes="(min-width: 900px) 900px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
      <ul className="gutter mx-auto mt-12 grid max-w-[1600px] gap-8 md:grid-cols-3">
        {CALLOUTS.map((c, k) => (
          <li key={c.t} className="reveal border-t border-white/20 pt-5" data-delay={String(k + 1)}>
            <h3 className="text-[22px] font-semibold">{c.t}</h3>
            <p className="body-copy mt-2">{c.d}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
