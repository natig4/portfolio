import type { StaticImageData } from "next/image";
import type { ChannelId } from "@/lib/channels";
import type { ProjectSlug } from "./projects";
import ecommerceGoogleCampaigns from "@/assets/marketing/ecommerce-growth/google-campaigns.png";
import ecommerceGoogleTrend from "@/assets/marketing/ecommerce-growth/google-trend.png";
import ecommerceMetaCampaigns from "@/assets/marketing/ecommerce-growth/meta-campaigns.png";
import securityGoogleCampaigns from "@/assets/marketing/security-leads/google-campaigns.png";
import familyLawGoogleTrend from "@/assets/marketing/family-law-traffic/google-trend.png";
import watchMetaCampaigns from "@/assets/marketing/watch-coating-leads/meta-campaigns.png";
import danceMetaCampaigns from "@/assets/marketing/dance-school-whatsapp/meta-campaigns.png";
import legalMetaCampaigns from "@/assets/marketing/legal-leads/meta-campaigns.png";

/*
 * Every number here comes from the platform reports in the private marketing
 * handoff (Google Ads, Meta Ads Manager, Search Console), read 2026-11-02.
 * Clients are anonymous; spend, CPC and CPA are never shown as amounts — only
 * as % change — so no client's budget can be derived.
 */

export type Metric = {
  /** Label key in `marketing.metrics`. */
  id: string;
  /** Values for the comparison and current periods. */
  from?: number;
  to?: number;
  /** % change vs. the comparison period. Derived from from/to when omitted. */
  change?: number;
  /** How from/to are written. */
  unit?: "count" | "multiplier" | "position";
  /** What the big number shows: the % change (default when known), the to/from ratio, or the current value. */
  show?: "change" | "ratio" | "value";
  /** For costs and rankings a falling number is the improvement. */
  lowerIsBetter?: boolean;
  /** Groups metrics in multi-channel cases. */
  channel?: ChannelId;
};

/** Average search position before → after (lower is better). */
type RankingRow = { id: string; from: number; to: number };

type Evidence = {
  /** Copy lives in `marketing.evidence.<id>`. */
  id: "googleCampaigns" | "googleTrend" | "metaCampaigns";
  image: StaticImageData;
};

