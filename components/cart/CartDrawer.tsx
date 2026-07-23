"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.button
            className="absolute inset-0 bg-ink/40"
            onClick={close}
            aria-label="Cerrar carrito"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.aside
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-bone p-6"
            role="dialog"
            aria-label="Carrito de compras"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
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
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
