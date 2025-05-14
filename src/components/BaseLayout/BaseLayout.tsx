import { getTranslations, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Widgets from "@/components/Widgets/Widgets";
import { Language } from "@/lib/model/language";
import styles from "./BaseLayout.module.css";

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
    <html lang={locale} dir={locale === Language.en ? "ltr" : "rtl"}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header
            isMobile={isMobile}
            links={{
              home: t("home"),
              about: t("about"),
            }}
          />
          <main className={styles.main}>{children}</main>
          <Footer />

          <Widgets lang={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
