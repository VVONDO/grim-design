// Stand-in for next/navigation: the "path" is the current #hash route.
import { useSyncExternalStore } from "react";
const sub = (cb: () => void) => { window.addEventListener("hashchange", cb); return () => window.removeEventListener("hashchange", cb); };
export const routeOf = () => (typeof window === "undefined" ? "home" : window.location.hash.slice(1) || "home");
export function usePathname() {
  const r = useSyncExternalStore(sub, routeOf, () => "home");
  return r === "checkout" ? "/checkout" : "/" + r;
}
export function notFound(): never { throw new Error("not found"); }
