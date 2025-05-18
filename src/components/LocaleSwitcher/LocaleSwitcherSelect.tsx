"use client";

import { ChangeEvent, ReactNode, useTransition } from "react";
import { useRouter, usePathname } from "@/i18n/routing";
import { Locale } from "next-intl";

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
    <label className='relative cursor-pointer border-none text-lg md:text-xl py-2 px-2 flex items-center text-text font-header transition-colors duration-200 hover:bg-white/10 rounded'>
      <span className='absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0 clip-rect-0'>
        {label}
      </span>
      <select
        className='bg-transparent text-text border-none outline-none leading-tight text-lg md:text-xl rounded appearance-none'
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
    </label>
  );
}
