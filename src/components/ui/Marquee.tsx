import type { CSSProperties, ReactNode } from "react";

/**
 * Infinite horizontal strip. Items render twice so the loop is seamless; the
 * copy is hidden from assistive tech. Pauses on hover, reverses in RTL, and is
 * static for reduced motion (see `.marquee` in globals.css).
 */
export default function Marquee({
  items,
  label,
  duration = 40,
  className = "",
}: {
  items: { key: string; node: ReactNode }[];
  label: string;
  duration?: number;
  className?: string;
}) {
  const track = (copy: boolean) => (
    <ul
      className='marquee__track'
      aria-hidden={copy || undefined}
      style={{ "--duration": `${duration}s` } as CSSProperties}
    >
      {items.map(({ key, node }) => (
        <li key={key} className='shrink-0'>
          {node}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`marquee ${className}`} role='region' aria-label={label}>
      {track(false)}
      {track(true)}
    </div>
  );
}
