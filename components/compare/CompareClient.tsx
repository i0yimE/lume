"use client";

import Image from "next/image";
import Link from "next/link";
import { Scale, X } from "lucide-react";
import { getProductById, categories } from "@/lib/data/products";
import { useCompareStore } from "@/lib/store/compare";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils/format";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

const rows: {
  label: string;
  render: (p: NonNullable<ReturnType<typeof getProductById>>) => React.ReactNode;
}[] = [
  {
    label: "Categoría",
    render: (p) => categories.find((c) => c.slug === p.category)?.label ?? p.category,
  },
  {
    label: "Calificación",
    render: (p) => <StarRating rating={p.rating} reviewCount={p.reviewCount} />,
  },
  {
    label: "Materiales",
    render: (p) => (
      <ul className="space-y-0.5">
        {p.materials.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>
    ),
  },
  {
    label: "Metales",
    render: (p) => p.variants.metales?.join(", ") ?? "—",
  },
  {
    label: "Talles",
    render: (p) => p.variants.tallas?.join(", ") ?? "—",
  },
  {
    label: "Sustentabilidad",
    render: (p) => p.sustainability,
  },
  {
    label: "Cuidados",
    render: (p) => p.careInstructions,
  },
  {
    label: "Disponibilidad",
    render: (p) =>
      p.inStock ? (
        <span className="text-ink">En stock</span>
      ) : (
        <span className="text-ink/40">Sin stock</span>
      ),
  },
];

export function CompareClient() {
  const productIds = useCompareStore((s) => s.productIds);
  const remove = useCompareStore((s) => s.remove);
  const clear = useCompareStore((s) => s.clear);
  const addItem = useCartStore((s) => s.addItem);

  const products = productIds.map((id) => getProductById(id)).filter((p) => p !== undefined);

  if (products.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 sm:px-6">
        <EmptyState
          icon={Scale}
          title="Todavía no elegiste nada para comparar"
          description="Tocá el ícono de balanza en cualquier producto para sumarlo acá y comparar precios y características."
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
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="font-serif text-3xl text-ink">Comparar productos</h1>
          <p className="mt-2 text-sm text-ink/60">
            {products.length} de 4 productos seleccionados.
          </p>
        </div>
        <button onClick={clear} className="focus-ring text-sm text-ink/50 hover:text-ink">
          Vaciar todo
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 w-36 bg-bone p-0" />
              {products.map((product) => (
                <th key={product.id} className="w-56 border-b border-line p-4 align-top font-normal">
                  <div className="relative">
                    <button
                      onClick={() => remove(product.id)}
                      className="focus-ring absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-bone text-ink/50 shadow hover:text-ink"
                      aria-label={`Quitar ${product.name} de la comparación`}
                    >
                      <X size={14} />
                    </button>
                    <Link href={`/producto/${product.slug}`} className="focus-ring block">
                      <div className="relative aspect-[4/5] overflow-hidden bg-bone-soft">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="220px"
                          className="object-cover"
                        />
                      </div>
                      <p className="mt-3 text-sm text-ink">{product.name}</p>
                    </Link>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm text-ink">{formatPrice(product.price)}</span>
                      {product.compareAtPrice && (
                        <span className="text-xs text-ink/40 line-through">
                          {formatPrice(product.compareAtPrice)}
                        </span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      className="mt-3 w-full"
                      disabled={!product.inStock}
                      onClick={() =>
                        addItem(product, {
                          metal: product.variants.metales?.[0],
                          talla: product.variants.tallas?.[0],
                        })
                      }
                    >
                      {product.inStock ? "Agregar al carrito" : "Sin stock"}
                    </Button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-line">
                <th className="sticky left-0 z-10 w-36 bg-bone p-4 text-left align-top text-xs uppercase tracking-wide text-ink/50">
                  {row.label}
                </th>
                {products.map((product) => (
                  <td key={product.id} className="w-56 p-4 align-top text-ink/70">
                    {row.render(product)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length < 4 && (
        <div className="mt-8">
          <Button href="/tienda" variant="secondary" size="sm">
            Sumar otro producto
          </Button>
        </div>
      )}
    </div>
  );
}
