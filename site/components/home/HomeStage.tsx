"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { stage } from "@/lib/stage";

const HomeCanvas = dynamic(() => import("../three/HomeCanvas"), { ssr: false });

/**
 * Holds the home page's single WebGL canvas. The canvas is fixed to the viewport and
 * "rides" whichever pinned section (hero or story) is on screen; it sleeps otherwise.
 */
export function HomeStage({ children, modelUrl, artists }: { children: React.ReactNode; modelUrl?: string; artists: Record<string, string> }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const sync = () => {
      const vh = window.innerHeight;
      let top = 0;
      let which: "hero" | "story" | null = null;
      for (const [name, el] of [["hero", stage.heroEl], ["story", stage.storyEl]] as const) {
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.bottom > 0 && r.top < vh) {
          which = name;
          top = r.top;
          break;
        }
      }
      const w = wrap.current;
      if (w) {
        w.style.visibility = which ? "visible" : "hidden";
        w.style.transform = `translate3d(0,${top}px,0)`;
      }
      if (which) stage.scene = which;
      setActive(!!which);
    };
    const move = (e: PointerEvent) => {
      stage.px = (e.clientX / window.innerWidth) * 2 - 1;
      stage.py = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    sync();
    const id = window.setTimeout(sync, 300);
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      clearTimeout(id);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <>
      <div ref={wrap} className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        <HomeCanvas active={active} modelUrl={modelUrl} artists={artists} />
      </div>
      {children}
    </>
  );
}

/** Scroll progress (0..1) of a tall pinned section, via GSAP ScrollTrigger. */
export function usePinProgress(ref: React.RefObject<HTMLElement | null>, onProgress: (p: number) => void) {
  const cb = useRef(onProgress);
  cb.current = onProgress;
  useEffect(() => {
    let kill = () => {};
    let dead = false;
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (dead || !ref.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const t = ScrollTrigger.create({ trigger: ref.current, start: "top top", end: "bottom bottom", onUpdate: (self) => cb.current(self.progress), onRefresh: (self) => cb.current(self.progress) });
      kill = () => t.kill();
    })();
    return () => {
      dead = true;
      kill();
    };
  }, [ref]);
}
