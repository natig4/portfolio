import { getTech, type TechId } from "@/lib/tech";

export default function TechChip({ id }: { id: TechId }) {
  const { label, icon: Icon } = getTech(id);

  return (
    <span
      dir='ltr'
      className='inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-medium text-muted-foreground'
    >
      {Icon && <Icon className='size-3.5 shrink-0' aria-hidden='true' />}
      {label}
    </span>
  );
}
