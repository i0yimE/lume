"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store/cart";
import { Button } from "@/components/ui/Button";

export function AddToCartForm({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const [metal, setMetal] = useState(product.variants.metales?.[0]);
  const [talla, setTalla] = useState(product.variants.tallas?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product, { metal, talla }, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="space-y-6">
      {product.variants.metales && (
        <div>
          <p className="mb-2 text-sm text-ink">Metal: {metal}</p>
          <div className="flex flex-wrap gap-2">
            {product.variants.metales.map((m) => (
              <button
                key={m}
                onClick={() => setMetal(m)}
                className={`focus-ring border px-4 py-2 text-sm transition-colors ${
                  metal === m ? "border-ink bg-ink text-bone" : "border-line text-ink/70 hover:border-ink"
                }`}
                aria-pressed={metal === m}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      )}

      {product.variants.tallas && (
        <div>
          <p className="mb-2 text-sm text-ink">Talla: {talla}</p>
          <div className="flex flex-wrap gap-2">
            {product.variants.tallas.map((t) => (
              <button
                key={t}
                onClick={() => setTalla(t)}
                className={`focus-ring min-w-11 border px-3 py-2 text-sm transition-colors ${
                  talla === t ? "border-ink bg-ink text-bone" : "border-line text-ink/70 hover:border-ink"
                }`}
                aria-pressed={talla === t}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <div className="flex items-center border border-line">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="focus-ring p-3 text-ink/70 hover:text-ink"
            aria-label="Reducir cantidad"
          >
            <Minus size={14} />
          </button>
          <span className="w-8 text-center text-sm" aria-live="polite">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="focus-ring p-3 text-ink/70 hover:text-ink"
            aria-label="Aumentar cantidad"
          >
            <Plus size={14} />
          </button>
        </div>

        <Button onClick={handleAdd} disabled={!product.inStock} className="flex-1">
          {!product.inStock ? "Sin stock" : added ? "Agregado ✓" : "Agregar al carrito"}
        </Button>
      </div>
    </div>
  );
}
