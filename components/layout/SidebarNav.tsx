"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useUIStore } from "@/lib/store/ui";
import { categories } from "@/lib/data/products";
import { unsplashImage } from "@/lib/utils/image";

const categoryImages: Record<string, string> = {
  anillos: unsplashImage("1611955167811-4711904bb9f8", 400, 500),
  collares: unsplashImage("1588444968576-f8fe92ce56fd", 400, 500),
  aros: unsplashImage("1626784215021-2e39ccf971cd", 400, 500),
  pulseras: unsplashImage("1619119069152-a2b331eb392a", 400, 500),
};

export function SidebarNav() {
  const isOpen = useUIStore((s) => s.isNavOpen);
  const close = useUIStore((s) => s.closeNav);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.button
            className="absolute inset-0 bg-ink/40"
            onClick={close}
            aria-label="Cerrar navegación"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.nav
            className="absolute left-0 top-0 flex h-full w-full max-w-sm flex-col overflow-y-auto bg-bone p-6"
            aria-label="Navegación de categorías"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="font-serif text-xl">Explorar</span>
              <button
                onClick={close}
                className="focus-ring text-ink/60 hover:text-ink"
                aria-label="Cerrar"
              >
                <X size={22} />
              </button>
            </div>

            <ul className="grid grid-cols-2 gap-4">
              {categories.map((c, i) => (
                <motion.li
                  key={c.slug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={`/tienda/${c.slug}`}
                    onClick={close}
                    className="focus-ring group block"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-bone-soft">
                      <Image
                        src={categoryImages[c.slug]}
                        alt={c.label}
                        fill
                        sizes="200px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <p className="mt-2 text-sm uppercase tracking-wide">{c.label}</p>
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 text-sm uppercase tracking-wide">
              <Link href="/tienda" onClick={close} className="focus-ring hover:text-bronze">
                Todos los productos
              </Link>
              <Link href="/quiz" onClick={close} className="focus-ring hover:text-bronze">
                Encontrá tu estilo
              </Link>
              <Link href="/historia" onClick={close} className="focus-ring hover:text-bronze">
                Nuestra historia
              </Link>
            </div>
          </motion.nav>
        </div>
      )}
    </AnimatePresence>
  );
}
