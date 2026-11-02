import { useFormatter, useTranslations } from "next-intl";
import { getHeadlineMetric, getMarketingCase } from "@/data/marketing";
import { formatMetricHeadline } from "@/lib/metrics";
import { site, yearsSince } from "@/lib/site";
import CountUp from "@/components/ui/CountUp";

export default function Stats() {
  const t = useTranslations("about.stats");
  const format = useFormatter();
  const stats = [
    { key: "years", value: `${yearsSince(site.careerStartYear)}+`, label: t("years") },
    { key: "saved", value: "$1M+", label: t("saved") },
    {
      key: "purchaseValue",
      value: formatMetricHeadline(
        format,
        getHeadlineMetric(getMarketingCase("ecommerce-growth")),
      ),
      label: t("purchaseValue"),
    },
    { key: "google", value: "#1", label: t("google") },
  ];

  return (
    <dl className='grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border'>
      {stats.map(({ key, value, label }) => (
        <div key={key} className='flex flex-col bg-surface p-6'>
          <dt className='order-2 mt-2 text-sm leading-snug text-muted-foreground'>
            {label}
          </dt>
          <dd className='text-4xl font-bold tracking-tight text-accent'>
            <CountUp text={value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
