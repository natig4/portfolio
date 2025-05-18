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
      {/* Click outside overlay */}
      {isOpen && (
        <div className='fixed inset-0 z-40' onClick={handleClickOutside} />
      )}

      <div ref={dropdownRef} className='relative z-50'>
        <motion.div
          className='relative'
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
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

          {/* Main trigger button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className='relative bg-surface/80 dark:bg-surface/60 backdrop-blur-lg border border-border/40 rounded-lg px-4 py-3 transition-all duration-200 hover:border-primary/60 cursor-pointer flex items-center gap-3 min-w-[140px] group disabled:opacity-50 disabled:cursor-not-allowed'
            style={{ direction: locale === "he" ? "rtl" : "ltr" }}
            whileTap={{ scale: 0.98 }}
          >
            <span className='text-lg order-1'>{currentLocale.flag}</span>
            <span className='text-sm font-medium text-text flex-1 order-2'>
              {currentLocale.label}
            </span>

            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className='w-4 h-4 text-text-secondary group-hover:text-primary transition-colors order-3'
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

          {/* Custom dropdown */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className='absolute top-full left-0 mt-2 w-full bg-surface/95 dark:bg-surface/90 backdrop-blur-lg border border-border/40 rounded-lg shadow-lg shadow-black/10 dark:shadow-black/30 overflow-hidden'
              >
                {locales.map((localeCode, index) => {
                  const localeInfo = getLocaleInfo(localeCode);
                  const isSelected = localeCode === locale;

                  return (
                    <motion.button
                      key={localeCode}
                      onClick={() => handleLocaleChange(localeCode)}
                      className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-all duration-150 hover:bg-primary/10 focus:bg-primary/10 focus:outline-none group ${
                        isSelected
                          ? "bg-primary/5 text-primary"
                          : "text-text hover:text-primary"
                      }`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <span className='text-lg order-1'>{localeInfo.flag}</span>
                      <span className='text-sm font-medium flex-1 order-2'>
                        {localeInfo.label}
                      </span>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className='w-2 h-2 bg-primary rounded-full order-3'
                        />
                      )}
                    </motion.button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
