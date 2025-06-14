import { getTranslations, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Widgets from "@/components/Widgets/Widgets";
import AnalyticsProvider from "@/components/Analytics/Analytics";
import { Language } from "@/lib/model/language";
import { ThemeProvider } from "@/components/Theme/ThemeProvider";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import Head from "next/head";
import { THEME_COLOR } from "@/lib/model/common";

type IProps = {
  children: ReactNode;
  locale: Language;
  isMobile: boolean;
};

export default async function BaseLayout({
  children,
  locale,
  isMobile,
}: IProps) {
  const messages = await getMessages();
  const t = await getTranslations("links");

  return (
    <html
      lang={locale}
      dir={locale === Language.en ? "ltr" : "rtl"}
      className='h-full'
    >
      <Head>
        <link rel='icon' href='/NgLogo.ico' sizes='any' />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/icons/NgLogo.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/icons/NgLogo.png'
        />

        <link rel='apple-touch-icon' sizes='180x180' href='/icons/NgLogo.png' />

        <link rel='manifest' href='/site.webmanifest' />

        <meta name='msapplication-TileColor' content={THEME_COLOR} />
        <meta name='msapplication-TileImage' content='/icons/NgLogo.png' />
        <link rel='mask-icon' href='/icons/NgLogo.svg' color={THEME_COLOR} />
        <meta name='theme-color' content={THEME_COLOR} />
      </Head>
      <body className='flex flex-col min-h-screen h-screen overflow-x-hidden max-w-[100vw] bg-background text-text transition-colors duration-300'>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ErrorBoundary>
            <ThemeProvider>
              <a
                href='#main-content'
                className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded z-50'
              >
                Skip to main content
              </a>

              <div className='flex flex-col min-h-screen'>
                <Header
                  isMobile={isMobile}
                  links={{
                    home: t("home"),
                    about: t("about"),
                    projects: t("projects"),
                    experience: t("experience"),
                    articles: t("articles"),
                    contact: t("contact"),
                    marketing: t("marketing"),
                  }}
                />

                <main
                  id='main-content'
                  className='flex-grow pt-[var(--header-height)] w-full flex flex-col'
                  role='main'
                  tabIndex={-1}
                >
                  {children}
                </main>

                <Footer isMobile={isMobile} />
              </div>

              <aside aria-label='Accessibility and utility widgets'>
                <Widgets lang={locale} />
              </aside>

              <AnalyticsProvider />
            </ThemeProvider>
          </ErrorBoundary>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
