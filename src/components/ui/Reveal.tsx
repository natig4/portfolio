import type { CSSProperties, ReactNode } from "react";

const variants = {
  up: "reveal",
  scale: "reveal-scale",
  start: "reveal-start",
} as const;

/**
 * Animates content in as it scrolls into view using a CSS scroll-driven
 * animation (`.reveal*` in globals.css) — no JavaScript. `index` staggers
 * siblings. Browsers without `animation-timeline: view()`, and visitors who
 * prefer reduced motion, see the content immediately.
 */
export default function Reveal({
  children,
  variant = "up",
  index,
  className = "",
}: {
  children: ReactNode;
  variant?: keyof typeof variants;
  index?: number;
  className?: string;
}) {
  return (
    <div
      className={`${variants[variant]} ${className}`}
      style={index ? ({ "--i": index } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
