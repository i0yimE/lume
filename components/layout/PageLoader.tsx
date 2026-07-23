"use client";

import { useEffect, useState } from "react";

const WORD = "LUME";

// La entrada usa animación CSS declarativa (corre sola, no depende de
// rAF/estado de React). La salida sí necesita un timer para desmontar,
// y eso sí es confiable (setTimeout no se pausa como requestAnimationFrame
// en pestañas en segundo plano).
export function PageLoader() {
  const [leaving, setLeaving] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setRemoved(true);
      return;
    }

    const leaveTimer = setTimeout(() => setLeaving(true), 900);
    const removeTimer = setTimeout(() => setRemoved(true), 1400);

    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-ink transition-opacity duration-500 ease-in-out ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <div className="flex overflow-hidden">
        {WORD.split("").map((letter, i) => (
          <span
            key={i}
            className="animate-fade-up font-serif text-4xl text-bone sm:text-5xl"
            style={{ animationDelay: `${80 * i}ms` }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}
