import { useTranslations } from "next-intl";

/**
 * Two bars, previous period and current, scaled to the larger value. The
 * numbers are already written next to the tile's headline, so the bars are
 * decorative; they grow in from the inline start the first time they are seen (`.grow-x`).
 */
export default function BeforeAfterBars({
  from,
  to,
}: {
  from: number;
  to: number;
}) {
  const t = useTranslations("marketing.labels");
  const max = Math.max(from, to) || 1;
  const rows = [
    { key: "before", label: t("before"), value: from, bar: "bg-muted-foreground/35" },
    { key: "after", label: t("after"), value: to, bar: "bg-brand" },
  ];

  return (
    <dd className='mt-4 space-y-2' aria-hidden='true'>
      {rows.map(({ key, label, value, bar }) => (
        <div key={key} className='flex items-center gap-3'>
          <span className='w-12 shrink-0 text-xs text-muted-foreground'>
            {label}
          </span>
          <span className='h-2 flex-1 overflow-clip rounded-full bg-muted'>
            <span
              className={`grow-x block h-full rounded-full ${bar}`}
              style={{ width: `${(value / max) * 100}%` }}
            />
          </span>
        </div>
      ))}
    </dd>
  );
}
