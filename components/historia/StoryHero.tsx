import Image from "next/image";
import { unsplashImage } from "@/lib/utils/image";

export function StoryHero() {
  return (
    <section className="relative flex h-[60vh] min-h-[420px] items-end overflow-hidden bg-ink">
      <Image
        src={unsplashImage("1621926184057-c5e1ba8d6f6b", 1600, 1200)}
        alt="Taller de orfebrería donde se hacen las piezas LUME"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-70"
      />
      <div className="relative mx-auto w-full max-w-4xl px-4 pb-14 sm:px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-bone/70">Nuestra historia</p>
        <h1 className="mt-3 max-w-xl font-serif text-4xl leading-tight text-bone">
          Empezamos con una pregunta simple: ¿por qué la joyería bien hecha
          tiene que ser tan cara?
        </h1>
      </div>
    </section>
  );
}
