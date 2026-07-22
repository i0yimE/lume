import type { Metadata } from "next";
import { CatalogView } from "@/components/catalog/CatalogView";

export const metadata: Metadata = {
  title: "Tienda — LUME",
  description: "Explorá toda la colección de joyería LUME: anillos, collares, aros y pulseras.",
};

export default async function TiendaPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  return <CatalogView searchParams={params} />;
}
