import { getBestSellers } from "@/lib/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function BestSellers() {
  const products = getBestSellers(4);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal className="flex items-end justify-between">
        <div>
          <h2 className="font-serif text-2xl text-ink sm:text-3xl">Los más elegidos</h2>
          <p className="mt-2 text-sm text-ink/60">Las piezas que más se repiten en pedidos.</p>
        </div>
        <Button href="/tienda" variant="ghost" size="sm" className="hidden sm:inline-flex">
          Ver todo
        </Button>
      </Reveal>

      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
        {products.map((product, i) => (
          <Reveal key={product.id} delay={i * 60}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>

      <div className="mt-8 flex justify-center sm:hidden">
        <Button href="/tienda" variant="secondary" size="sm">
          Ver todo
        </Button>
      </div>
    </section>
  );
}
