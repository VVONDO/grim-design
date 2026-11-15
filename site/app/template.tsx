"use client";

// Page transition: routes fade up on client-side navigation. Skipped on the first load so the
// hero paints immediately (LCP). Disabled by prefers-reduced-motion in CSS.
// The flag only flips in the browser, so server-rendered HTML never carries the class.
let firstClientRender = true;

export default function Template({ children }: { children: React.ReactNode }) {
  const isClient = typeof window !== "undefined";
  const animate = isClient && !firstClientRender;
  if (isClient) firstClientRender = false;
  return <div className={animate ? "page-in" : undefined}>{children}</div>;
}
