import type { Metadata } from "next";
import { StoryHero } from "@/components/historia/StoryHero";
import { StoryContent } from "@/components/historia/StoryContent";
import { ValuesDetailed } from "@/components/historia/ValuesDetailed";
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
      <div className="flex justify-center pb-20">
        <Button href="/tienda" size="lg">
          Ver la colección
        </Button>
      </div>
    </div>
  );
}
