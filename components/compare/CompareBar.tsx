"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { getProductById } from "@/lib/data/products";
import { useCompareStore } from "@/lib/store/compare";
import { Button } from "@/components/ui/Button";

export function CompareBar() {
  const productIds = useCompareStore((s) => s.productIds);
  const remove = useCompareStore((s) => s.remove);
  const clear = useCompareStore((s) => s.clear);
  const products = productIds.map((id) => getProductById(id)).filter((p) => p !== undefined);
  const isOpen = products.length > 0;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4 transition-transform duration-300 ease-out sm:justify-start sm:left-5 sm:right-auto sm:px-0 ${
        isOpen ? "translate-y-0" : "pointer-events-none translate-y-[calc(100%+2rem)]"
      }`}
    >
      <div className="flex w-full max-w-lg items-center gap-3 border border-line bg-bone p-3 shadow-xl">
        <ul className="flex flex-1 gap-3 overflow-x-auto p-2">
          {products.map((product) => (
            <li key={product.id} className="relative shrink-0">
              <div className="relative h-12 w-12 overflow-hidden bg-bone-soft">
                <Image src={product.images[0]} alt={product.name} fill sizes="48px" className="object-cover" />
              </div>
              <button
                onClick={() => remove(product.id)}
                className="focus-ring absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-bone"
                aria-label={`Quitar ${product.name} de comparación`}
              >
                <X size={11} className="shrink-0" />
              </button>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={clear}
            className="focus-ring hidden text-xs text-ink/50 hover:text-ink sm:inline"
          >
            Vaciar
          </button>
          <Button href="/comparar" size="sm">
            Comparar ({products.length})
          </Button>
        </div>
      </div>
    </div>
  );
}
