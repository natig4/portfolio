import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { localizedUrl } from "@/lib/metadata";
import { projects } from "@/data/projects";
import { projectHref } from "@/lib/routes";

type Entry = { href: Parameters<typeof localizedUrl>[0]; priority: number };

const entries: Entry[] = [
  { href: "/", priority: 1 },
  { href: "/projects", priority: 0.9 },
  { href: "/about", priority: 0.8 },
  { href: "/marketing", priority: 0.6 },
  { href: "/articles", priority: 0.6 },
  { href: "/contact", priority: 0.8 },
  ...projects.map(({ slug }) => ({ href: projectHref(slug), priority: 0.7 })),
  { href: "/accessibility", priority: 0.2 },
  { href: "/privacy", priority: 0.2 },
  { href: "/terms", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return entries.map(({ href, priority }) => ({
    url: localizedUrl(href, routing.defaultLocale),
    lastModified,
    priority,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, localizedUrl(href, l)]),
      ),
    },
  }));
}
