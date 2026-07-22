import type { Metadata } from "next";
import { QuizClient } from "@/components/quiz/QuizClient";

export const metadata: Metadata = {
  title: "Encontrá tu estilo — LUME",
  description: "Un quiz corto para encontrar qué piezas de LUME van con tu estilo.",
};

export default function QuizPage() {
  return <QuizClient />;
}
