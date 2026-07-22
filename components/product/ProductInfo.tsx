import { Leaf } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils/format";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";
import { AddToCartForm } from "./AddToCartForm";

export function ProductInfo({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {product.newArrival && <Badge tone="bronze">Nuevo</Badge>}
        {product.bestSeller && <Badge tone="ink">Best seller</Badge>}
      </div>

      <div>
        <h1 className="font-serif text-3xl text-ink">{product.name}</h1>
        <div className="mt-2 flex items-center gap-3">
          <span className="text-lg text-ink">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-sm text-ink/40 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} className="mt-2" />
      </div>

      <p className="text-sm leading-relaxed text-ink/70">{product.shortDescription}</p>

      <AddToCartForm product={product} />

      <div className="space-y-4 border-t border-line pt-6 text-sm">
        <p className="leading-relaxed text-ink/70">{product.story}</p>

        <div className="flex items-start gap-2 bg-bone-soft p-4">
          <Leaf size={16} className="mt-0.5 shrink-0 text-bronze" aria-hidden="true" />
          <p className="text-ink/70">{product.sustainability}</p>
        </div>

        <div>
          <p className="text-ink">Materiales</p>
          <ul className="mt-1 list-inside list-disc text-ink/60">
            {product.materials.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>

        <details className="group">
          <summary className="focus-ring cursor-pointer text-ink marker:text-bronze">
            Cuidados de la pieza
          </summary>
          <p className="mt-2 text-ink/60">{product.careInstructions}</p>
        </details>
      </div>
    </div>
  );
}
