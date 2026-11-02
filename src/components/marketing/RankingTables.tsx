import type { ReactNode } from "react";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { LuArrowDown, LuArrowUp } from "react-icons/lu";
import type { MarketingCaseData } from "@/data/marketing";

type RankedCase = Extract<MarketingCaseData, { rankings: object }>;

const position = { minimumFractionDigits: 1, maximumFractionDigits: 1 } as const;

/** Before/after average search positions for an SEO case's queries and pages. */
export default function RankingTables({ data }: { data: RankedCase }) {
  const t = useTranslations("marketing");
  const locale = useLocale();
  const { queries, pages } = data.rankings;

  return (
    <div className='grid gap-6 lg:grid-cols-2'>
      <RankingTable
        caption={t("labels.queries")}
        rowHeader={t("labels.query")}
        rows={queries.map((row) => ({
          ...row,
          label: (
            <bdi lang='he' dir='rtl'>
              {row.term}
            </bdi>
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
    <div className='min-w-0 overflow-x-auto rounded-2xl border border-border bg-surface'>
      <table className='w-full text-sm'>
        <caption className='border-b border-border px-3 py-3.5 text-start font-semibold sm:px-4'>
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
                      className={`size-3.5 ${gain >= 0 ? "text-growth" : "text-warning"}`}
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
