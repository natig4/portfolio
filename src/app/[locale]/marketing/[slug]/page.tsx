import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getFormatter,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { LuArrowLeft, LuArrowRight, LuCheck } from "react-icons/lu";
import { Link, type AppLocale } from "@/i18n/routing";
import {
  getHeadlineMetric,
  getMarketingCase,
  getNextMarketingCase,
  isMarketingSlug,
  marketingCases,
  type Metric,
  type MetricId,
} from "@/data/marketing";
import type { ChannelId } from "@/lib/channels";
import { formatMetricHeadline, formatPeriod } from "@/lib/metrics";
import { localizedUrl, pageMetadata } from "@/lib/metadata";
import { marketingCaseHref, projectHref } from "@/lib/routes";
import { site } from "@/lib/site";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Aurora from "@/components/ui/Aurora";
import CountUp from "@/components/ui/CountUp";
import Reveal from "@/components/ui/Reveal";
import ChannelBadges from "@/components/marketing/ChannelBadges";
import MetricTile from "@/components/marketing/MetricTile";
import RankingTables from "@/components/marketing/RankingTables";
import EvidenceGallery from "@/components/marketing/EvidenceGallery";
import CaseCard from "@/components/marketing/CaseCard";
import CtaBanner from "@/components/shared/CtaBanner";
import JsonLd from "@/components/shared/JsonLd";

type Props = { params: Promise<{ locale: AppLocale; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return marketingCases.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isMarketingSlug(slug)) return {};
  const t = await getTranslations({ locale, namespace: "marketing.cases" });
  const title = t(`${slug}.title`);

  return {
    title,
    ...pageMetadata({
      locale,
      href: marketingCaseHref(slug),
      title,
      description: t(`${slug}.summary`),
    }),
  };
}

const sectionTitle = "text-2xl font-bold tracking-tight sm:text-3xl";

