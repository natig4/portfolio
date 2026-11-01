import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { fontVariables } from "@/app/fonts";
import Widgets from "@/components/Widgets/Widgets";
import AnalyticsProvider from "@/components/Analytics/Analytics";
import ThemeScript from "./ThemeScript";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

export default async function BaseLayout({
  children,
  locale,
}: {
  children: ReactNode;
  locale: AppLocale;
}) {
  const t = await getTranslations("nav");
  // Client components get their labels as props; only the error boundary reads the catalog.
  const { error } = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "he" ? "rtl" : "ltr"}
      className={fontVariables}
      data-scroll-behavior='smooth'
      suppressHydrationWarning
    >
      {/* App Router root layout: a plain <head> is correct here (the rule targets pages/). */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <ThemeScript />
      </head>
      <body className='flex min-h-dvh flex-col'>
        <NextIntlClientProvider messages={{ error }}>
          <a
            href='#main-content'
            className='sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground'
          >
            {t("skipToContent")}
          </a>
          <SiteHeader />
          <main
            id='main-content'
            tabIndex={-1}
            className='flex w-full flex-1 flex-col outline-none'
          >
            {children}
          </main>
          <SiteFooter />
          <Widgets lang={locale} />
          <AnalyticsProvider />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
