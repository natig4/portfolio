import type { ProjectSlug } from "@/data/projects";
import type { MarketingSlug } from "@/data/marketing";

export function projectHref(slug: ProjectSlug) {
  return { pathname: "/projects/[slug]", params: { slug } } as const;
}

export function marketingCaseHref(slug: MarketingSlug) {
  return { pathname: "/marketing/[slug]", params: { slug } } as const;
}
