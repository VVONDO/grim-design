"use client";

import { useEffect, useRef, useState } from "react";
import { PROOF } from "@/lib/site";

const STATS = [
  { n: PROOF.nibiruCaps, suffix: "+", label: "caps sold in 2 months at Nibiru Festival.", sub: "Official partner. 5-year deal." },
  { n: PROOF.onlineOrders2026, suffix: "", label: "online orders in 2026.", sub: "And counting." },
  { n: PROOF.internationalArtists, suffix: "", label: "international artists have interacted with GRIM.", sub: "Future. Quavo. Offset. A$AP Rocky. Ken Carson. Young Thug." },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  // Server renders the real number (SEO, no-JS). The count-up only runs client-side.
  const [v, setV] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let done = false;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) return; // already visible: leave it
    setV(0);
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || done) return;
        done = true;
        const t0 = performance.now();
        const dur = 1600;
        const step = (t: number) => {
          const k = Math.min(1, (t - t0) / dur);
          setV(Math.round(to * (1 - Math.pow(1 - k, 4))));
          if (k < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        io.disconnect();
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);
  return (
    <span ref={ref} className="tabular-nums">
      <span className="sr-only">{`${to.toLocaleString("en-US")}${suffix}`}</span>
      <span aria-hidden>
        {v.toLocaleString("en-US")}
        {suffix}
      </span>
    </span>
  );
}

export function Numbers() {
  return (
    <section aria-labelledby="numbers-title" className="gutter mx-auto max-w-[1600px] py-28 md:py-40">
      <h2 id="numbers-title" className="eyebrow reveal">Proof, not promises</h2>
      <ul className="mt-10">
        {STATS.map((s, k) => (
          <li key={k} className="reveal grid gap-3 border-t border-white/15 py-10 md:grid-cols-[1.2fr_1fr] md:items-end md:py-14">
            <p className="display text-[30vw] leading-[0.8] md:text-[16vw]">
              <Counter to={s.n} suffix={s.suffix} />
            </p>
            <div className="md:pb-6">
              <p className="text-[22px] font-semibold leading-tight md:text-[28px]">{s.label}</p>
              <p className="body-copy mt-2">{s.sub}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-20 border-t border-white/15 pt-14 md:mt-28">
        <p className="eyebrow reveal">The mission</p>
        <p className="display reveal mt-5 text-[13vw] md:text-[7vw]" data-delay="1">
          5 years.
          <br />
          <span className="text-white/45">Every major country.</span>
        </p>
      </div>
    </section>
  );
}
