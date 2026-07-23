"use client";

import { usePathname } from "next/navigation";

// Sin animación acá a propósito: este wrapper cubre TODO el contenido de
// cada página. En pruebas, cualquier animación CSS aplicada a este nivel
// podía quedar "congelada" en su estado inicial (oculta) cuando el render
// no llega a componer un frame. El contenido de la página nunca debe
// depender de que una animación corra para ser visible.
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return <div key={pathname}>{children}</div>;
}
