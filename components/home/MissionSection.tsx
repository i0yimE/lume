import { Leaf, PackageCheck, Hammer } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const pillars = [
  {
    icon: Leaf,
    title: "Materiales reciclados",
    text: "Plata, oro y bronce recuperados, no extraídos de cero.",
  },
  {
    icon: Hammer,
    title: "Lotes chicos",
    text: "Producimos lo que sabemos que se va a vender, nada de stock acumulado.",
  },
  {
    icon: PackageCheck,
    title: "Trazabilidad real",
    text: "Sabemos de dónde sale cada material y te lo contamos en cada producto.",
  },
];

export function MissionSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
        {pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 100} className="flex flex-col items-start gap-3">
            <p.icon size={28} strokeWidth={1.25} className="text-bronze" aria-hidden="true" />
            <h3 className="font-serif text-lg text-ink">{p.title}</h3>
            <p className="text-sm text-ink/60">{p.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
