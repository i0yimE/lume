import { formatPrice } from "@/lib/utils/format";
import { Button } from "@/components/ui/Button";

export function CartSummary({ total, onCheckout }: { total: number; onCheckout: () => void }) {
  return (
    <div className="border-t border-line pt-5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-ink/60">Subtotal</span>
        <span className="text-ink">{formatPrice(total)}</span>
      </div>
      <p className="mt-1 text-xs text-ink/50">Envío y descuentos se calculan en el checkout.</p>

      <Button href="/checkout" onClick={onCheckout} className="mt-5 w-full">
        Ir al checkout
      </Button>
      <p className="mt-3 text-center text-xs text-ink/50">
        No hace falta crear una cuenta para comprar.
      </p>
    </div>
  );
}
