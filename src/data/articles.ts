import type { AppLocale } from "@/i18n/routing";

/** Newest first. Title and excerpt live in messages under `articles.items.<slug>`. */
export const articles = [
  {
    slug: "angular-event-buffer",
    url: "https://medium.com/@nati_g4/building-an-efficient-event-buffer-service-in-angular-with-rxjs-f4110135f9d7",
    publishedAt: "2025-05-13",
    lang: "en",
  },
] as const satisfies readonly {
  slug: string;
  url: string;
  publishedAt: string;
  lang: AppLocale;
}[];
