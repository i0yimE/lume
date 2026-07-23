import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/data/products";
import { unsplashImage } from "@/lib/utils/image";
import { Reveal } from "@/components/ui/Reveal";

const categoryImages: Record<string, string> = {
  anillos: unsplashImage("1543294001-f7cd5d7fb516", 700, 900),
  collares: unsplashImage("1506630448388-4e683c67ddb0", 700, 900),
  aros: unsplashImage("1651160670627-2896ddf7822f", 700, 900),
  pulseras: unsplashImage("1573408301185-9146fe634ad0", 700, 900),
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
