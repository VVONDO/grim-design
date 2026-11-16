"use client";

import { href } from "@/lib/links";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { stage } from "@/lib/stage";
import { HERO_CAPS } from "@/lib/experience";
import { getProduct, stockState } from "@/lib/products";
import { fmtRON, INTERNATIONAL_ARTISTS, PROOF } from "@/lib/site";
import { StockBadge } from "../StockBadge";
import { usePinProgress } from "./HomeStage";

const LINE = "One cap. One stage. Young Thug.";
const sm = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** Pinned story. The throw, the flash and the drifting cards are in the shared canvas (StoryScene). */
export function Story3D() {
  const wrap = useRef<HTMLElement>(null);
  const sticky = useRef<HTMLDivElement>(null);
  const typedBox = useRef<HTMLParagraphElement>(null);
  const typed = useRef<HTMLSpanElement>(null);
  const count = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);

  usePinProgress(wrap, (q) => (stage.story = q));

  useEffect(() => {
    stage.storyEl = sticky.current;
    let chars = -1;
    let n = -1;
    stage.onStory = (q) => {
      const k = Math.round(Math.min(1, Math.max(0, (q - 0.02) / 0.24)) * LINE.length);
      if (k !== chars && typed.current) {
        chars = k;
        typed.current.textContent = LINE.slice(0, k);
      }
      if (typedBox.current) typedBox.current.style.opacity = (1 - sm(0.46, 0.52, q)).toFixed(3);
      const a = sm(0.54, 0.62, q);
      if (count.current) {
        count.current.style.opacity = a.toFixed(3);
        count.current.style.transform = `translate3d(0,${((1 - a) * 30).toFixed(1)}px,0)`;
      }
      const v = Math.round(sm(0.55, 0.78, q) * PROOF.internationalArtists);
      if (v !== n && num.current) {
        n = v;
        num.current.textContent = String(v);
      }
    };
    return () => {
      stage.storyEl = null;
      stage.onStory = null;
    };
  }, []);

  return (
    <>
      <section ref={wrap} id="story" className="relative h-[300vh] scroll-mt-0" aria-label="The story">
        <div ref={sticky} className="sticky top-0 h-screen overflow-hidden">
          <p className="sr-only">
            {LINE} A GRIM cap thrown on stage at a Young Thug show was the turning point. Since then, {PROOF.internationalArtists} international artists have interacted with GRIM, including{" "}
            {INTERNATIONAL_ARTISTS.join(", ")}.
          </p>
          <p ref={typedBox} className="absolute left-[7vw] top-1/2 -translate-y-1/2 font-mono text-[2.1vw] leading-tight" aria-hidden>
            <span ref={typed} />
            <span className="ml-1 inline-block h-[1em] w-[0.55em] translate-y-[0.15em] animate-pulse bg-white" />
          </p>
          <div ref={count} className="absolute left-[7vw] top-1/2 w-[44vw] -translate-y-1/2" style={{ opacity: 0 }} aria-hidden>
            <div className="-translate-y-1/2">
              <p className="display text-[24vw] leading-[0.78]">
                <span ref={num} className="tabular-nums">0</span>
              </p>
              <p className="display mt-4 text-[4.6vw]">international artists</p>
              <p className="body-copy mt-4 max-w-[440px]">have interacted with GRIM. {INTERNATIONAL_ARTISTS.join(". ")}.</p>
            </div>
          </div>
        </div>
      </section>
      <CapRow />
    </>
  );
}

/** The six SNAKE SKIN caps in a row. Each card tilts in 3D toward the cursor. */
function CapRow() {
  return (
    <section className="gutter relative mx-auto max-w-[1600px] py-28" aria-labelledby="row-title">
      <div className="flex items-end justify-between">
        <h2 id="row-title" className="display text-[6vw]">Pick your skin.</h2>
        <p className="font-mono text-[13px] text-white/70">SNAKE SKIN · {fmtRON(249)}</p>
      </div>
      <ul className="mt-12 grid grid-cols-6 gap-3">
        {HERO_CAPS.map((c) => {
          const p = getProduct(c.slug)!;
          return (
            <li key={c.slug}>
              <TiltCard>
                <Link href={href.cap(c.slug)} className="block border border-white/10 px-3 pb-5 pt-3 [transform-style:preserve-3d]">
                  <div className="relative aspect-square [transform:translateZ(46px)]">
                    <Image src={c.src} alt={`GRIM SNAKE SKIN ${c.color}/Black cap`} fill sizes="16vw" className="object-contain drop-shadow-[0_18px_18px_rgba(0,0,0,0.8)]" />
                  </div>
                  <div className="[transform:translateZ(22px)]">
                    <p className="display text-[1.9vw]">{c.color}</p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <span className="font-mono text-[12px] text-white/70">{fmtRON(p.price)}</span>
                      {stockState(p) === "low" && <StockBadge product={p} />}
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const el = useRef<HTMLDivElement>(null);
  return (
    <div
      className="[perspective:900px]"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        if (el.current) el.current.style.transform = `rotateY(${(x * 22).toFixed(2)}deg) rotateX(${(-y * 18).toFixed(2)}deg) translateZ(10px)`;
      }}
      onPointerLeave={() => {
        if (el.current) el.current.style.transform = "";
      }}
    >
      <div ref={el} className="transition-transform duration-200 ease-out [transform-style:preserve-3d] will-change-transform">
        {children}
      </div>
    </div>
  );
}
