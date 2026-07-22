import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogView } from "@/components/catalog/CatalogView";
import { categories } from "@/lib/data/products";
import type { Category } from "@/lib/types";

export function generateStaticParams() {
  return categories.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string }>;
}): Promise<Metadata> {
  const { categoria } = await params;
  const category = categories.find((c) => c.slug === categoria);
  return {
    title: category ? `${category.label} — LUME` : "Tienda — LUME",
  };
}

export default async function CategoriaPage({
  params,
  searchParams,
}: {
  params: Promise<{ categoria: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { categoria } = await params;
  const category = categories.find((c) => c.slug === categoria);

  if (!category) notFound();

  const resolvedSearchParams = await searchParams;
  return <CatalogView category={category.slug as Category} searchParams={resolvedSearchParams} />;
}
