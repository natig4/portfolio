import type { CSSProperties, ReactNode } from "react";

const variants = {
  up: "reveal",
  scale: "reveal-scale",
  start: "reveal-start",
  end: "reveal-end",
} as const;

/**
 * Animates content in the first time it scrolls into view (`.reveal*` in
 * globals.css, started once by RevealScript), then leaves it in place. `index`
 * staggers siblings. Without JS, and for visitors who prefer reduced motion,
 * the content is shown immediately.
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
