import type { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <Icon size={32} className="text-ink/30" strokeWidth={1.25} aria-hidden="true" />
      <div className="space-y-1.5">
        <p className="font-serif text-lg text-ink">{title}</p>
        <p className="mx-auto max-w-xs text-sm text-ink/60">{description}</p>
      </div>
      {action}
    </div>
  );
}
