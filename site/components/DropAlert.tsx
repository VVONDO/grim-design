"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { EmailForm } from "./EmailForm";
import { Close } from "./Icons";

const SEEN = "grim-drop-alert-seen";

/** Shows once per session, after 20s or on exit intent (desktop). Calm copy, no pressure. */
export function DropAlert() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/checkout")) return;
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(SEEN) === "1";
    } catch {}
    if (seen) return;
    const trigger = () => {
      try {
        window.sessionStorage.setItem(SEEN, "1");
      } catch {}
      setShow(true);
      cleanup();
    };
    const t = window.setTimeout(trigger, 20000);
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) trigger();
    };
    document.documentElement.addEventListener("mouseleave", onLeave);
    const cleanup = () => {
      clearTimeout(t);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
    return cleanup;
  }, [pathname]);

  useEffect(() => {
    if (!show) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShow(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show]);

  if (!show) return null;
  return (
    <div
      role="dialog"
      aria-label="Drop alerts"
      className="fixed inset-x-3 bottom-3 z-50 border border-white/15 bg-ink p-5 shadow-2xl animate-[rise-in_.5s_cubic-bezier(.2,.7,0,1)] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[400px]"
    >
      <button onClick={() => setShow(false)} aria-label="Close" className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center text-white/80">
        <Close size={20} />
      </button>
      <p className="eyebrow">Next drop</p>
      <p className="display mt-2 text-[36px]">Be first in line.</p>
      <p className="mt-2 text-[15px] text-bone">One email when a drop lands. That&apos;s it.</p>
      <div className="mt-4">
        <EmailForm cta="Notify me" done="Locked in." />
      </div>
    </div>
  );
}
