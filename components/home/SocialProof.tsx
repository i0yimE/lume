import Image from "next/image";
import { reviews } from "@/lib/data/products";
import { StarRating } from "@/components/ui/StarRating";
import { unsplashImage } from "@/lib/utils/image";
import { Reveal } from "@/components/ui/Reveal";

const featured = reviews.filter((r) => r.verified && r.rating === 5).slice(0, 3);

const ugcImages = [
  unsplashImage("1613966561243-c6959a886009", 500, 600),
  unsplashImage("1532039956299-1614b86a6d2f", 500, 600),
  unsplashImage("1689926628786-5eff645e3e23", 500, 600),
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
