import type { ReactNode } from "react";

/** Small mono label above headings. Uppercase/tracking only in LTR — Hebrew has no case. */
export default function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-mono text-xs font-medium text-accent ltr:uppercase ltr:tracking-[0.16em] ${className}`}
    >
      {children}
    </p>
  );
}
