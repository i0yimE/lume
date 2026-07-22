import type { Product, SortOption, Category, StyleTag } from "@/lib/types";

export interface CatalogFilters {
  category?: Category;
  metales?: string[];
  tags?: StyleTag[];
  soloDisponibles?: boolean;
  precioMax?: number;
  query?: string;
  sort?: SortOption;
}

// Filtra y ordena en un solo paso para que la grilla del catálogo siempre
// reciba una lista ya lista para renderizar, sin lógica en el componente.
export function applyFilters(products: Product[], filters: CatalogFilters): Product[] {
  let result = products;

  if (filters.category) {
    result = result.filter((p) => p.category === filters.category);
  }

  if (filters.metales && filters.metales.length > 0) {
    result = result.filter((p) =>
      p.variants.metales?.some((m) => filters.metales!.includes(m))
    );
  }

  if (filters.tags && filters.tags.length > 0) {
    result = result.filter((p) => p.tags.some((t) => filters.tags!.includes(t)));
  }

  if (filters.soloDisponibles) {
    result = result.filter((p) => p.inStock);
  }

  if (typeof filters.precioMax === "number") {
    result = result.filter((p) => p.price <= filters.precioMax!);
  }

  if (filters.query) {
    const q = filters.query.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
  }

  return sortProducts(result, filters.sort ?? "relevancia");
}

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];

  switch (sort) {
    case "precio-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "precio-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "novedades":
      return sorted.sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
    case "mejor-valorados":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "relevancia":
    default:
      return sorted.sort((a, b) => Number(b.bestSeller) - Number(a.bestSeller));
  }
}

export function getAllMetales(products: Product[]): string[] {
  const set = new Set<string>();
  products.forEach((p) => p.variants.metales?.forEach((m) => set.add(m)));
  return Array.from(set);
}
