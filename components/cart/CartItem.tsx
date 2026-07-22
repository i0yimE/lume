import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import type { CartItem as CartItemType } from "@/lib/types";
import { formatPrice } from "@/lib/utils/format";
import { useCartStore } from "@/lib/store/cart";

export function CartItem({ item }: { item: CartItemType }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const variantLabel = [item.variant.metal, item.variant.talla].filter(Boolean).join(" · ");

  return (
    <li className="flex gap-4 py-5">
      <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-bone-soft">
        <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm text-ink">{item.name}</p>
            {variantLabel && <p className="mt-0.5 text-xs text-ink/50">{variantLabel}</p>}
          </div>
          <button
            onClick={() => removeItem(item.id)}
            className="focus-ring text-ink/40 hover:text-ink"
            aria-label={`Quitar ${item.name} del carrito`}
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center border border-line">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="focus-ring p-1.5 text-ink/70 hover:text-ink"
              aria-label="Reducir cantidad"
            >
              <Minus size={13} />
            </button>
            <span className="w-6 text-center text-sm" aria-live="polite">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="focus-ring p-1.5 text-ink/70 hover:text-ink"
              aria-label="Aumentar cantidad"
            >
              <Plus size={13} />
            </button>
          </div>
          <p className="text-sm text-ink">{formatPrice(item.price * item.quantity)}</p>
        </div>
      </div>
    </li>
  );
}
