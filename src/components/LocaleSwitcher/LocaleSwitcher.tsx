"use client";

import { useLocale, useTranslations } from "next-intl";
import { locales } from "@/i18n/routing";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";
import { motion } from "framer-motion";

export default function LocaleSwitcher() {
  const t = useTranslations("localeSwitcher");
  const locale = useLocale();

  const getLocaleLabel = (localeCode: string) => {
    if (localeCode === "he") {
      return "עברית";
    } else if (localeCode === "en") {
      return "English";
    }
    return "Unknown";
  };

  const getLocaleFlag = (localeCode: string) => {
    if (localeCode === "he") {
      return "🇮🇱";
    } else if (localeCode === "en") {
      return "🇺🇸";
    }
    return "🌐";
  };

  return (
    <motion.div
      className='relative'
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className='relative'>
        {/* Glow effect container */}
        <motion.div
          className='absolute inset-0 rounded-lg'
          style={{
            background:
              "linear-gradient(135deg, var(--glow-primary), var(--glow-secondary))",
            opacity: 0,
          }}
          whileHover={{ opacity: 0.15 }}
          transition={{ duration: 0.3 }}
        />

        {/* Main container */}
        <div className='relative bg-surface/80 dark:bg-surface/60 backdrop-blur-lg border border-border/40 rounded-lg px-3 py-2 transition-all duration-200 hover:border-primary/60'>
          {/* Current language display */}
          <div className='flex items-center gap-2 mb-1'>
            <span className='text-lg'>{getLocaleFlag(locale)}</span>
            <span className='text-sm font-medium text-text-secondary'>
              {t("label")}
            </span>
          </div>

          <LocaleSwitcherSelect defaultValue={locale} label={t("label")}>
            {locales.map((cur) => (
              <option
                key={cur}
                value={cur}
                className='bg-surface dark:bg-surface text-text border-none outline-none py-2 px-3 hover:bg-primary/10 transition-colors cursor-pointer'
                style={{ direction: cur === "he" ? "rtl" : "ltr" }}
              >
                <span className='flex items-center gap-2'>
                  {getLocaleFlag(cur)} {getLocaleLabel(cur)}
                </span>
              </option>
            ))}
          </LocaleSwitcherSelect>
        </div>
      </div>
    </motion.div>
  );
}
