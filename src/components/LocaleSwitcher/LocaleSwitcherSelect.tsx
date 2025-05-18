"use client";

import { ChangeEvent, ReactNode, useTransition } from "react";
import { useRouter, usePathname } from "@/i18n/routing";
import { Locale } from "next-intl";
import { motion } from "framer-motion";

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const locale = event.target.value as Locale;

    startTransition(() => {
      const currentUrl = new URL(window.location.href);
      const currentParams = Object.fromEntries(
        currentUrl.searchParams.entries()
      );

      router.push(
        {
          pathname,
          query: currentParams,
        },
        {
          locale,
          scroll: false,
        }
      );
    });
  }

  return (
    <div className='relative'>
      <label className='block cursor-pointer'>
        <span className='sr-only'>{label}</span>
        <motion.select
          className='w-full bg-transparent text-text border-none outline-none leading-tight text-sm font-medium rounded cursor-pointer appearance-none pr-8 focus:ring-2 focus:ring-primary/50 transition-all duration-200'
          defaultValue={defaultValue}
          disabled={isPending}
          onChange={onSelectChange}
          whileFocus={{ scale: 1.01 }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23${
              document.documentElement.classList.contains("dark")
                ? "a855f7"
                : "0ea5e9"
            }' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: "right 0.5rem center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "1rem 1rem",
          }}
        >
          {children}
        </motion.select>
      </label>

      {/* Custom dropdown arrow with gradient */}
      <div className='absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none'>
        <motion.div
          animate={{ rotate: isPending ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className='w-4 h-4'
        >
          <svg className='w-full h-full' fill='none' viewBox='0 0 20 20'>
            <defs>
              <linearGradient
                id='arrowGradient'
                x1='0%'
                y1='0%'
                x2='100%'
                y2='100%'
              >
                <stop offset='0%' stopColor='var(--primary)' />
                <stop offset='100%' stopColor='var(--secondary)' />
              </linearGradient>
            </defs>
            <path
              stroke='url(#arrowGradient)'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.5}
              d='m6 8 4 4 4-4'
            />
          </svg>
        </motion.div>
      </div>

      {/* Loading indicator */}
      {isPending && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className='absolute -right-8 top-1/2 transform -translate-y-1/2'
        >
          <div className='w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin'></div>
        </motion.div>
      )}
    </div>
  );
}
