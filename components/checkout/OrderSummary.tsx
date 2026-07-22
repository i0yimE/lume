import Image from "next/image";
import type { CartItem } from "@/lib/types";
import { formatPrice } from "@/lib/utils/format";

const FREE_SHIPPING_THRESHOLD = 80000;
const SHIPPING_COST = 4500;

export function OrderSummary({ items, total }: { items: CartItem[]; total: number }) {
  const shipping = total >= FREE_SHIPPING_THRESHOLD || total === 0 ? 0 : SHIPPING_COST;

  return (
    <div className="border border-line bg-bone-soft/40 p-6">
      <h2 className="font-serif text-lg text-ink">Tu pedido</h2>

      <ul className="mt-5 space-y-4">
        {items.map((item) => (
          <li key={item.id} className="flex gap-3">
            <div className="relative h-16 w-14 shrink-0 overflow-hidden bg-bone-soft">
              <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[0.65rem] text-bone">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-ink">{item.name}</p>
              <p className="text-xs text-ink/50">
                {[item.variant.metal, item.variant.talla].filter(Boolean).join(" · ")}
              </p>
            </div>
            <p className="text-sm text-ink">{formatPrice(item.price * item.quantity)}</p>
          </li>
        ))}
      </ul>

      <div className="mt-6 space-y-2 border-t border-line pt-4 text-sm">
        <div className="flex justify-between text-ink/60">
          <span>Subtotal</span>
          <span>{formatPrice(total)}</span>
        </div>
        <div className="flex justify-between text-ink/60">
          <span>Envío</span>
          <span>{shipping === 0 ? "Gratis" : formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between border-t border-line pt-2 text-base text-ink">
          <span>Total</span>
          <span>{formatPrice(total + shipping)}</span>
        </div>
      </div>
    </div>
  );
}
