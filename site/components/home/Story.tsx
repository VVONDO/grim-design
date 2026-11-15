"use client";

import { useEffect, useRef, useState } from "react";
import { FIRST_ARTISTS, INTERNATIONAL_ARTISTS, PROOF } from "@/lib/site";
import { loadGsap } from "../Motion";

const FRAMES = [
  { text: "A show.", red: false },
  { text: "A crowd.", red: false },
  { text: "One GRIM cap.", red: false },
  { text: "Thrown on stage.", red: false },
  { text: "Young Thug.", red: true }, // one of the two red moments on the page
  { text: "That was the turn.", red: false },
];

export function Story() {
  const seq = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    loadGsap().then((g) => {
      if (!g || !seq.current) return;
      setAnimated(true);
      ctx = g.gsap.context(() => {
        g.ScrollTrigger.create({
          trigger: seq.current,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => setActive(Math.min(FRAMES.length - 1, Math.floor(self.progress * FRAMES.length * 1.05) - 0)),
          onLeaveBack: () => setActive(-1),
        });
      });
    });
    return () => ctx?.revert();
  }, []);

  const hidden = INTERNATIONAL_ARTISTS.length < PROOF.internationalArtists ? PROOF.internationalArtists - INTERNATIONAL_ARTISTS.length : 0;

  return (
    <section id="story" aria-labelledby="story-title" className="scroll-mt-16">
      {/* Origin */}
      <div className="gutter mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-center py-24">
        <p className="eyebrow reveal">The story</p>
        <h2 id="story-title" className="display reveal mt-6 text-[14vw] md:text-[7.5vw]" data-delay="1">
          Streetwear.
          <br />
          Rap.
          <br />
          Content.
        </h2>
        <p className="body-copy reveal mt-8 max-w-[620px] text-[20px] md:text-[24px]" data-delay="2">
          GRIM started from a love of all three. The first caps went to Romanian artists.
        </p>
        <ul className="mt-10 flex flex-col gap-2 md:flex-row md:gap-10" aria-label="First artists to wear GRIM">
          {FIRST_ARTISTS.map((a, i) => (
            <li key={a} className="display reveal text-[11vw] text-white/80 md:text-[4.5vw]" data-delay={String(i + 1)}>
              {a}
            </li>
          ))}
        </ul>
      </div>

      {/* The Young Thug moment: a pinned, scroll-driven sequence */}
      <div ref={seq} className={animated ? "relative h-[460svh]" : "relative"} role="region" aria-label="The turning point">
        <div className={animated ? "sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden" : "gutter py-24"}>
          {animated ? (
            <>
              <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-700"
                style={{
                  opacity: active === 4 ? 1 : 0,
                  background: "radial-gradient(ellipse at 50% 55%, rgba(227,16,43,0.28), transparent 60%)",
                }}
                aria-hidden
              />
              <ol className="relative w-full">
                {FRAMES.map((f, i) => (
                  <li
                    key={f.text}
                    aria-hidden={active !== i}
                    className={`display gutter absolute inset-x-0 top-1/2 -translate-y-1/2 text-center transition-all duration-700 ease-[cubic-bezier(.2,.7,0,1)] ${
                      f.red ? "text-blood text-[21vw] md:text-[15vw]" : "text-[15vw] md:text-[9vw]"
                    } ${active === i ? "opacity-100 blur-0 scale-100" : active > i ? "opacity-0 blur-md scale-110" : "opacity-0 blur-md scale-90"}`}
                  >
                    {f.text}
                  </li>
                ))}
              </ol>
              <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2" aria-hidden>
                {FRAMES.map((_, i) => (
                  <span key={i} className={`h-[2px] w-6 transition-colors ${i <= active ? "bg-white" : "bg-white/20"}`} />
                ))}
              </div>
            </>
          ) : (
            <ol className="mx-auto max-w-[1600px] space-y-2">
              {FRAMES.map((f) => (
                <li key={f.text} className={`display text-[13vw] md:text-[7vw] ${f.red ? "text-blood" : ""}`}>
                  {f.text}
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>

      {/* Wall of artists */}
      <div className="gutter mx-auto max-w-[1600px] py-28 md:py-40">
        <p className="eyebrow reveal">Since then</p>
        <p className="display reveal mt-6 text-[13vw] md:text-[6.5vw]" data-delay="1">
          {PROOF.internationalArtists} international artists
          <br />
          <span className="text-white/45">have interacted with GRIM.</span>
        </p>
        <ul className="mt-14 grid grid-cols-1 border-t border-white/10 md:grid-cols-2" aria-label="International artists who have interacted with GRIM">
          {INTERNATIONAL_ARTISTS.map((a, i) => (
            <li key={a} className="reveal flex items-baseline justify-between border-b border-white/10 py-5 md:odd:border-r md:odd:pr-8 md:even:pl-8" data-delay={String((i % 3) + 1)}>
              <span className="display text-[12vw] md:text-[5vw]">{a}</span>
              <span className="font-mono text-[12px] text-white/60">{String(i + 1).padStart(2, "0")}</span>
            </li>
          ))}
          {hidden > 0 && (
            <li className="reveal flex items-baseline justify-between border-b border-white/10 py-5 md:pl-8">
              <span className="display text-[12vw] text-white/45 md:text-[5vw]">+{hidden} more</span>
              <span className="font-mono text-[12px] text-white/60">{String(INTERNATIONAL_ARTISTS.length + 1).padStart(2, "0")}–{PROOF.internationalArtists}</span>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
