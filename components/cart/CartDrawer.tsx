"use client";

import { useEffect } from "react";
import { ShoppingBag, X } from "lucide-react";
import { useCartStore, useCartTotal } from "@/lib/store/cart";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const close = useCartStore((s) => s.close);
  const items = useCartStore((s) => s.items);
  const total = useCartTotal();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        className="animate-fade-in absolute inset-0 bg-ink/40"
        onClick={close}
        aria-label="Cerrar carrito"
      />
      <aside
        className="animate-fade-up absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-bone p-6"
        role="dialog"
        aria-label="Carrito de compras"
      >
        <div className="flex items-center justify-between border-b border-line pb-4">
          <h2 className="font-serif text-xl">Tu carrito ({items.length})</h2>
          <button onClick={close} className="focus-ring text-ink/60 hover:text-ink" aria-label="Cerrar">
            <X size={22} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col">
            <EmptyState
              icon={ShoppingBag}
              title="Tu carrito está vacío"
              description="Todavía no agregaste ninguna pieza. Explorá la tienda para encontrar algo."
              action={
                <Button href="/tienda" onClick={close} size="sm">
                  Ir a la tienda
                </Button>
              }
            />
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </ul>
            <CartSummary total={total} onCheckout={close} />
          </>
        )}
      </aside>
    </div>
  );
}
