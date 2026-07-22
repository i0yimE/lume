import { products as allProducts, categories } from "@/lib/data/products";
import { applyFilters, getAllMetales } from "@/lib/utils/filters";
import type { Category, SortOption, StyleTag } from "@/lib/types";
import { ProductGrid } from "./ProductGrid";
import { Filters } from "./Filters";
import { SortDropdown } from "./SortDropdown";
import { SearchBar } from "./SearchBar";

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function list(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export function CatalogView({
  category,
  searchParams,
}: {
  category?: Category;
  searchParams: SearchParams;
}) {
  const filtered = applyFilters(allProducts, {
    category,
    metales: list(searchParams.metal),
    tags: list(searchParams.tag) as StyleTag[],
    soloDisponibles: searchParams.disponibles === "1",
    precioMax: searchParams.precioMax ? Number(first(searchParams.precioMax)) : undefined,
    query: first(searchParams.q),
    sort: (first(searchParams.sort) as SortOption) ?? "relevancia",
  });

  const allMetales = getAllMetales(category ? allProducts.filter((p) => p.category === category) : allProducts);
  const categoryLabel = categories.find((c) => c.slug === category)?.label;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-ink">{categoryLabel ?? "Toda la tienda"}</h1>
        <p className="mt-2 text-sm text-ink/60">
          {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar />
        <SortDropdown />
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
        <aside>
          <Filters allMetales={allMetales} />
        </aside>
        <ProductGrid products={filtered} />
      </div>
    </div>
  );
}
