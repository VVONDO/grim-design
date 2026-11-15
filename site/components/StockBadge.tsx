import { stockState, type Product } from "@/lib/products";

/** Availability reads before price. Low stock is DEMO data until wired to inventory. */
export function StockBadge({ product, large = false }: { product: Pick<Product, "stock">; large?: boolean }) {
  const s = stockState(product);
  if (s === "low") return <span className="badge-low">Low stock</span>;
  if (s === "out")
    return (
      <span className={`inline-flex items-center gap-2 ${large ? "text-[16px]" : "text-[13px]"}`}>
        <span className="h-2 w-2 rounded-full border border-white/70" aria-hidden /> Sold out
      </span>
    );
  return (
    <span className={`inline-flex items-center gap-2 ${large ? "text-[16px]" : "text-[13px]"}`}>
      <span className="h-2 w-2 rounded-full bg-white" aria-hidden /> In stock
    </span>
  );
}
