import type { ReactNode } from "react";
import Image from "next/image";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import {
  LuArrowDown,
  LuArrowRight,
  LuArrowUp,
  LuTrendingDown,
  LuTrendingUp,
} from "react-icons/lu";
import { Link, type AppLocale } from "@/i18n/routing";
import type { marketingCases } from "@/data/marketing";
import { projectHref } from "@/lib/routes";
import Eyebrow from "@/components/ui/Eyebrow";

type Case = (typeof marketingCases)[number];
type Metric = Case["metrics"][number];
type RankedCase = Extract<Case, { rankings: object }>;

/** Widened view of a metric: optional fields are absent on some literal members. */
type MetricValues = {
  change?: number;
  from?: number;
  to?: number;
  lowerIsBetter?: boolean;
};

const oneDecimal = { maximumFractionDigits: 1 } as const;
const position = { minimumFractionDigits: 1, maximumFractionDigits: 1 } as const;

function isImprovement({ change, from = 0, to = 0, lowerIsBetter }: MetricValues) {
  const delta = change ?? to - from;
  return lowerIsBetter ? delta <= 0 : delta >= 0;
}

export default function MarketingCase({ data }: { data: Case }) {
  const t = useTranslations("marketing");
  const projects = useTranslations("projects.items");
  const format = useFormatter();
  const locale = useLocale() as AppLocale;

  const range = (period: { start: string; end: string }) =>
    format.dateTimeRange(new Date(period.start), new Date(period.end), {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <article
      id={data.slug}
      aria-labelledby={`${data.slug}-title`}
      className='grid scroll-mt-[calc(var(--header-height)+1rem)] gap-8 rounded-2xl border border-border bg-surface p-4 sm:p-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12'
    >
      <div className='min-w-0'>
        <Eyebrow>{t(`channels.${data.channel}`)}</Eyebrow>
        <h2
          id={`${data.slug}-title`}
          className='mt-3 text-2xl font-semibold tracking-tight'
        >
          {t(`cases.${data.slug}.title`)}
        </h2>
        <p className='mt-3 leading-relaxed text-muted-foreground'>
          {t(`cases.${data.slug}.summary`)}
        </p>

        <dl className='mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border'>
          {(data.metrics as readonly Metric[]).map((metric) => {
            const { change, from, to } = metric as MetricValues;
            const improved = isImprovement(metric);
            const Icon = improved ? LuTrendingUp : LuTrendingDown;
            return (
              <div key={metric.id} className='bg-background p-4 sm:p-5'>
                <dt className='text-sm text-muted-foreground'>
                  {t(`metrics.${metric.id}`)}
                </dt>
                <dd className='mt-2 flex items-center gap-2 text-2xl font-semibold sm:text-3xl tracking-tight'>
                  <Icon
                    className={`size-5 shrink-0 ${improved ? "text-success" : "text-warning"}`}
                    aria-hidden='true'
                  />
                  <span className='sr-only'>
                    {t(improved ? "labels.improved" : "labels.declined")}:
                  </span>
                  <span dir='ltr'>
                    {change !== undefined
                      ? format.number(change / 100, {
                          style: "percent",
                          ...oneDecimal,
                          signDisplay: "exceptZero",
                        })
                      : format.number(to ?? 0, oneDecimal)}
                  </span>
                </dd>
                {from !== undefined && to !== undefined && (
                  <dd className='mt-1.5 text-sm text-muted-foreground'>
                    <span aria-hidden='true' className='inline-flex items-center gap-1.5'>
                      <bdi>{format.number(from, oneDecimal)}</bdi>
                      <LuArrowRight className='size-3.5 rtl:-scale-x-100' />
                      <bdi>{format.number(to, oneDecimal)}</bdi>
                    </span>
                    <span className='sr-only'>
                      {t("labels.fromTo", {
                        from: format.number(from, oneDecimal),
                        to: format.number(to, oneDecimal),
                      })}
                    </span>
                  </dd>
                )}
                <dd className='mt-1 text-xs text-muted-foreground'>
                  {t(`cases.${data.slug}.comparison`)}
                </dd>
              </div>
            );
          })}
        </dl>

        {"relatedProject" in data && (
          <Link
            href={projectHref(data.relatedProject)}
            className='group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover'
          >
            {t("labels.viewProject", {
              project: projects(`${data.relatedProject}.title`),
            })}
            <LuArrowRight
              className='size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5'
              aria-hidden='true'
            />
          </Link>
        )}
      </div>

      {"chart" in data && (
        <figure className='min-w-0 self-center'>
          <div className='overflow-hidden rounded-xl border border-border bg-white p-3'>
            <Image
              src={data.chart[locale]}
              alt={t(`cases.${data.slug}.chartAlt`)}
              sizes='(min-width: 1024px) 640px, 100vw'
              quality={85}
              placeholder='blur'
              className='h-auto w-full'
            />
          </div>
          <figcaption className='mt-3 text-center text-sm text-muted-foreground'>
            {t(`cases.${data.slug}.chartCaption`)}
          </figcaption>
        </figure>
      )}

      {"rankings" in data && <Rankings data={data} />}

      {"period" in data && (
        <p className='border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground lg:col-span-2'>
          {t(`cases.${data.slug}.footnote`, {
            period: range(data.period),
            previous: range(data.comparisonPeriod),
          })}
        </p>
      )}
    </article>
  );
}

/** Before/after average search positions for the case's queries and pages. */
function Rankings({ data }: { data: RankedCase }) {
  const t = useTranslations("marketing");
  const locale = useLocale() as AppLocale;
  const { queries, pages } = data.rankings;

  return (
    <div className='min-w-0 space-y-6'>
      <RankingTable
        caption={t("labels.queries")}
        rowHeader={t("labels.query")}
        rows={queries.map((row) => ({
          ...row,
          label: (
            <>
              <bdi lang='he' dir='rtl'>
                {row.term}
              </bdi>
              {"branded" in row && (
                <span className='ms-2 inline-block rounded-full border border-border px-2 py-0.5 align-middle text-[11px] font-medium text-muted-foreground'>
                  {t("labels.branded")}
                </span>
              )}
            </>
          ),
          detail: locale === "he" ? undefined : row.gloss,
        }))}
      />
      <RankingTable
        caption={t("labels.pages")}
        rowHeader={t("labels.page")}
        rows={pages.map((row) => ({
          ...row,
          label: t(`cases.${data.slug}.pages.${row.id}`),
          detail: <bdi dir='ltr'>{row.path}</bdi>,
          mono: true,
        }))}
      />
    </div>
  );
}

function RankingTable({
  caption,
  rowHeader,
  rows,
}: {
  caption: string;
  rowHeader: string;
  rows: {
    id: string;
    from: number;
    to: number;
    label: ReactNode;
    detail?: ReactNode;
    mono?: boolean;
  }[];
}) {
  const t = useTranslations("marketing.labels");
  const format = useFormatter();
  const cell = "px-3 py-3 text-end tabular-nums sm:px-4";

  return (
    <div className='overflow-x-auto rounded-xl border border-border bg-background'>
      <table className='w-full text-sm'>
        <caption className='border-b border-border px-3 py-3 text-start font-medium sm:px-4'>
          {caption}
        </caption>
        <thead className='text-xs text-muted-foreground'>
          <tr className='border-b border-border'>
            <th scope='col' className='px-3 py-2.5 text-start font-medium sm:px-4'>
              {rowHeader}
            </th>
            <th scope='col' className='px-3 py-2.5 text-end font-medium sm:px-4'>
              {t("before")}
            </th>
            <th scope='col' className='px-3 py-2.5 text-end font-medium sm:px-4'>
              {t("after")}
            </th>
            <th scope='col' className='px-3 py-2.5 text-end font-medium sm:px-4'>
              {t("gain")}
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-border'>
          {rows.map(({ id, from, to, label, detail, mono }) => {
            // Positions: a smaller number is a higher ranking.
            const gain = from - to;
            const Icon = gain >= 0 ? LuArrowUp : LuArrowDown;
            return (
              <tr key={id}>
                <th scope='row' className='px-3 py-3 text-start font-normal sm:px-4'>
                  {label}
                  {detail && (
                    <span
                      className={`mt-0.5 block text-xs text-muted-foreground ${mono ? "font-mono [overflow-wrap:anywhere]" : ""}`}
                    >
                      {detail}
                    </span>
                  )}
                </th>
                <td className={`${cell} text-muted-foreground`}>
                  {format.number(from, position)}
                </td>
                <td className={`${cell} font-semibold`}>
                  {format.number(to, position)}
                </td>
                <td className={cell}>
                  <span className='inline-flex items-center gap-1 font-medium'>
                    <Icon
                      className={`size-3.5 ${gain >= 0 ? "text-success" : "text-warning"}`}
                      aria-hidden='true'
                    />
                    <span className='sr-only'>
                      {t(gain >= 0 ? "improved" : "declined")}:
                    </span>
                    {format.number(Math.abs(gain), position)}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
