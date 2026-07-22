"use client";

import { useState } from "react";
import { quizQuestions } from "@/lib/data/quiz";
import { products } from "@/lib/data/products";
import type { StyleTag } from "@/lib/types";
import { QuizStep } from "@/components/quiz/QuizStep";
import { QuizResult } from "@/components/quiz/QuizResult";

export function QuizClient() {
  const [stepIndex, setStepIndex] = useState(0);
  const [tagVotes, setTagVotes] = useState<StyleTag[]>([]);
  const [metal, setMetal] = useState<string | undefined>(undefined);
  const [finished, setFinished] = useState(false);

  const currentQuestion = quizQuestions[stepIndex];

  function handleAnswer(optionValue: string) {
    const option = currentQuestion.options.find((o) => o.value === optionValue);
    if (option?.tag) setTagVotes((prev) => [...prev, option.tag!]);
    if (option?.metal) setMetal(option.metal);

    if (stepIndex + 1 < quizQuestions.length) {
      setStepIndex((s) => s + 1);
    } else {
      setFinished(true);
    }
  }

  function handleRestart() {
    setStepIndex(0);
    setTagVotes([]);
    setMetal(undefined);
    setFinished(false);
  }

  if (finished) {
    const winningTag =
      tagVotes.length > 0
        ? (Object.entries(
            tagVotes.reduce<Record<string, number>>((acc, t) => {
              acc[t] = (acc[t] ?? 0) + 1;
              return acc;
            }, {})
          ).sort((a, b) => b[1] - a[1])[0][0] as StyleTag)
        : null;

    const matched = products
      .filter((p) => (winningTag ? p.tags.includes(winningTag) : true))
      .filter((p) => !metal || p.variants.metales?.includes(metal))
      .slice(0, 8);

    const results = matched.length > 0 ? matched : products.slice(0, 4);

    return <QuizResult products={results} tag={winningTag} onRestart={handleRestart} />;
  }

  return (
    <QuizStep
      question={currentQuestion}
      step={stepIndex + 1}
      total={quizQuestions.length}
      onAnswer={handleAnswer}
    />
  );
}
