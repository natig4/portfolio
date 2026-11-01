import { useTranslations } from "next-intl";
import { site, yearsSince } from "@/lib/site";

export default function Stats() {
  const t = useTranslations("about.stats");
  const stats = [
    { value: `${yearsSince(site.careerStartYear)}+`, label: t("years") },
    { value: "100K+", label: t("users") },
    { value: "10+", label: t("teams") },
    { value: "50+", label: t("trained") },
  ];

  return (
    <dl className='grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border'>
      {stats.map(({ value, label }) => (
        <div key={label} className='bg-surface p-6'>
          <dt className='text-sm leading-snug text-muted-foreground'>
            {label}
          </dt>
          <dd
            className='mt-2 text-3xl font-semibold tracking-tight tabular-nums'
            dir='ltr'
          >
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
