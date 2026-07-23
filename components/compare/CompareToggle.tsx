"use client";

import { Scale } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useCompareStore, useIsComparing, useCompareIsFull } from "@/lib/store/compare";

export function CompareToggle({
  productId,
  className,
  size = "sm",
}: {
  productId: string;
  className?: string;
  size?: "sm" | "md";
}) {
  const isComparing = useIsComparing(productId);
  const isFull = useCompareIsFull();
  const toggle = useCompareStore((s) => s.toggle);
  const disabled = !isComparing && isFull;

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    toggle(productId);
  }

  if (size === "md") {
    return (
      <button
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          "focus-ring inline-flex items-center gap-2 border px-4 py-2 text-xs uppercase tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-40",
          isComparing
            ? "border-ink bg-ink text-bone"
            : "border-line text-ink/70 hover:border-ink",
          className
        )}
        aria-pressed={isComparing}
        title={disabled ? `Máximo ${4} productos para comparar` : undefined}
      >
        <Scale size={14} />
        {isComparing ? "En comparación" : "Comparar"}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "focus-ring flex h-8 w-8 items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-40",
        isComparing
          ? "border-ink bg-ink text-bone"
          : "border-line bg-bone/90 text-ink/70 hover:border-ink",
        className
      )}
      aria-pressed={isComparing}
      aria-label={isComparing ? "Quitar de comparación" : "Agregar a comparación"}
      title={disabled ? "Máximo 4 productos para comparar" : undefined}
    >
      <Scale size={14} />
    </button>
  );
}
