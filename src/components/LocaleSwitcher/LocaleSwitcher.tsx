"use client";

import { useLocale, useTranslations } from "next-intl";
import { locales } from "@/i18n/routing";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";

export default function LocaleSwitcher() {
  const t = useTranslations("localeSwitcher");
  const locale = useLocale();

  const getLocaleLabel = (localeCode: string) => {
    if (localeCode === "he") {
      return "🇮🇱 עברית";
    } else if (localeCode === "en") {
      return "🇺🇸 ENGLISH";
    }
    return "Unknown";
  };

  return (
    <div className='relative'>
      <LocaleSwitcherSelect defaultValue={locale} label={t("label")}>
        {locales.map((cur) => (
          <option
            key={cur}
            value={cur}
            className='bg-gray-800 border-none outline-none'
          >
            {getLocaleLabel(cur)}
          </option>
        ))}
      </LocaleSwitcherSelect>
    </div>
  );
}
