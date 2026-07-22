"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store/cart";

// Permite comprar sin salir del listado (patrón Allbirds): elige variante
// mínima necesaria y agrega directo al carrito.
export function QuickShop({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const [metal, setMetal] = useState(product.variants.metales?.[0]);
  const [talla, setTalla] = useState(product.variants.tallas?.[0]);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, { metal, talla });
  }

  return (
    <div
      className="absolute inset-x-0 bottom-0 translate-y-full bg-bone p-3 opacity-0 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col gap-2">
        {product.variants.metales && (
          <select
            value={metal}
            onChange={(e) => setMetal(e.target.value)}
            className="focus-ring border border-line bg-transparent px-2 py-1.5 text-xs"
            aria-label="Metal"
          >
            {product.variants.metales.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        )}
        {product.variants.tallas && (
          <select
            value={talla}
            onChange={(e) => setTalla(e.target.value)}
            className="focus-ring border border-line bg-transparent px-2 py-1.5 text-xs"
            aria-label="Talla"
          >
            {product.variants.tallas.map((t) => (
              <option key={t} value={t}>
                Talla {t}
              </option>
            ))}
          </select>
        )}
        <button
          onClick={handleAdd}
          disabled={!product.inStock}
          className="focus-ring bg-ink px-3 py-2 text-xs uppercase tracking-wide text-bone transition-colors hover:bg-ink-soft disabled:opacity-40"
        >
          {product.inStock ? "Compra rápida" : "Sin stock"}
        </button>
      </div>
    </div>
  );
}
