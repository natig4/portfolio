import type { ProjectSlug } from "@/data/projects";

export function projectHref(slug: ProjectSlug) {
  return { pathname: "/projects/[slug]", params: { slug } } as const;
}
