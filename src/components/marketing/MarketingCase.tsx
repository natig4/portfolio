import Image from "next/image";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { LuTrendingDown, LuTrendingUp } from "react-icons/lu";
import type { AppLocale } from "@/i18n/routing";
import type { marketingCases } from "@/data/marketing";

type Case = (typeof marketingCases)[number];

export default function MarketingCase({ data }: { data: Case }) {
  const t = useTranslations("marketing");
  const format = useFormatter();
  const locale = useLocale() as AppLocale;

  return (
    <article
      aria-labelledby={`${data.slug}-title`}
      className='grid gap-8 rounded-2xl border border-border bg-surface p-6 sm:p-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12'
    >
      <div>
        <h2
          id={`${data.slug}-title`}
          className='text-2xl font-semibold tracking-tight'
        >
          {t(`cases.${data.slug}.title`)}
        </h2>
        <p className='mt-3 leading-relaxed text-muted-foreground'>
          {t(`cases.${data.slug}.summary`)}
        </p>

        <dl className='mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border'>
          {data.metrics.map(({ id, change }) => {
            const Icon = change >= 0 ? LuTrendingUp : LuTrendingDown;
            return (
              <div key={id} className='bg-background p-5'>
                <dt className='text-sm text-muted-foreground'>
                  {t(`cases.${data.slug}.metrics.${id}`)}
                </dt>
                <dd className='mt-2 flex items-center gap-2 text-3xl font-semibold tracking-tight tabular-nums'>
                  <Icon
                    className={`size-5 ${change >= 0 ? "text-success" : "text-warning"}`}
                    aria-hidden='true'
                  />
                  <span dir='ltr'>
                    {format.number(change / 100, {
                      style: "percent",
                      maximumFractionDigits: 1,
                      signDisplay: "exceptZero",
                    })}
                  </span>
                </dd>
                <dd className='mt-1 text-xs text-muted-foreground'>
                  {t("labels.comparison")}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>

      {"chart" in data && (
        <figure className='self-center'>
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
    </article>
  );
}
