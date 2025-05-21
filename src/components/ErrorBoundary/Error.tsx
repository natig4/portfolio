"use client";

import { useTranslations } from "next-intl";
import NavLink from "@/components/NavLink/NavLink";

export default function Error() {
  const t = useTranslations("error");

  return (
    <div className='container mx-auto px-4 py-8 text-center'>
      <h1 className='text-6xl font-bold text-primary-700 mb-6'>
        {t("header")}
      </h1>
      <p className='text-4xl mb-8 text-gray-800 dark:text-gray-200 leading-tight'>
        {t("description")}
      </p>
      <div className='flex flex-wrap justify-center items-center gap-1 md:gap-2'>
        <p className='text-2xl md:text-3xl text-gray-800 dark:text-gray-200'>
          {t("link1")}
        </p>
        <NavLink
          className='text-4xl md:text-5xl text-primary-700 hover:text-primary-600 transition-colors duration-300'
          href={{ pathname: "/" }}
        >
          {t("cta")}
        </NavLink>
        <p className='text-2xl md:text-3xl text-gray-800 dark:text-gray-200'>
          {t("link2")}
        </p>
      </div>
    </div>
  );
}
