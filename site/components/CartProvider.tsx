"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct, type Product } from "@/lib/products";

type Line = { slug: string; qty: number };
type CartCtx = {
  lines: (Line & { product: Product })[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const KEY = "grim-cart-v1";
const Ctx = createContext<CartCtx | null>(null);

function read(): Line[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as Line[]) : [];
    return Array.isArray(parsed) ? parsed.filter((l) => getProduct(l.slug) && l.qty > 0) : [];
  } catch {
    return [];
  }
}
function write(lines: Line[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(lines));
  } catch {
    /* storage blocked: cart lives in memory only */
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [raw, setRaw] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setRaw(read());
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) write(raw);
  }, [raw, ready]);

  // Never let the cart hold more than (demo) stock.
  const cap = (slug: string, qty: number) => Math.max(0, Math.min(qty, getProduct(slug)?.stock ?? 0));

  const add = useCallback((slug: string, qty = 1) => {
    setRaw((prev) => {
      const ex = prev.find((l) => l.slug === slug);
      if (ex) return prev.map((l) => (l.slug === slug ? { ...l, qty: cap(slug, l.qty + qty) } : l));
      const q = cap(slug, qty);
      return q > 0 ? [...prev, { slug, qty: q }] : prev;
    });
    setOpen(true);
  }, []);
  const setQty = useCallback((slug: string, qty: number) => {
    setRaw((prev) => (qty <= 0 ? prev.filter((l) => l.slug !== slug) : prev.map((l) => (l.slug === slug ? { ...l, qty: cap(slug, qty) } : l))));
  }, []);
  const remove = useCallback((slug: string) => setRaw((prev) => prev.filter((l) => l.slug !== slug)), []);
  const clear = useCallback(() => setRaw([]), []);

  const value = useMemo<CartCtx>(() => {
    const lines = raw.map((l) => ({ ...l, product: getProduct(l.slug)! }));
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.qty * l.product.price, 0),
      open,
      setOpen,
      add,
      setQty,
      remove,
      clear,
    };
  }, [raw, open, add, setQty, remove, clear]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}
