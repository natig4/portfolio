import type { ComponentProps } from "react";
import { Link, type Href } from "@/i18n/routing";

const base =
  "group/button inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,color,box-shadow,translate] duration-200 disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary:
    "shine bg-accent text-accent-foreground shadow-[0_8px_24px_-10px_var(--accent)] hover:-translate-y-0.5 hover:bg-accent-hover",
  secondary:
    "border border-border bg-surface text-foreground hover:-translate-y-0.5 hover:bg-muted",
  ghost: "text-foreground hover:bg-muted",
  /** Gradient fill for the main call to action. Fixed stops keep white text at 5:1+ on any background. */
  brand:
    "shine bg-[linear-gradient(110deg,#7c3aed,#0e7490)] text-white shadow-[0_10px_30px_-12px_#7c3aed] hover:-translate-y-0.5",
} as const;

const sizes = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
} as const;

export type ButtonStyle = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
};

export function buttonClass({
  variant = "primary",
  size = "md",
  className = "",
}: ButtonStyle = {}) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

export function ButtonLink({
  href,
  variant,
  size,
  className,
  ...rest
}: Omit<ComponentProps<typeof Link>, "href" | "className"> &
  ButtonStyle & { href: Href }) {
  return (
    <Link
      href={href}
      className={buttonClass({ variant, size, className })}
      {...rest}
    />
  );
}

export default function Button({
  variant,
  size,
  className,
  type = "button",
  ...rest
}: Omit<ComponentProps<"button">, "className"> & ButtonStyle) {
  return (
    <button
      type={type}
      className={buttonClass({ variant, size, className })}
      {...rest}
    />
  );
}