export default async function MarketingCasePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isMarketingSlug(slug)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("marketing");
  const projects = await getTranslations("projects.items");
  const format = await getFormatter();
  const data = getMarketingCase(slug);
  const headline = getHeadlineMetric(data);
  const metrics = data.metrics as readonly (Metric & { id: MetricId })[];
  const period = formatPeriod(format, data.period);
  const previous = formatPeriod(format, data.comparisonPeriod);
  const approach = t.raw(`cases.${slug}.approach`) as string[];
  const next = getNextMarketingCase(slug);

  // Multi-channel cases show their metrics grouped by platform.
  const groups: { channel?: ChannelId; metrics: typeof metrics }[] =
    data.channels.length > 1
      ? data.channels.map((channel) => ({
          channel,
          metrics: metrics.filter((m) => m.channel === channel),
        }))
      : [{ metrics }];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: t(`cases.${slug}.title`),
          description: t(`cases.${slug}.summary`),
          url: localizedUrl(marketingCaseHref(slug), locale),
          inLanguage: locale,
          datePublished: data.period.end,
          author: { "@id": `${site.url}/#organization` },
          publisher: {
            "@type": "Organization",
            name: site.company,
            url: site.url,
          },
        }}
      />

      <header className='section-ink relative overflow-clip'>
        <Aurora />
        <div
          className='bg-grid pointer-events-none absolute inset-0 opacity-40'
          aria-hidden='true'
        />
        <Container className='relative pt-10 pb-16 sm:pt-14 sm:pb-24'>
          <Link
            href='/marketing'
            className='inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground'
          >
            <LuArrowLeft
              className='size-4 rtl:-scale-x-100'
              aria-hidden='true'
            />
            {t("labels.backToResults")}
          </Link>

          <div className='mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end'>
            <div className='max-w-3xl'>
              <Eyebrow>{t(`objectives.${data.objective}`)}</Eyebrow>
              <h1 className='mt-5 text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl lg:text-6xl'>
                {t(`cases.${slug}.title`)}
              </h1>
              <p className='mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl'>
                {t(`cases.${slug}.summary`)}
              </p>
              <div className='mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground'>
                <span className='font-medium text-foreground'>
                  {t(`cases.${slug}.client`)}
                </span>
                <ChannelBadges channels={data.channels} />
              </div>
            </div>

            <div className='rounded-3xl border border-border bg-surface/80 p-7 sm:p-9 lg:min-w-72'>
              <p className='text-6xl font-bold tracking-tight text-growth sm:text-7xl'>
                <CountUp text={formatMetricHeadline(format, headline)} />
              </p>
              <p className='mt-3 font-medium'>
                {t(`metrics.${headline.id}`)}
              </p>
            </div>
          </div>
        </Container>
      </header>

      <section aria-labelledby='results-title' className='py-16 sm:py-24'>
        <Container>
          <h2 id='results-title' className={sectionTitle}>
            {t("labels.results")}
          </h2>
          <div className='mt-8 space-y-10'>
            {groups.map(({ channel, metrics: items }) => (
              <div key={channel ?? "all"}>
                {channel && (
                  <h3 className='mb-4 text-lg font-bold'>
                    {t(`channels.${channel}`)}
                  </h3>
                )}
                <dl className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                  {items.map((metric) => (
                    <MetricTile key={metric.id} metric={metric} />
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section
        aria-label={t("labels.story")}
        className='border-y border-border bg-surface/60 py-16 sm:py-24'
      >
        <Container className='grid gap-12 lg:grid-cols-3 lg:gap-10'>
          <Reveal>
            <h2 className={sectionTitle}>{t("labels.challenge")}</h2>
            <p className='mt-4 text-lg leading-relaxed text-foreground/85'>
              {t(`cases.${slug}.challenge`)}
            </p>
          </Reveal>
          <Reveal index={1}>
            <h2 className={sectionTitle}>{t("labels.approach")}</h2>
            <ul className='mt-4 space-y-3'>
              {approach.map((step) => (
                <li key={step} className='flex gap-3 leading-relaxed'>
                  <LuCheck
                    className='mt-1 size-4 shrink-0 text-accent'
                    aria-hidden='true'
                  />
                  {step}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal index={2}>
            <h2 className={sectionTitle}>{t("labels.result")}</h2>
            <p className='mt-4 border-s-2 border-accent ps-5 text-lg leading-relaxed'>
              {t(`cases.${slug}.result`)}
            </p>
          </Reveal>
        </Container>
      </section>

      {"rankings" in data && (
        <section aria-labelledby='rankings-title' className='py-16 sm:py-24'>
          <Container>
            <h2 id='rankings-title' className={sectionTitle}>
              {t("labels.rankings")}
            </h2>
            <div className='mt-8'>
              <RankingTables data={data} />
            </div>
          </Container>
        </section>
      )}

      {data.evidence.length > 0 && (
        <section aria-labelledby='evidence-title' className='py-16 sm:py-24'>
          <Container>
            <h2 id='evidence-title' className={sectionTitle}>
              {t("labels.evidence")}
            </h2>
            <p className='mt-3 max-w-2xl text-muted-foreground'>
              {t("labels.evidenceNote")}
            </p>
            <div className='mt-8'>
              <EvidenceGallery evidence={data.evidence} />
            </div>
          </Container>
        </section>
      )}

      <Container>
        <aside
          aria-labelledby='source-title'
          className='rounded-2xl border border-border bg-surface p-6 text-sm leading-relaxed text-muted-foreground'
        >
          <h2 id='source-title' className='mb-2 font-semibold text-foreground'>
            {t("labels.source")}
          </h2>
          {t(`cases.${slug}.footnote`, { period, previous })}
        </aside>

        {"relatedProject" in data && (
          <Link
            href={projectHref(data.relatedProject)}
            className='group mt-6 inline-flex items-center gap-1.5 font-semibold text-accent hover:text-accent-hover'
          >
            {t("labels.viewProject", {
              project: projects(`${data.relatedProject}.title`),
            })}
            <LuArrowRight
              className='size-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1'
              aria-hidden='true'
            />
          </Link>
        )}
      </Container>

      <section aria-labelledby='next-title' className='pt-20 sm:pt-28'>
        <Container>
          <h2 id='next-title' className={sectionTitle}>
            {t("labels.nextCase")}
          </h2>
          <div className='mt-8 max-w-md'>
            <CaseCard data={next} />
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
