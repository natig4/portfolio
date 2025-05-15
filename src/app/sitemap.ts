import { MetadataRoute } from "next";
import { host } from "@/config";
import { getPathname, locales, pages, routing } from "@/i18n/routing";
import { Locale } from "next-intl";

export default function sitemap(): MetadataRoute.Sitemap {
  const date = new Date();

  return pages.map((page) => {
    const entry = getEntry(page);

    return {
      ...entry,
      lastModified: date,
      changeFrequency: page === "/" ? "weekly" : "monthly",
      priority: page === "/" ? 1 : 0.8,
    };
  });
}

type Href = Parameters<typeof getPathname>[0]["href"];

function getEntry(href: Href) {
  return {
    url: getUrl(href, routing.defaultLocale),
    alternates: {
      languages: Object.fromEntries(
        locales.map((locale) => [locale, getUrl(href, locale)])
      ),
    },
  };
}

function getUrl(href: Href, locale: Locale) {
  const pathname = getPathname({ locale, href });
  return `${host}/${locale}${pathname === "/" ? "" : pathname}`;
}
