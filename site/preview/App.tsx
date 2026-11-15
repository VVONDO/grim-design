import { useEffect, useSyncExternalStore } from "react";
import { createRoot } from "react-dom/client";
import Home from "@/app/page";
import CapsPage from "@/app/caps/page";
import { CheckoutDemo } from "@/app/checkout/CheckoutDemo";
import { ProductView } from "@/components/product/ProductView";
import { getProduct } from "@/lib/products";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { DropAlert } from "@/components/DropAlert";
import { Motion } from "@/components/Motion";
import { routeOf } from "./stubs/next-navigation";

const sub = (cb: () => void) => { window.addEventListener("hashchange", cb); return () => window.removeEventListener("hashchange", cb); };
const HOME_SECTIONS = new Set(["story", "snake-skin", "og"]);

function View({ route }: { route: string }) {
  if (route === "caps") return <CapsPage />;
  if (route === "checkout") return <CheckoutDemo />;
  if (route.startsWith("cap-")) {
    const p = getProduct(route.slice(4));
    if (p) return <ProductView product={p} />;
  }
  return <Home />;
}

function App() {
  const route = useSyncExternalStore(sub, routeOf, () => "home");
  const page = HOME_SECTIONS.has(route) ? "home" : route;
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number | HTMLElement, o?: object) => void } }).__lenis;
    if (HOME_SECTIONS.has(route)) {
      requestAnimationFrame(() => document.getElementById(route)?.scrollIntoView());
    } else {
      if (lenis) lenis.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    }
    const titles: Record<string, string> = { caps: "All caps", checkout: "Checkout (demo)" };
    const p = route.startsWith("cap-") ? getProduct(route.slice(4)) : undefined;
    document.title = p ? `${p.title} | GRIM` : titles[route] ? `${titles[route]} | GRIM` : "GRIM Prototype";
  }, [route]);
  return (
    <CartProvider>
      <Header />
      <main id="main" key={page} className="page-in">
        <View route={page} />
      </main>
      <Footer />
      <CartDrawer />
      <DropAlert />
      <Motion />
    </CartProvider>
  );
}

createRoot(document.getElementById("grim-root")!).render(<App />);
