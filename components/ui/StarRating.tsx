import { Star } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function StarRating({
  rating,
  reviewCount,
  size = 14,
  className,
}: {
  rating: number;
  reviewCount?: number;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("flex items-center gap-1.5", className)}
      role="img"
      aria-label={`Calificación ${rating} de 5${
        typeof reviewCount === "number" ? ` sobre ${reviewCount} reseñas` : ""
      }`}
    >
      <div className="flex" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            className={
              i < Math.round(rating) ? "fill-bronze text-bronze" : "fill-none text-ink/25"
            }
          />
        ))}
      </div>
      {typeof reviewCount === "number" && (
        <span className="text-xs text-ink/60">({reviewCount})</span>
      )}
    </div>
  );
}
