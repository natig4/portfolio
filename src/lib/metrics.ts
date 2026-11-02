import type { useFormatter } from "next-intl";
import type { Metric } from "@/data/marketing";

type Formatter = ReturnType<typeof useFormatter>;

const oneDecimal = { minimumFractionDigits: 1, maximumFractionDigits: 1 };

/** % change vs. the comparison period: as recorded, or derived from the two values. */
export function metricChange({ change, from, to }: Metric) {
  if (change !== undefined) return change;
  if (from && to !== undefined) return ((to - from) / from) * 100;
  return undefined;
}

export function isImprovement(metric: Metric) {
  const change = metricChange(metric) ?? 0;
  return metric.lowerIsBetter ? change <= 0 : change >= 0;
}

/** A raw period value: 1,236 · 5.3× · 15.5 */
export function formatMetricValue(
  format: Formatter,
  value: number,
  unit: Metric["unit"] = "count",
) {
  if (unit === "multiplier") return `${format.number(value, oneDecimal)}×`;
  if (unit === "position") return format.number(value, oneDecimal);
  return format.number(value, { maximumFractionDigits: 1 });
}

/** The big number for a metric: +49% · 3.4× · 12 */
export function formatMetricHeadline(format: Formatter, metric: Metric) {
  const change = metricChange(metric);
  const show = metric.show ?? (change !== undefined ? "change" : "value");

  if (show === "ratio" && metric.from && metric.to !== undefined) {
    return `${format.number(metric.to / metric.from, oneDecimal)}×`;
  }
  if (show === "value" && metric.to !== undefined) {
    return formatMetricValue(format, metric.to, metric.unit);
  }
  return format.number((change ?? 0) / 100, {
    style: "percent",
    maximumFractionDigits: Math.abs(change ?? 0) >= 10 ? 0 : 1,
    signDisplay: "exceptZero",
  });
}

/** "1 Aug – 31 Oct 2026" in the active locale. */
export function formatPeriod(
  format: Formatter,
  period: { start: string; end: string },
) {
  return format.dateTimeRange(new Date(period.start), new Date(period.end), {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
