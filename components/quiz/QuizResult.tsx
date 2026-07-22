import type { Product, StyleTag } from "@/lib/types";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { VirtualTryOnPlaceholder } from "./VirtualTryOnPlaceholder";

export function QuizResult({
  products,
  tag,
  onRestart,
}: {
  products: Product[];
  tag: StyleTag | null;
  onRestart: () => void;
}) {
  const tagLabels: Record<StyleTag, string> = {
    minimalista: "minimalista",
    statement: "statement",
    clasico: "clásico",
    contemporaneo: "contemporáneo",
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-ink/50">Tu resultado</p>
        <h1 className="mt-4 font-serif text-3xl text-ink">
          Tu estilo es {tag ? tagLabels[tag] : "único"}
        </h1>
        <p className="mt-3 text-sm text-ink/60">
          Elegimos estas piezas pensando en lo que nos contaste. Podés seguir
          explorando toda la tienda cuando quieras.
        </p>
        <button
          onClick={onRestart}
          className="focus-ring mt-4 text-sm text-bronze hover:underline"
        >
          Volver a hacer el quiz
        </button>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-md">
        <VirtualTryOnPlaceholder />
      </div>

      <div className="mt-10 flex justify-center">
        <Button href="/tienda">Ver toda la colección</Button>
      </div>
    </div>
  );
}
