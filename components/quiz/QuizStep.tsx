import type { QuizQuestion } from "@/lib/data/quiz";

export function QuizStep({
  question,
  step,
  total,
  onAnswer,
}: {
  question: QuizQuestion;
  step: number;
  total: number;
  onAnswer: (optionValue: string) => void;
}) {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
      <p className="text-xs uppercase tracking-[0.2em] text-ink/50">
        Paso {step} de {total}
      </p>
      <h1 className="mt-4 font-serif text-3xl text-ink">{question.question}</h1>

      <div className="mt-10 flex flex-col gap-3">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => onAnswer(option.value)}
            className="focus-ring border border-line px-6 py-4 text-left text-sm text-ink transition-colors hover:border-ink hover:bg-ink hover:text-bone"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
