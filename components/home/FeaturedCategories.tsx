import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/data/products";
import { stockImage } from "@/lib/utils/image";
import { Reveal } from "./Reveal";

const categoryImages: Record<string, string> = {
  anillos: stockImage(700, 900, ["ring", "jewelry"], 3),
  collares: stockImage(700, 900, ["necklace", "jewelry"], 4),
  aros: stockImage(700, 900, ["earrings", "jewelry"], 5),
  pulseras: stockImage(700, 900, ["bracelet", "jewelry"], 6),
};

export function FeaturedCategories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <h2 className="font-serif text-2xl text-ink sm:text-3xl">Explorá por categoría</h2>
      </Reveal>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {categories.map((c, i) => (
          <Reveal key={c.slug} delay={i * 80}>
            <Link href={`/tienda/${c.slug}`} className="focus-ring group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-bone-soft">
                <Image
                  src={categoryImages[c.slug]}
                  alt={c.label}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-3 text-sm uppercase tracking-wide text-ink">{c.label}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
