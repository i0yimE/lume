import Image from "next/image";
import { unsplashImage } from "@/lib/utils/image";

const values = [
  {
    image: unsplashImage("1715374033196-0ff662284a7e", 700, 500),
    title: "Materiales con origen conocido",
    text: "Toda la plata y el bronce que usamos son reciclados y refundidos localmente. Los pocos materiales que importamos (como la piedra lunar) vienen de proveedores con certificado de trazabilidad, no de intermediarios anónimos.",
  },
  {
    image: unsplashImage("1624588057318-5f1b2eb81012", 700, 500),
    title: "Producción en lotes chicos",
    text: "No fabricamos para llenar depósitos. Cada modelo se produce en tandas de 30 a 80 unidades, lo que a veces significa listas de espera, pero nunca stock que termina descartado.",
  },
  {
    image: unsplashImage("1617825295690-28ae56c56135", 700, 500),
    title: "Empaque sin plástico",
    text: "Bolsas de algodón reutilizables y cajas de cartón 100% reciclado. Nada que tengas que tirar apenas abrís el paquete.",
  },
];

export function ValuesDetailed() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="font-serif text-2xl text-ink sm:text-3xl">En qué creemos</h2>
      <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-3">
        {values.map((v) => (
          <div key={v.title}>
            <div className="relative aspect-[4/3] overflow-hidden bg-bone-soft">
              <Image
                src={v.image}
                alt=""
                aria-hidden="true"
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            <h3 className="mt-4 font-serif text-lg text-ink">{v.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/60">{v.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
