"use client";

import { useMemo, useState } from "react";
import { ShoppingBag, CircleCheck } from "lucide-react";
import { useCartStore, useCartTotal } from "@/lib/store/cart";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export function CheckoutClient() {
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const total = useCartTotal();
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const orderId = useMemo(() => `LUME-${Math.floor(100000 + Math.random() * 900000)}`, []);

  function handleConfirm() {
    setOrderNumber(orderId);
    clear();
  }

  if (orderNumber) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 sm:px-6">
        <EmptyState
          icon={CircleCheck}
          title="¡Pedido confirmado!"
          description={`Tu pedido #${orderNumber} fue registrado. Te vamos a escribir por email con los detalles del envío.`}
          action={
            <Button href="/tienda" size="sm">
              Seguir explorando
            </Button>
          }
        />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 sm:px-6">
        <EmptyState
          icon={ShoppingBag}
          title="Tu carrito está vacío"
          description="Agregá alguna pieza a tu carrito antes de pasar al checkout."
          action={
            <Button href="/tienda" size="sm">
              Ir a la tienda
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-serif text-3xl text-ink">Checkout</h1>
      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]">
        <CheckoutForm onSubmit={handleConfirm} />
        <OrderSummary items={items} total={total} />
      </div>
    </div>
  );
}
