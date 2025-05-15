import { useTranslations } from "next-intl";
import NavLink from "@/components/NavLink/NavLink";

export default function NotFoundPage() {
  const t = useTranslations("404");

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-6xl md:text-7xl font-bold pt-8 pb-12 leading-tight'>
        <strong className='text-primary-700'>
          {/* 404 changed to 58 */}58
        </strong>{" "}
        <span>{t("header")}</span>
      </h1>
      <h2 className='text-3xl md:text-4xl pb-6 leading-tight text-gray-800 dark:text-gray-200'>
        {t("secondary-header")}
      </h2>
      <div className='flex flex-wrap items-center gap-1 md:gap-2'>
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
