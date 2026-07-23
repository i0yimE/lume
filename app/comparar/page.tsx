import type { Metadata } from "next";
import { CompareClient } from "@/components/compare/CompareClient";

export const metadata: Metadata = {
  title: "Comparar productos — LUME",
  description: "Compará precios y características entre varias piezas de LUME.",
};

export default function CompararPage() {
  return <CompareClient />;
}
