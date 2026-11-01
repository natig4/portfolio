import en from "../../../../../messages/en.json";
import { getProjectShots } from "@/data/project-images";
import { getProject, isProjectSlug, projects } from "@/data/projects";
import { ogSize, renderOgImage, screenshotDataUrl } from "@/lib/og";

export const alt = "Case study by New Generation SW";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isProjectSlug(slug)) return new Response("Not found", { status: 404 });

  // English copy in every locale (see lib/og.tsx).
  const copy = en.projects.items[slug];
  const project = getProject(slug);

  return renderOgImage({
    eyebrow: `${en.projects.kind[project.kind]} · ${copy.sector}`,
    title: copy.title,
    description: copy.tagline,
    screenshots: getProjectShots(slug) ? [await screenshotDataUrl(slug)] : [],
  });
}
