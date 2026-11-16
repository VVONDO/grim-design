"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "@/lib/products";
import { HOTSPOTS } from "@/lib/experience";
import { usePinProgress } from "../home/HomeStage";
import type { Shot, ViewerCtl } from "../three/ViewerCanvas";
import { BuyBox } from "./BuyBox";

const ViewerCanvas = dynamic(() => import("../three/ViewerCanvas"), { ssr: false });

// Scroll bands of the pinned section: free view, then one band per hotspot, then back out.
const BANDS = [0.18, 0.44, 0.7, 0.94];
const bandOf = (r: number) => (r < BANDS[0] ? 0 : r < BANDS[1] ? 1 : r < BANDS[2] ? 2 : r < BANDS[3] ? 3 : 0);
const CENTER = [0, 0.31, 0.57, 0.82];

/** Desktop product stage: 3D viewer on the left, sticky buy box on the right. */
export function ProductStage({ product, siblings, onSelect, modelUrl, crumbs }: { product: Product; siblings: Product[]; onSelect: (slug: string) => void; modelUrl?: string; crumbs: React.ReactNode }) {
  const wrap = useRef<HTMLElement>(null);
  const ctl = useRef<ViewerCtl>({ angle: 0, dragging: false, focus: 0, px: 0, py: 0, pulse: 0 });
  const [focus, setFocus] = useState(0);
  const hotspots = HOTSPOTS[product.slug] ?? [];
  const shots: Shot[] = useMemo(
    () => [product.images[0], product.swatch, ...product.images.slice(1)].map((i) => ({ src: i.src, w: i.w, h: i.h })),
    [product],
  );

  usePinProgress(wrap, (r) => {
    const f = hotspots.length ? bandOf(r) : 0;
    if (f !== ctl.current.focus) {
      ctl.current.focus = f;
      setFocus(f);
    }
  });

  const goTo = (k: number) => {
    const el = wrap.current;
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY + (el.offsetHeight - window.innerHeight) * CENTER[k];
    const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number, o?: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(y, { duration: 0.9 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  // Drag to rotate.
  const drag = useRef<{ x: number; a: number } | null>(null);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      ctl.current.px = ((e.clientX - r.left) / r.width) * 2 - 1;
      ctl.current.py = -(((e.clientY - r.top) / r.height) * 2 - 1);
      if (drag.current) ctl.current.angle = drag.current.a - (e.clientX - drag.current.x) / 240;
    };
    const up = () => {
      drag.current = null;
      ctl.current.dragging = false;
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  const active = focus > 0 ? hotspots[focus - 1] : undefined;

  return (
    <section ref={wrap} className="relative h-[300vh]" aria-label={product.title}>
      <div className="sticky top-0 grid h-screen grid-cols-[1.45fr_1fr] overflow-hidden">
        <div
          ref={box}
          data-fly-origin
          className="relative cursor-grab touch-pan-y select-none active:cursor-grabbing [mask-image:linear-gradient(to_right,#000_82%,transparent)]"
          onPointerDown={(e) => {
            if ((e.target as HTMLElement).closest("button,a")) return;
            drag.current = { x: e.clientX, a: ctl.current.angle };
            ctl.current.dragging = true;
          }}
        >
          <ViewerCanvas shots={shots} hotspots={hotspots} ctl={ctl} onFocus={goTo} modelUrl={modelUrl} />
          <div className="gutter pointer-events-none absolute inset-x-0 top-20">{crumbs}</div>

          <div className="gutter pointer-events-none absolute inset-x-0 bottom-8 flex items-end justify-between gap-8">
            {hotspots.length > 0 && (
              <div className="pointer-events-auto max-w-[360px]">
                <div className="min-h-[92px]" aria-live="polite">
                  {active ? (
                    <div key={active.id} className="animate-[rise-in_.4s_ease-out]">
                      <p className="display text-[2.6vw]">{active.title}</p>
                      <p className="body-copy mt-1 text-[15px]">{active.text}</p>
                    </div>
                  ) : (
                    <p className="eyebrow pt-16">Drag to rotate · Scroll for details</p>
                  )}
                </div>
                <ol className="mt-4 flex gap-2">
                  {hotspots.map((h, k) => (
                    <li key={h.id}>
                      <button
                        type="button"
                        onClick={() => goTo(k + 1)}
                        aria-pressed={focus === k + 1}
                        className={`flex items-center gap-2 border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.1em] transition ${focus === k + 1 ? "border-white bg-white text-ink" : "border-white/30 text-white/80 hover:border-white"}`}
                      >
                        <span>{String(k + 1).padStart(2, "0")}</span>
                        {h.title}
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center pl-6 pr-[var(--gutter)] pt-16">
          <div className="w-full max-w-[460px]">
            <BuyBox product={product} siblings={siblings} compact onSelect={onSelect} onAdded={() => (ctl.current.pulse = 1)} />
          </div>
        </div>
      </div>
    </section>
  );
}
