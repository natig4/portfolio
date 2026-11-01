import type { ReactNode } from "react";

/** Minimal browser chrome. The chrome is always LTR, like a real browser. */
export function BrowserFrame({
  url,
  children,
  className = "",
}: {
  url?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-border bg-surface shadow-[0_1px_2px_rgb(0_0_0/0.04),0_8px_24px_-12px_rgb(0_0_0/0.18)] ${className}`}
    >
      <div
        dir='ltr'
        className='flex h-8 items-center gap-1.5 border-b border-border bg-muted/70 px-3'
        aria-hidden='true'
      >
        <span className='size-2.5 rounded-full bg-muted-foreground/25' />
        <span className='size-2.5 rounded-full bg-muted-foreground/25' />
        <span className='size-2.5 rounded-full bg-muted-foreground/25' />
        {url && (
          <span className='mx-auto max-w-[60%] truncate rounded bg-background/80 px-3 py-0.5 font-mono text-[11px] text-muted-foreground'>
            {url.replace(/^https?:\/\//, "")}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

export function PhoneFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[2rem] border-[6px] border-zinc-900 bg-zinc-900 shadow-[0_12px_32px_-12px_rgb(0_0_0/0.35)] dark:border-zinc-700 ${className}`}
    >
      <div className='overflow-hidden rounded-[1.6rem]'>{children}</div>
    </div>
  );
}
