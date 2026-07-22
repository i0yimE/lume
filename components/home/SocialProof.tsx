import Image from "next/image";
import { reviews } from "@/lib/data/products";
import { StarRating } from "@/components/ui/StarRating";
import { Reveal } from "./Reveal";

const featured = reviews.filter((r) => r.verified && r.rating === 5).slice(0, 3);

const ugcImages = [
  "https://picsum.photos/seed/lume-ugc-1/500/600",
  "https://picsum.photos/seed/lume-ugc-2/500/600",
  "https://picsum.photos/seed/lume-ugc-3/500/600",
];

export function SocialProof() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <h2 className="font-serif text-2xl text-ink sm:text-3xl">Lo que dicen quienes ya compraron</h2>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {featured.map((review, i) => (
          <Reveal key={review.id} delay={i * 90} className="flex flex-col gap-4">
            <div className="relative aspect-[5/6] w-full overflow-hidden bg-bone-soft">
              <Image
                src={ugcImages[i]}
                alt=""
                aria-hidden="true"
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <StarRating rating={review.rating} />
              <p className="mt-2 text-sm text-ink">"{review.body}"</p>
              <p className="mt-2 text-xs uppercase tracking-wide text-ink/50">{review.author}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
