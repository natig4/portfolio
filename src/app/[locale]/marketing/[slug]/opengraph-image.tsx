import { createFormatter } from "next-intl";
import en from "../../../../../messages/en.json";
import {
  getHeadlineMetric,
  getMarketingCase,
  isMarketingSlug,
  marketingCases,
} from "@/data/marketing";
import { formatMetricHeadline } from "@/lib/metrics";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Marketing results by New Generation SW";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return marketingCases.map(({ slug }) => ({ slug }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isMarketingSlug(slug)) return new Response("Not found", { status: 404 });

  // English copy in every locale (see lib/og.tsx).
  const copy = en.marketing.cases[slug];
  const data = getMarketingCase(slug);
  const metric = getHeadlineMetric(data);
  const format = createFormatter({ locale: "en", timeZone: "Asia/Jerusalem" });

  return renderOgImage({
    eyebrow: `${en.marketing.objectives[data.objective]} · ${data.channels
      .map((id) => en.marketing.channels[id])
      .join(" + ")}`,
    title: copy.title,
    description: copy.client,
    highlight: {
      value: formatMetricHeadline(format, metric),
      label: en.marketing.metrics[metric.id],
    },
  });
}
