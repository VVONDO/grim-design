import { SHIPPING, freeOverLabel, shippingCostLabel } from "@/lib/site";
import { Truck, Undo } from "./Icons";

/** Delivery + returns. Delivery speed is a selling point: it's the loudest line. */
export function ShippingInfo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "space-y-2" : "space-y-3"}>
      <p className="flex items-center gap-3 text-white">
        <Truck size={compact ? 20 : 24} className="shrink-0" />
        <span className={compact ? "text-[15px] font-semibold" : "text-[17px] font-semibold"}>{SHIPPING.deliveryText}</span>
      </p>
      <p className="flex items-center gap-3 text-bone">
        <Undo size={compact ? 18 : 20} className="shrink-0" />
        <span className="text-[15px]">{SHIPPING.returnsText}</span>
      </p>
      <p className="pl-9 font-mono text-[12px] uppercase tracking-[0.1em] text-white/70">
        Shipping {shippingCostLabel()} · Free over {freeOverLabel()}
      </p>
    </div>
  );
}
