import Link from "next/link";
import { categories } from "@/lib/data/products";
import { Newsletter } from "./Newsletter";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-bone">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <span className="font-serif text-2xl text-ink">LUME</span>
            <p className="mt-3 max-w-xs text-sm text-ink/60">
              Piezas de joyería pensadas para durar, hechas en lotes chicos con
              materiales reciclados y trazabilidad real.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-ink/50">Tienda</p>
            <ul className="mt-4 space-y-2 text-sm">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/tienda/${c.slug}`} className="focus-ring text-ink/80 hover:text-bronze">
                    {c.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/quiz" className="focus-ring text-ink/80 hover:text-bronze">
                  Encontrá tu estilo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-ink/50">Marca</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/historia" className="focus-ring text-ink/80 hover:text-bronze">
                  Nuestra historia
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="focus-ring text-ink/80 hover:text-bronze">
                  Cómo comprar
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-line pt-10">
          <div className="max-w-md">
            <Newsletter />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} LUME. Todos los derechos reservados.</p>
          <p>Hecho a mano en Buenos Aires.</p>
        </div>
      </div>
    </footer>
  );
}
