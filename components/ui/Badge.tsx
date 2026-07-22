import { cn } from "@/lib/utils/cn";

type Tone = "bronze" | "ink" | "outline";

const toneClasses: Record<Tone, string> = {
  bronze: "bg-bronze text-bone",
  ink: "bg-ink text-bone",
  outline: "border border-ink/40 text-ink",
};

export function Badge({
  children,
  tone = "outline",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-[0.65rem] uppercase tracking-wider",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
