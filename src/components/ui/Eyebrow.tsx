import type { ReactNode } from "react";

/** Small label above headings, led by a short gradient rule. Uppercase/tracking only in LTR — Hebrew has no case. */
export default function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-2.5 text-xs font-semibold text-accent ltr:uppercase ltr:tracking-[0.18em] ${className}`}
    >
      <span className='h-0.5 w-6 shrink-0 rounded-full bg-brand' aria-hidden='true' />
      {children}
    </p>
  );
}
