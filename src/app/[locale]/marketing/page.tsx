import type { Metadata } from "next";
import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server";
import type { IconType } from "react-icons";
import { LuChartLine } from "react-icons/lu";
import type { AppLocale } from "@/i18n/routing";
import { getHeadlineMetric, getMarketingCase } from "@/data/marketing";
import { CHANNELS } from "@/lib/channels";
import { formatMetricHeadline } from "@/lib/metrics";
import { pageMetadata } from "@/lib/metadata";
import { marketingCaseHref } from "@/lib/routes";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import ResultsStrip from "@/components/marketing/ResultsStrip";
import CaseBrowser from "@/components/marketing/CaseBrowser";
import CtaBanner from "@/components/shared/CtaBanner";

type Props = { params: Promise<{ locale: AppLocale }> };

/** Headline result per case, in the order shown at the top of the page. */
const highlights = [
  "ecommerce-growth",
  "security-leads",
  "watch-coating-leads",
  "dance-school-whatsapp",
] as const;

const services: { id: "googleAds" | "metaAds" | "seo" | "tracking"; icon: IconType }[] = [
  { id: "googleAds", icon: CHANNELS["google-ads"].icon },
  { id: "metaAds", icon: CHANNELS["meta-ads"].icon },
  { id: "seo", icon: CHANNELS.seo.icon },
  { id: "tracking", icon: LuChartLine },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "marketing.page" });

  return {
    title: t("title"),
    ...pageMetadata({
      locale,
      href: "/marketing",
      title: t("title"),
      description: t("description"),
    }),
  };
}

export default async function MarketingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("marketing");
  const format = await getFormatter();

  const results = [
    // Not a period-over-period metric, so it isn't in the case data.
    {
      key: "mirk-seo",
      value: "#1",
      label: `${t("labels.firstOnGoogle")} · ${t("cases.mirk-seo.client")}`,
      href: marketingCaseHref("mirk-seo"),
    },
    ...highlights.map((slug) => {
      const metric = getHeadlineMetric(getMarketingCase(slug));
      return {
        key: slug,
        value: formatMetricHeadline(format, metric),
        label: `${t(`metrics.${metric.id}`)} · ${t(`cases.${slug}.client`)}`,
        href: marketingCaseHref(slug),
      };
    }),
  ];

  return (
    <>
      <PageHeader
        eyebrow={t("page.eyebrow")}
        title={t("page.title")}
        description={t("page.description")}
      >
        <ResultsStrip
          items={results}
          label={t("labels.highlights")}
          className='mt-12'
        />
      </PageHeader>

      <Section
        id='services'
        eyebrow={t("services.eyebrow")}
        title={t("services.title")}
        description={t("services.description")}
      >
        <ul className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {services.map(({ id, icon: Icon }, index) => (
            <li key={id}>
              <Reveal index={index} className='h-full'>
                <div className='glow-card h-full rounded-2xl border border-border bg-surface p-6'>
                  <span className='inline-flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent'>
                    <Icon className='size-5' aria-hidden='true' />
                  </span>
                  <h3 className='mt-5 text-lg font-bold'>
                    {t(`services.items.${id}.title`)}
                  </h3>
                  <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
                    {t(`services.items.${id}.description`)}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id='cases'
        eyebrow={t("browser.eyebrow")}
        title={t("browser.title")}
        description={t("browser.description")}
        className='border-t border-border bg-surface/50'
      >
        <CaseBrowser />
      </Section>

      <CtaBanner showWork={false} />
    </>
  );
}
