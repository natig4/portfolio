import { LuArrowUpRight } from "react-icons/lu";
import { Link, type Href } from "@/i18n/routing";
import CountUp from "@/components/ui/CountUp";
import Reveal from "@/components/ui/Reveal";

export type ResultItem = {
  key: string;
  /** Formatted value, e.g. "+49%". */
  value: string;
  label: string;
  href: Href;
};

/** Headline numbers, each linking to its proof. Designed for ink bands. */
export default function ResultsStrip({
  items,
  label,
  className = "",
}: {
  items: ResultItem[];
  label: string;
  className?: string;
}) {
  return (
    <ul
      aria-label={label}
      className={`grid gap-px overflow-clip rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4 ${className}`}
    >
      {items.map(({ key, value, label: itemLabel, href }, index) => (
        <li key={key} className='bg-surface/90'>
          <Reveal index={index} className='h-full'>
            <Link
              href={href}
              className='group flex h-full flex-col p-6 transition-colors hover:bg-muted/60 sm:p-7'
            >
              <span className='text-5xl font-bold tracking-tight text-growth'>
                <CountUp text={value} />
              </span>
              <span className='mt-2 flex items-start justify-between gap-3 text-sm leading-snug text-muted-foreground'>
                {itemLabel}
                <LuArrowUpRight
                  className='size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 rtl:-scale-x-100'
                  aria-hidden='true'
                />
              </span>
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
