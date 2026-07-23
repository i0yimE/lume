import type { Metadata } from "next";
import { StoryHero } from "@/components/historia/StoryHero";
import { StoryContent } from "@/components/historia/StoryContent";
import { ValuesDetailed } from "@/components/historia/ValuesDetailed";
import { LocationMap } from "@/components/historia/LocationMap";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Nuestra historia — LUME",
  description: "Cómo nació LUME, con qué materiales trabajamos y por qué producimos en lotes chicos.",
};

export default function HistoriaPage() {
  return (
    <div>
      <StoryHero />
      <StoryContent />
      <ValuesDetailed />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <h2 className="font-serif text-2xl text-ink sm:text-3xl">Dónde estamos</h2>
        <p className="mt-2 text-sm text-ink/60">
          Pilar, Provincia de Buenos Aires. Movete por el mapa, hacé zoom o
          agrandalo — y si preferís, abrilo directo en Google Maps.
        </p>
        <div className="mt-6">
          <LocationMap />
        </div>
      </section>

      <div className="flex justify-center pb-20">
        <Button href="/tienda" size="lg">
          Ver la colección
        </Button>
      </div>
    </div>
  );
}
