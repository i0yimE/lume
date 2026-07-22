import { BadgeCheck, MessageSquare } from "lucide-react";
import type { Review } from "@/lib/types";
import { StarRating } from "@/components/ui/StarRating";
import { EmptyState } from "@/components/ui/EmptyState";

export function ReviewsSection({
  reviews,
  rating,
  reviewCount,
}: {
  reviews: Review[];
  rating: number;
  reviewCount: number;
}) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6" aria-label="Reseñas de producto">
      <div className="mb-8 flex items-center justify-between border-b border-line pb-6">
        <div>
          <h2 className="font-serif text-2xl text-ink">Reseñas</h2>
          <StarRating rating={rating} reviewCount={reviewCount} className="mt-2" />
        </div>
      </div>

      {reviews.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title="Todavía no hay reseñas"
          description="Sé la primera persona en contar cómo te quedó esta pieza."
        />
      ) : (
        <ul className="space-y-8">
          {reviews.map((review) => (
            <li key={review.id} className="border-b border-line pb-8 last:border-none">
              <div className="flex items-center justify-between">
                <StarRating rating={review.rating} />
                <time className="text-xs text-ink/50" dateTime={review.date}>
                  {new Date(review.date).toLocaleDateString("es-AR", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </time>
              </div>
              <p className="mt-3 text-sm text-ink">{review.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink/70">{review.body}</p>
              <div className="mt-3 flex items-center gap-2 text-xs text-ink/50">
                <span>{review.author}</span>
                {review.verified && (
                  <span className="flex items-center gap-1 text-bronze">
                    <BadgeCheck size={13} /> Compra verificada
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