type MarketingCase = {
  slug: string;
  featured: boolean;
  channels: readonly ChannelId[];
  /** Label key in `marketing.objectives`. */
  objective: "sales" | "leads" | "messages" | "traffic" | "visibility";
  period: { start: string; end: string };
  comparisonPeriod: { start: string; end: string };
  /** The metric shown large on cards and at the top of the case page. */
  headline: string;
  metrics: readonly Metric[];
  evidence: readonly Evidence[];
  relatedProject?: ProjectSlug;
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

/** Strongest first. Copy lives in messages under `marketing.cases.<slug>`. */
export const marketingCases = [
  {
    slug: "ecommerce-growth",
    featured: true,
    channels: ["google-ads", "meta-ads"],
    objective: "sales",
    period: { start: "2026-08-01", end: "2026-10-31" },
    comparisonPeriod: { start: "2026-05-01", end: "2026-07-31" },
    headline: "purchaseValue",
    metrics: [
      // Google Ads, one GA4-imported purchase action in both periods.
      { id: "purchaseValue", change: 49.0, channel: "google-ads" },
      { id: "purchases", from: 278, to: 433, change: 55.9, channel: "google-ads" },
      {
        id: "roas",
        from: 3.2,
        to: 5.3,
        unit: "multiplier",
        show: "value",
        channel: "google-ads",
      },
      { id: "adSpend", change: -10.3, lowerIsBetter: true, channel: "google-ads" },
      // Meta Ads, individual campaigns.
      { id: "videoPurchases", from: 57, to: 112, channel: "meta-ads" },
      {
        id: "costPerPurchase",
        change: -43.9,
        lowerIsBetter: true,
        channel: "meta-ads",
      },
      { id: "productPurchases", from: 41, to: 117, channel: "meta-ads" },
    ],
    evidence: [
      { id: "googleCampaigns", image: ecommerceGoogleCampaigns },
      { id: "metaCampaigns", image: ecommerceMetaCampaigns },
      { id: "googleTrend", image: ecommerceGoogleTrend },
    ],
  },
  {
    slug: "security-leads",
    featured: true,
    channels: ["google-ads"],
    objective: "leads",
    period: { start: "2026-10-01", end: "2026-10-31" },
    comparisonPeriod: { start: "2026-09-01", end: "2026-09-30" },
    headline: "costPerClick",
    metrics: [
      { id: "costPerClick", change: -53.0, lowerIsBetter: true },
      { id: "clicks", from: 451, to: 1236 },
      { id: "formLeads", to: 12, show: "value" },
    ],
    evidence: [{ id: "googleCampaigns", image: securityGoogleCampaigns }],
  },
  {
    slug: "mirk-seo",
    featured: true,
    channels: ["seo"],
    objective: "visibility",
    relatedProject: "mirk",
    // Google Search Console, web search, consecutive 28-day periods.
    period: { start: "2026-10-04", end: "2026-10-31" },
    comparisonPeriod: { start: "2026-09-06", end: "2026-10-03" },
    headline: "impressions",
    metrics: [
      { id: "impressions", from: 1150, to: 1623, change: 41.1 },
      {
        id: "averagePosition",
        from: 16.9,
        to: 15.5,
        unit: "position",
        show: "value",
        lowerIsBetter: true,
      },
    ],
    evidence: [],
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
    slug: "watch-coating-leads",
    featured: false,
    channels: ["meta-ads"],
    objective: "leads",
    period: { start: "2026-08-01", end: "2026-10-31" },
    comparisonPeriod: { start: "2026-05-01", end: "2026-07-31" },
    headline: "formLeads",
    metrics: [{ id: "formLeads", from: 233, to: 377 }],
    evidence: [{ id: "metaCampaigns", image: watchMetaCampaigns }],
  },
  {
    slug: "dance-school-whatsapp",
    featured: false,
    channels: ["meta-ads"],
    objective: "messages",
    period: { start: "2026-08-01", end: "2026-10-31" },
    comparisonPeriod: { start: "2026-05-01", end: "2026-07-31" },
    headline: "conversations",
    metrics: [{ id: "conversations", from: 140, to: 473, show: "ratio" }],
    evidence: [{ id: "metaCampaigns", image: danceMetaCampaigns }],
  },
  {
    slug: "family-law-traffic",
    featured: false,
    channels: ["google-ads"],
    objective: "traffic",
    period: { start: "2026-09-01", end: "2026-09-30" },
    comparisonPeriod: { start: "2026-08-01", end: "2026-08-31" },
    headline: "clicks",
    metrics: [
      { id: "clicks", from: 938, to: 2369, show: "ratio" },
      { id: "impressions", from: 65035, to: 272520, show: "ratio" },
      // Account spend ÷ clicks for each month (spend itself stays private).
      { id: "costPerClick", change: -60.4, lowerIsBetter: true },
    ],
    evidence: [{ id: "googleTrend", image: familyLawGoogleTrend }],
  },
  {
    slug: "legal-leads",
    featured: false,
    channels: ["meta-ads"],
    objective: "leads",
    period: { start: "2026-08-01", end: "2026-10-31" },
    comparisonPeriod: { start: "2026-05-01", end: "2026-07-31" },
    headline: "formLeads",
    metrics: [{ id: "formLeads", from: 122, to: 139 }],
    evidence: [{ id: "metaCampaigns", image: legalMetaCampaigns }],
  },
] as const satisfies readonly MarketingCase[];

export type MarketingCaseData = (typeof marketingCases)[number];
export type MarketingSlug = MarketingCaseData["slug"];
export type MetricId = MarketingCaseData["metrics"][number]["id"];

export function isMarketingSlug(slug: string): slug is MarketingSlug {
  return marketingCases.some((data) => data.slug === slug);
}

export function getMarketingCase(slug: MarketingSlug): MarketingCaseData {
  return marketingCases.find((data) => data.slug === slug)!;
}

export function getNextMarketingCase(slug: MarketingSlug): MarketingCaseData {
  const index = marketingCases.findIndex((data) => data.slug === slug);
  return marketingCases[(index + 1) % marketingCases.length];
}

export function getFeaturedMarketingCases() {
  return marketingCases.filter((data) => data.featured);
}

/** The headline metric of a case, widened for formatting. */
export function getHeadlineMetric(data: MarketingCaseData): Metric & {
  id: MetricId;
} {
  return (data.metrics as readonly (Metric & { id: MetricId })[]).find(
    (metric) => metric.id === data.headline,
  )!;
}

/** The marketing case that reports on a project, if any. */
export function getProjectMarketingCase(slug: ProjectSlug) {
  return marketingCases.find(
    (data) => "relatedProject" in data && data.relatedProject === slug,
  );
}
