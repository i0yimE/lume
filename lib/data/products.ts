import rawProducts from "./products.json";
import rawReviews from "./reviews.json";
import type { Product, Review, Category } from "@/lib/types";

export const products = rawProducts as Product[];
export const reviews = rawReviews as Review[];

export const categories: { slug: Category; label: string }[] = [
  { slug: "anillos", label: "Anillos" },
  { slug: "collares", label: "Collares" },
  { slug: "aros", label: "Aros" },
  { slug: "pulseras", label: "Pulseras" },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

export function getReviewsForProduct(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}

export function getBestSellers(limit = 8): Product[] {
  return products.filter((p) => p.bestSeller).slice(0, limit);
}

export function getNewArrivals(limit = 8): Product[] {
  return products.filter((p) => p.newArrival).slice(0, limit);
}
