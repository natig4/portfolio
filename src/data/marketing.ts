import type { StaticImageData } from "next/image";
import type { AppLocale } from "@/i18n/routing";
import type { ProjectSlug } from "./projects";
import quarterlyGrowthEn from "@/assets/marketing/quarterly-growth-en.png";
import quarterlyGrowthHe from "@/assets/marketing/quarterly-growth-he.png";

type Metric = {
  /** Label key in `marketing.metrics`. */
  id: string;
  /** Percentage change vs. the comparison period. Omit to headline `to` instead. */
  change?: number;
  /** Raw values for the comparison and current periods. */
  from?: number;
  to?: number;
  /** For rankings and costs a falling number is the improvement. */
  lowerIsBetter?: boolean;
};

/** Average search position before → after (lower is better). */
type RankingRow = { id: string; from: number; to: number };

type MarketingCase = {
  slug: string;
  /** Label key in `marketing.channels`. */
  channel: "campaign" | "seo";
  relatedProject?: ProjectSlug;
  /** ISO dates; shown in the source footnote. */
  period?: { start: string; end: string };
  comparisonPeriod?: { start: string; end: string };
  metrics: readonly Metric[];
  chart?: Record<AppLocale, StaticImageData>;
  rankings?: {
    /** `term` is the query exactly as searched; `gloss` is shown on non-Hebrew pages. */
    queries: readonly (RankingRow & {
      term: string;
      gloss: string;
      branded?: boolean;
    })[];
    /** Labels live in `marketing.cases.<slug>.pages.<id>`. */
    pages: readonly (RankingRow & { path: string })[];
  };
};

/** Newest first. Copy lives in messages under `marketing.cases.<slug>`. To add a case: append an entry here and its copy in both message files. */
export const marketingCases = [
  {
    slug: "mirk-seo",
    channel: "seo",
    relatedProject: "mirk",
    // Google Search Console, web search, consecutive 28-day periods.
    period: { start: "2026-10-04", end: "2026-10-31" },
    comparisonPeriod: { start: "2026-09-06", end: "2026-10-03" },
    metrics: [
      { id: "impressions", change: 41.1, from: 1150, to: 1623 },
      { id: "averagePosition", from: 16.9, to: 15.5, lowerIsBetter: true },
    ],
    rankings: {
      queries: [
        {
          id: "brandCity",
          term: "קירשנבאום עכו",
          gloss: "Kirshenbaum Akko",
          branded: true,
          from: 4.6,
          to: 1.0,
        },
        {
          id: "brandIron",
          term: "קירשנבאום ברזל",
          gloss: "Kirshenbaum iron",
          branded: true,
          from: 15.5,
          to: 1.0,
        },
        {
          id: "aluminumBending",
          term: "כיפוף פח אלומיניום",
          gloss: "aluminum sheet bending",
          from: 20.1,
          to: 11.7,
        },
        {
          id: "sheetCuttingBending",
          term: "חיתוך וכיפוף פחים",
          gloss: "sheet metal cutting and bending",
          from: 32.2,
          to: 27.8,
        },
      ],
      pages: [
        { id: "nahariya", path: "/areas/nahariya", from: 17.4, to: 8.3 },
        {
          id: "ironSales",
          path: "/departments/iron-sales",
          from: 19.5,
          to: 13.2,
        },
        { id: "areas", path: "/areas", from: 10.0, to: 8.6 },
      ],
    },
  },
  {
    slug: "quarterly-growth",
    channel: "campaign",
    metrics: [
      { id: "users", change: 41.3 },
      { id: "activity", change: 41.2 },
      { id: "newBuyers", change: 31.9 },
      { id: "purchases", change: 51.7 },
    ],
    chart: { en: quarterlyGrowthEn, he: quarterlyGrowthHe },
  },
] as const satisfies readonly MarketingCase[];

/** The marketing case that reports on a project, if any. */
export function getProjectMarketingCase(slug: ProjectSlug) {
  return marketingCases.find(
    (data) => "relatedProject" in data && data.relatedProject === slug,
  );
}

export type MarketingSlug = (typeof marketingCases)[number]["slug"];
