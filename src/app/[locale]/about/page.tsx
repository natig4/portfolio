import type { Metadata } from "next";
import {
  getFormatter,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";
import { site, yearsSince } from "@/lib/site";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Stats from "@/components/about/Stats";
import Timeline from "@/components/about/Timeline";
import SkillGroups from "@/components/about/SkillGroups";
import { ButtonLink } from "@/components/ui/Button";
import ResultsStrip from "@/components/marketing/ResultsStrip";
import { getHeadlineMetric, getMarketingCase } from "@/data/marketing";
import { formatMetricHeadline } from "@/lib/metrics";
import { marketingCaseHref } from "@/lib/routes";
import CtaBanner from "@/components/shared/CtaBanner";

type Props = { params: Promise<{ locale: AppLocale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.page" });

  return {
    title: t("eyebrow"),
    ...pageMetadata({
      locale,
      href: "/about",
      title: t("eyebrow"),
      description: t("description"),
    }),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const marketing = await getTranslations("marketing");
  const format = await getFormatter();
  const years = yearsSince(site.careerStartYear);

  const record = (
    [
      "ecommerce-growth",
      "security-leads",
      "watch-coating-leads",
      "dance-school-whatsapp",
    ] as const
  ).map((slug) => {
    const metric = getHeadlineMetric(getMarketingCase(slug));
    return {
      key: slug,
      value: formatMetricHeadline(format, metric),
      label: `${marketing(`metrics.${metric.id}`)} · ${marketing(`cases.${slug}.client`)}`,
      href: marketingCaseHref(slug),
    };
  });

  return (
    <>
      <PageHeader
        eyebrow={t("page.eyebrow")}
        title={t("page.title")}
        description={t("page.description")}
      />

      <Container className='grid gap-12 py-14 sm:py-20 lg:grid-cols-[1.2fr_1fr] lg:gap-16'>
        <section aria-labelledby='story-title' className='max-w-2xl'>
          <h2
            id='story-title'
            className='text-2xl font-semibold tracking-tight'
          >
            {t("intro.title")}
          </h2>
          <div className='mt-5 space-y-5 text-lg leading-relaxed text-foreground/85'>
            <p>{t("intro.p1", { years })}</p>
            <p>{t("intro.p2")}</p>
            <p>{t("intro.p3")}</p>
          </div>
        </section>
        <div className='lg:pt-12'>
          <Stats />
        </div>
      </Container>

      <Section
        id='record'
        ink
        eyebrow={t("record.eyebrow")}
        title={t("record.title")}
        description={t("record.description")}
        actions={
          <ButtonLink href='/marketing' variant='secondary'>
            {t("record.viewAll")}
          </ButtonLink>
        }
      >
        <ResultsStrip items={record} label={t("record.title")} />
      </Section>

      <Section
        id='experience'
        eyebrow={t("experience.eyebrow")}
        title={t("experience.title")}
        className='border-t border-border'
      >
        <div className='max-w-3xl'>
          <Timeline />
        </div>
      </Section>

      <Section
        id='skills'
        eyebrow={t("skills.eyebrow")}
        title={t("skills.title")}
        className='border-t border-border bg-surface'
      >
        <SkillGroups />
      </Section>

      <CtaBanner />
    </>
  );
}
