import type { StyleTag } from "@/lib/types";

export interface QuizOption {
  value: string;
  label: string;
  tag?: StyleTag;
  metal?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "presencia",
    question: "¿Cómo te gusta que se note tu joyería?",
    options: [
      { value: "discreta", label: "Discreta, casi invisible", tag: "minimalista" },
      { value: "notoria", label: "Que se note al instante", tag: "statement" },
      { value: "atemporal", label: "Atemporal, de toda la vida", tag: "clasico" },
      { value: "moderna", label: "Con un giro moderno", tag: "contemporaneo" },
    ],
  },
  {
    id: "metal",
    question: "¿Qué metal usás más seguido?",
    options: [
      { value: "plata", label: "Plata", metal: "Plata" },
      { value: "oro", label: "Oro", metal: "Oro" },
      { value: "oro-rosa", label: "Oro rosa", metal: "Oro rosa" },
      { value: "cualquiera", label: "Uso de todo un poco" },
    ],
  },
  {
    id: "ocasion",
    question: "¿Para qué ocasión buscás algo?",
    options: [
      { value: "diario", label: "Para el día a día", tag: "minimalista" },
      { value: "especial", label: "Para una ocasión especial", tag: "statement" },
      { value: "regalo", label: "Es un regalo", tag: "clasico" },
    ],
  },
];
