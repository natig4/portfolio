import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import LegalPage from "@/components/shared/LegalPage";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

type Props = { params: Promise<{ locale: AppLocale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms" });

  return {
    title: t("title"),
    ...pageMetadata({
      locale,
      href: "/terms",
      title: t("title"),
      description: t("metaDescription"),
    }),
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("terms");

  return (
    <LegalPage
      title={t("title")}
      meta={[
        `${t("lastUpdated")}: ${t("lastUpdatedDate")}`,
        `${t("effectiveDate")}: ${t("effectiveDateDate")}`,
      ]}
    >
      <section>
        <h2>{t("acceptance.title")}</h2>
        <p>{t("acceptance.content")}</p>
      </section>

      <section>
        <h2>{t("description.title")}</h2>
        <p>{t("description.content")}</p>
      </section>

      <section>
        <h2>{t("usage.title")}</h2>
        <ul>
          <li>{t("usage.permitted.browse")}</li>
          <li>{t("usage.permitted.contact")}</li>
          <li>{t("usage.permitted.share")}</li>
        </ul>
        <h3>{t("usage.prohibited.title")}</h3>
        <ul>
          <li>{t("usage.prohibited.commercial")}</li>
          <li>{t("usage.prohibited.modify")}</li>
          <li>{t("usage.prohibited.harmful")}</li>
          <li>{t("usage.prohibited.rights")}</li>
        </ul>
      </section>

      <section>
        <h2>{t("intellectual.title")}</h2>
        <p>{t("intellectual.content")}</p>
      </section>

      <section>
        <h2>{t("links.title")}</h2>
        <p>{t("links.content")}</p>
      </section>

      <section>
        <h2>{t("disclaimer.title")}</h2>
        <p>{t("disclaimer.content")}</p>
      </section>

      <section>
        <h2>{t("limitation.title")}</h2>
        <p>{t("limitation.content")}</p>
      </section>

      <section>
        <h2>{t("changes.title")}</h2>
        <p>{t("changes.content")}</p>
      </section>

      <section>
        <h2>{t("contact.title")}</h2>
        <p>
          {t("contact.content")}{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </section>
    </LegalPage>
  );
}
