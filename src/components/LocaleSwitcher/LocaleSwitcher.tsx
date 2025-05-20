"use client";

import { useLocale } from "next-intl";
import { locales } from "@/i18n/routing";
import { useState, useRef } from "react";
import { useRouter, usePathname } from "@/i18n/routing";
import { Locale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getLocaleInfo = (localeCode: string) => {
    const localeMap = {
      he: { label: "עברית", flag: "🇮🇱" },
      en: { label: "English", flag: "🇺🇸" },
    };
    return (
      localeMap[localeCode as keyof typeof localeMap] || {
        label: "Unknown",
        flag: "🌐",
      }
    );
  };

  const currentLocale = getLocaleInfo(locale);

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }

    setIsOpen(false);

    const currentUrl = new URL(window.location.href);
    const currentParams = Object.fromEntries(currentUrl.searchParams.entries());

    router.push(
      {
        pathname,
        query: currentParams,
      },
      {
        locale: newLocale,
        scroll: false,
      }
    );
  };

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 z-40' onClick={handleClickOutside} />
      )}

      <div ref={dropdownRef} className='relative z-50'>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className='relative p-0 md:px-4 md:py-3 transition-all duration-200 hover:bg-primary/5 cursor-pointer flex items-center gap-2 bg-transparent'
          style={{ direction: locale === "he" ? "rtl" : "ltr" }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className='text-base leading-4 inline-flex items-center justify-center w-5 h-5'>
            {currentLocale.flag}
          </span>
          <span className='text-sm font-medium text-text leading-4 inline-flex items-center'>
            {currentLocale.label}
          </span>

          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className='w-4 h-4 text-text-secondary group-hover:text-primary transition-colors order-3 inline-flex items-center justify-center'
          >
            <svg fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className='absolute top-full right-0 mt-2 w-full bg-surface/95 dark:bg-surface/90 backdrop-blur-lg border border-border/40 rounded-lg shadow-lg overflow-hidden'
            >
              {locales.map((localeCode) => {
                const localeInfo = getLocaleInfo(localeCode);
                const isSelected = localeCode === locale;

                return (
                  <button
                    key={localeCode}
                    onClick={() => handleLocaleChange(localeCode)}
                    className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-all duration-150 hover:bg-primary/10 focus:bg-primary/10 focus:outline-none ${
                      isSelected
                        ? "bg-primary/5 text-primary"
                        : "text-text hover:text-primary"
                    }`}
                  >
                    <span className='text-base inline-flex items-center justify-center w-5 h-5 order-1'>
                      {localeInfo.flag}
                    </span>
                    <span className='text-sm font-medium flex-1 order-2 inline-flex items-center'>
                      {localeInfo.label}
                    </span>
                    {isSelected && (
                      <div className='w-2 h-2 bg-primary rounded-full order-3' />
                    )}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
