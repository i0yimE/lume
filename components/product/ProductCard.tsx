import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils/format";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";
import { QuickShop } from "./QuickShop";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative flex flex-col">
      <Link href={`/producto/${product.slug}`} className="focus-ring block">
        <div className="relative aspect-[4/5] overflow-hidden bg-bone-soft">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-opacity duration-300 group-hover:opacity-0"
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt=""
              aria-hidden="true"
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          )}

          <div className="absolute left-2 top-2 flex flex-col gap-1.5">
            {product.newArrival && <Badge tone="bronze">Nuevo</Badge>}
            {product.bestSeller && <Badge tone="ink">Best seller</Badge>}
            {!product.inStock && <Badge tone="outline">Sin stock</Badge>}
          </div>

          <QuickShop product={product} />
        </div>

        <div className="mt-3 space-y-1">
          <p className="text-sm text-ink">{product.name}</p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-ink/70">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-xs text-ink/40 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
          <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        </div>
      </Link>
    </div>
  );
}
