"use client";

import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { Link, usePathname, type AppLocale, type Href } from "@/i18n/routing";

// Language names are shown in their own language, so they are not translated.
const LANGUAGES: Record<AppLocale, { short: string; name: string }> = {
  he: { short: "עב", name: "עברית" },
  en: { short: "EN", name: "English" },
};

export default function LocaleSwitcher({
  className = "",
}: {
  className?: string;
}) {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const params = useParams();
  const target: AppLocale = locale === "he" ? "en" : "he";
  const { short, name } = LANGUAGES[target];

  return (
    <Link
      href={{ pathname, params } as Href}
      locale={target}
      hrefLang={target}
      lang={target}
      aria-label={name}
      title={name}
      className={`inline-flex h-10 min-w-10 items-center justify-center rounded-full px-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground ${className}`}
    >
      {short}
    </Link>
  );
}
