import type { ProjectSlug } from "@/data/projects";
import type { MarketingSlug } from "@/data/marketing";

export function projectHref(slug: ProjectSlug) {
  return { pathname: "/projects/[slug]", params: { slug } } as const;
}

/** A marketing case, anchored on the marketing page. */
export function marketingCaseHref(slug: MarketingSlug) {
  return { pathname: "/marketing", hash: slug } as const;
}
