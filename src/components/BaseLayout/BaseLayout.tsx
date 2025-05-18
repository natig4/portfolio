import { getTranslations, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Widgets from "@/components/Widgets/Widgets";
import { Language } from "@/lib/model/language";
import { ThemeProvider } from "@/components/Theme/ThemeProvider";

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
      <body className='flex flex-col min-h-screen h-screen overflow-x-hidden max-w-[100vw] bg-background text-text transition-colors duration-300'>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <Header
              isMobile={isMobile}
              links={{
                home: t("home"),
                about: t("about"),
                contact: t("contact"),
                projects: t("projects"),
              }}
            />
            <main className='flex-grow pt-[var(--header-height)] w-full flex flex-col'>
              {children}
            </main>
            <Footer isMobile={isMobile} />
            <Widgets lang={locale} />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
