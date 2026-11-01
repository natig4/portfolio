import type { ReactNode } from "react";

/**
 * Fades content up as it scrolls into view using a CSS scroll-driven animation
 * (`.reveal` in globals.css) — no JavaScript. Browsers without
 * `animation-timeline: view()`, and visitors who prefer reduced motion, see the
 * content immediately.
 */
export default function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`reveal ${className}`}>{children}</div>;
}
