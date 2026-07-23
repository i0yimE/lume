import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary: "bg-ink text-bone hover:bg-ink-soft",
  secondary: "border border-ink text-ink hover:bg-ink hover:text-bone",
  ghost: "text-ink hover:text-bronze",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

type ButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type LinkButtonProps = BaseProps & { href: string } & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href"
  >;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: ButtonProps | LinkButtonProps) {
  const classes = cn(
    "focus-ring inline-flex items-center justify-center gap-2 tracking-wide uppercase transition-all duration-200 active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
