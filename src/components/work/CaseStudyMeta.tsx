import type { TechId } from "@/lib/tech";
import TechList from "@/components/ui/TechList";

const termClass =
  "text-xs font-semibold text-muted-foreground ltr:uppercase ltr:tracking-wider";

export default function CaseStudyMeta({
  items,
  stackLabel,
  stack,
}: {
  items: { label: string; value: string }[];
  stackLabel: string;
  stack: readonly TechId[];
}) {
  return (
    <dl className='divide-y divide-border rounded-xl border border-border bg-surface'>
      {items.map(({ label, value }) => (
        <div key={label} className='px-5 py-4'>
          <dt className={termClass}>{label}</dt>
          <dd className='mt-1 text-sm font-medium'>{value}</dd>
        </div>
      ))}
      <div className='px-5 py-4'>
        <dt className={termClass}>{stackLabel}</dt>
        <dd className='mt-3'>
          <TechList ids={stack} />
        </dd>
      </div>
    </dl>
  );
}
