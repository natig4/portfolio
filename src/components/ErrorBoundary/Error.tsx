"use client";

import { useTranslations } from "next-intl";
import NavLink from "@/components/NavLink/NavLink";

interface ErrorProps {
  errorMessage?: string;
}

export default function Error({ errorMessage }: ErrorProps) {
  const t = useTranslations("error");

  const header = t ? t("header") : "Error";
  const description = t ? t("description") : "Something went wrong.";
  const link1 = t ? t("link1") : "Click ";
  const cta = t ? t("cta") : "here";
  const link2 = t ? t("link2") : " to go back home";

  return (
    <div className='container mx-auto px-4 py-8 text-center'>
      <h1 className='text-6xl font-bold text-primary-700 mb-6'>{header}</h1>
      <p className='text-4xl mb-8 text-gray-800 dark:text-gray-200 leading-tight'>
        {description}
      </p>

      {errorMessage && (
        <div className='mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg'>
          <p className='text-red-700 dark:text-red-400'>{errorMessage}</p>
        </div>
      )}

      <div className='flex flex-wrap justify-center items-center gap-1 md:gap-2'>
        <p className='text-2xl md:text-3xl text-gray-800 dark:text-gray-200'>
          {link1}
        </p>
        <NavLink
          className='text-4xl md:text-5xl text-primary-700 hover:text-primary-600 transition-colors duration-300'
          href={{ pathname: "/" }}
        >
          {cta}
        </NavLink>
        <p className='text-2xl md:text-3xl text-gray-800 dark:text-gray-200'>
          {link2}
        </p>
      </div>
    </div>
  );
}
