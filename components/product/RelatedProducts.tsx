import type { Product } from "@/lib/types";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "./ProductCard";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="font-serif text-2xl text-ink">También te puede gustar</h2>
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
        {products.map((product, i) => (
          <Reveal key={product.id} delay={i * 60}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
