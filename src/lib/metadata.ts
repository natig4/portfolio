import type { Metadata } from "next";
import { getPathname, routing, type AppLocale } from "@/i18n/routing";
import { site } from "./site";

type PathHref = Parameters<typeof getPathname>[0]["href"];

export function localizedUrl(href: PathHref, locale: AppLocale) {
  return site.url + getPathname({ href, locale });
}

/** Canonical, hreflang alternates and Open Graph for a page. The page sets `title` itself. */
export function pageMetadata({
  locale,
  href,
  title,
  description,
}: {
  locale: AppLocale;
  href: PathHref;
  title: string;
  description: string;
}): Metadata {
  const url = localizedUrl(href, locale);

  return {
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((l) => [l, localizedUrl(href, l)]),
        ),
        "x-default": localizedUrl(href, routing.defaultLocale),
      },
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: site.company,
      locale: locale === "he" ? "he_IL" : "en_US",
      alternateLocale: locale === "he" ? "en_US" : "he_IL",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
