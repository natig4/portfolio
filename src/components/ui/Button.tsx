import type { ComponentProps } from "react";
import { Link, type Href } from "@/i18n/routing";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary: "bg-accent text-accent-foreground hover:bg-accent-hover",
  secondary: "border border-border bg-surface text-foreground hover:bg-muted",
  ghost: "text-foreground hover:bg-muted",
  /** For use on the always-dark CTA panel. */
  onDark: "bg-brand-cyan text-zinc-950 hover:bg-cyan-300",
  ghostOnDark: "text-zinc-50 hover:bg-white/10",
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
