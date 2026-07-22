import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { stockImage } from "@/lib/utils/image";

export function Hero() {
  return (
    <section className="relative flex h-[88vh] min-h-[560px] items-end overflow-hidden bg-ink">
      <Image
        src={stockImage(1600, 2000, ["jewelry", "model", "fashion"], 1)}
        alt="Modelo usando piezas de joyería LUME"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <p className="animate-fade-up text-xs uppercase tracking-[0.2em] text-bone/70">
          Colección permanente
        </p>
        <h1 className="animate-fade-up mt-4 max-w-lg font-serif text-4xl leading-tight text-bone sm:text-5xl">
          Piezas para usar todos los días, hechas para durar todos los años.
        </h1>
        <div className="animate-fade-up mt-8 flex flex-wrap gap-3">
          <Button href="/tienda" size="lg">
            Ver la colección
          </Button>
          <Button href="/quiz" variant="secondary" size="lg" className="border-bone text-bone hover:bg-bone hover:text-ink">
            Encontrá tu estilo
          </Button>
        </div>
      </div>
    </section>
  );
}
