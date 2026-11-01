import type { TechId } from "@/lib/tech";
import TechChip from "./TechChip";

export default function TechList({
  ids,
  max,
  moreLabel,
  className = "",
}: {
  ids: readonly TechId[];
  /** Show at most this many chips, then a "+N more" chip. */
  max?: number;
  moreLabel?: (count: number) => string;
  className?: string;
}) {
  const shown = max ? ids.slice(0, max) : ids;
  const hidden = ids.length - shown.length;

  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {shown.map((id) => (
        <li key={id}>
          <TechChip id={id} />
        </li>
      ))}
      {hidden > 0 && moreLabel && (
        <li className='inline-flex items-center px-1 font-mono text-xs text-muted-foreground'>
          {moreLabel(hidden)}
        </li>
      )}
    </ul>
  );
}
