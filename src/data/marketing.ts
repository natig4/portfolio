import type { StaticImageData } from "next/image";
import type { AppLocale } from "@/i18n/routing";
import quarterlyGrowthEn from "@/assets/marketing/quarterly-growth-en.png";
import quarterlyGrowthHe from "@/assets/marketing/quarterly-growth-he.png";

type MarketingCase = {
  slug: string;
  /** Percentage change vs. the comparison period; labels live in messages. */
  metrics: readonly { id: string; change: number }[];
  chart?: Record<AppLocale, StaticImageData>;
};

/**
 * Newest first. Copy lives in messages under `marketing.cases.<slug>`.
 * To add a case: append an entry here and its copy in both message files.
 */
export const marketingCases = [
  {
    slug: "quarterly-growth",
    metrics: [
      { id: "users", change: 41.3 },
      { id: "activity", change: 41.2 },
      { id: "newBuyers", change: 31.9 },
      { id: "purchases", change: 51.7 },
    ],
    chart: { en: quarterlyGrowthEn, he: quarterlyGrowthHe },
  },
] as const satisfies readonly MarketingCase[];
