"use client";

import { useEffect, useState } from "react";

/**
 * The 3D experience runs on screens >= 768px when motion is allowed.
 * Phones and prefers-reduced-motion get the earlier, static version.
 */
export function useEnhanced() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const f = () => setOn(wide.matches && !calm.matches);
    f();
    wide.addEventListener("change", f);
    calm.addEventListener("change", f);
    return () => {
      wide.removeEventListener("change", f);
      calm.removeEventListener("change", f);
    };
  }, []);
  return on;
}

export function Enhanced({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) {
  return <>{useEnhanced() ? children : fallback}</>;
}
