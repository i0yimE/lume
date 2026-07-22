"use client";

import Link from "next/link";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { useUIStore } from "@/lib/store/ui";
import { useCartStore, useCartCount } from "@/lib/store/cart";
import { categories } from "@/lib/data/products";

export function Header() {
  const openNav = useUIStore((s) => s.openNav);
  const toggleSearch = useUIStore((s) => s.toggleSearch);
  const openCart = useCartStore((s) => s.open);
  const cartCount = useCartCount();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bone/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <button
            onClick={openNav}
            className="focus-ring -ml-2 p-2 text-ink hover:text-bronze lg:hidden"
            aria-label="Abrir menú de categorías"
          >
            <Menu size={22} />
          </button>
          <Link href="/" className="focus-ring font-serif text-2xl tracking-tight text-ink">
            LUME
          </Link>
        </div>

        <nav
          className="hidden items-center gap-8 text-sm uppercase tracking-wide lg:flex"
          aria-label="Categorías"
        >
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/tienda/${c.slug}`}
              className="focus-ring text-ink/80 hover:text-bronze"
            >
              {c.label}
            </Link>
          ))}
          <Link href="/quiz" className="focus-ring text-ink/80 hover:text-bronze">
            Encontrá tu estilo
          </Link>
          <Link href="/historia" className="focus-ring text-ink/80 hover:text-bronze">
            Nuestra historia
          </Link>
        </nav>

        <div className="flex items-center gap-1">
          <button
            onClick={openNav}
            className="focus-ring hidden p-2 text-ink hover:text-bronze lg:inline-flex"
            aria-label="Explorar categorías"
          >
            <Menu size={20} />
          </button>
          <button
            onClick={toggleSearch}
            className="focus-ring p-2 text-ink hover:text-bronze"
            aria-label="Buscar"
          >
            <Search size={20} />
          </button>
          <button
            onClick={openCart}
            className="focus-ring relative p-2 text-ink hover:text-bronze"
            aria-label={`Abrir carrito, ${cartCount} productos`}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-bronze text-[0.6rem] font-medium text-bone">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
