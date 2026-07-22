"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

export function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set("q", value.trim());
    } else {
      params.delete("q");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function clear() {
    setValue("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex-1">
      <label htmlFor="catalog-search" className="sr-only">
        Buscar en la tienda
      </label>
      <Search
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/40"
        aria-hidden="true"
      />
      <input
        id="catalog-search"
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Buscar en la tienda"
        className="focus-ring w-full border border-line bg-transparent py-2 pl-9 pr-8 text-sm placeholder:text-ink/40"
      />
      {value && (
        <button
          type="button"
          onClick={clear}
          className="focus-ring absolute right-2 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink"
          aria-label="Limpiar búsqueda"
        >
          <X size={14} />
        </button>
      )}
    </form>
  );
}
