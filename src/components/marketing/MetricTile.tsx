import { useFormatter, useTranslations } from "next-intl";
import { LuArrowRight, LuTrendingDown, LuTrendingUp } from "react-icons/lu";
import type { Metric, MetricId } from "@/data/marketing";
import {
  formatMetricHeadline,
  formatMetricValue,
  isImprovement,
  metricChange,
} from "@/lib/metrics";
import CountUp from "@/components/ui/CountUp";

/**
 * One result inside a `<dl>`: label, big number with direction (icon + text,
 * never colour alone) and the two period values. The periods themselves are
 * stated once in the page's source note.
 */
export default function MetricTile({
  metric,
}: {
  metric: Metric & { id: MetricId };
}) {
  const t = useTranslations("marketing");
  const format = useFormatter();
  const change = metricChange(metric);
  const improved = isImprovement(metric);
  // The arrow follows the number; the colour says whether that's good.
  const Icon = (change ?? 0) >= 0 ? LuTrendingUp : LuTrendingDown;
  const { from, to, unit } = metric;
  const hasValues = from !== undefined && to !== undefined;

  return (
    <div className='flex flex-col rounded-2xl border border-border bg-surface p-5 sm:p-6'>
      <dt className='text-sm font-medium text-muted-foreground'>
        {t(`metrics.${metric.id}`)}
      </dt>
      <dd className='mt-3 flex items-center gap-2.5 text-4xl font-bold tracking-tight'>
        {change !== undefined && (
          <>
            <Icon
              className={`size-6 shrink-0 ${improved ? "text-growth" : "text-warning"}`}
              aria-hidden='true'
            />
            <span className='sr-only'>
              {t(improved ? "labels.improved" : "labels.declined")}:
            </span>
          </>
        )}
        <CountUp text={formatMetricHeadline(format, metric)} />
      </dd>
      {hasValues && (
        <dd className='mt-2 text-sm text-muted-foreground'>
          <span aria-hidden='true' className='inline-flex items-center gap-1.5'>
            <bdi>{formatMetricValue(format, from, unit)}</bdi>
            <LuArrowRight className='size-3.5 rtl:-scale-x-100' />
            <bdi className='font-medium text-foreground'>
              {formatMetricValue(format, to, unit)}
            </bdi>
          </span>
          <span className='sr-only'>
            {t("labels.fromTo", {
              from: formatMetricValue(format, from, unit),
              to: formatMetricValue(format, to, unit),
            })}
          </span>
        </dd>
      )}
    </div>
  );
}
