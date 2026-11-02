import { useFormatter, useTranslations } from "next-intl";
import {
  getFeaturedMarketingCases,
  getHeadlineMetric,
  getMarketingCase,
  type MarketingSlug,
} from "@/data/marketing";
import { formatMetricHeadline } from "@/lib/metrics";
import { marketingCaseHref, projectHref } from "@/lib/routes";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import ResultsStrip from "@/components/marketing/ResultsStrip";
import CaseCard from "@/components/marketing/CaseCard";

/** Headline numbers and featured marketing cases, on an ink band. */
export default function Results() {
  const t = useTranslations("home.results");
  const format = useFormatter();
  const headline = (slug: MarketingSlug) =>
    formatMetricHeadline(format, getHeadlineMetric(getMarketingCase(slug)));

  // The featured cards below carry their own numbers, so the strip shows the other cases.
  const items = [
    {
      key: "leads",
      value: headline("watch-coating-leads"),
      label: t("items.leads"),
      href: marketingCaseHref("watch-coating-leads"),
    },
    {
      key: "conversations",
      value: headline("dance-school-whatsapp"),
      label: t("items.conversations"),
      href: marketingCaseHref("dance-school-whatsapp"),
    },
    {
      key: "google",
      value: "#1",
      label: t("items.google"),
      href: marketingCaseHref("mirk-seo"),
    },
    {
      key: "saved",
      value: "$1M+",
      label: t("items.saved"),
      href: projectHref("reports-manager"),
    },
  ];

  return (
    <Section
      id='results'
      ink
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={t("description")}
      actions={
        <ButtonLink href='/marketing' variant='secondary'>
          {t("viewAll")}
        </ButtonLink>
      }
    >
      <ResultsStrip items={items} label={t("title")} />
      <ul className='mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {getFeaturedMarketingCases().map((data, index) => (
          <li key={data.slug}>
            <Reveal index={index} className='h-full'>
              <CaseCard data={data} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
