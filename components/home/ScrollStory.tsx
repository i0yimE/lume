import Image from "next/image";
import { stockImage } from "@/lib/utils/image";
import { Reveal } from "./Reveal";

const steps = [
  {
    image: stockImage(1000, 1200, ["silver", "metal", "jewelry"], 11),
    title: "Empezamos por el metal",
    text: "Plata y bronce reciclados, refundidos en un taller a 40 km de Buenos Aires. Nada de minería nueva si podemos evitarla.",
  },
  {
    image: stockImage(1000, 1200, ["jewelry", "craftsman", "hands"], 12),
    title: "Se pule a mano, pieza por pieza",
    text: "Cada anillo, aro o dije pasa entre 40 y 90 minutos de pulido manual antes de salir del taller. Por eso no hacemos miles de unidades iguales.",
  },
  {
    image: stockImage(1000, 1200, ["gift", "packaging", "box"], 13),
    title: "Llega sin plástico de más",
    text: "Bolsas de tela reutilizable y cajas de cartón reciclado. Nada que tengas que tirar apenas abrís el paquete.",
  },
];

export function ScrollStory() {
  return (
    <section className="bg-ink py-24 text-bone">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-bone/60">Cómo se hace</p>
          <h2 className="mt-3 max-w-md font-serif text-3xl leading-tight">
            De un boceto a una pieza que te vas a olvidar que tenés puesta.
          </h2>
        </Reveal>

        <div className="mt-16 flex flex-col gap-20">
          {steps.map((step, i) => (
            <Reveal
              key={step.title}
              className={`flex flex-col items-center gap-8 md:flex-row md:gap-16 ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="relative aspect-[4/5] w-full max-w-sm shrink-0 overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="(min-width: 768px) 384px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="max-w-md">
                <span className="font-serif text-5xl text-bronze">0{i + 1}</span>
                <h3 className="mt-4 font-serif text-2xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-bone/70">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
