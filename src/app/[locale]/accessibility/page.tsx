import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import LegalPage from "@/components/shared/LegalPage";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

type Props = { params: Promise<{ locale: AppLocale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "accessibility" });

  return {
    title: t("title"),
    ...pageMetadata({
      locale,
      href: "/accessibility",
      title: t("title"),
      description: t("intro_paragraph_2"),
    }),
  };
}

export default async function AccessibilityPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("accessibility");

  const features = [
    "feature_text_resize",
    "feature_text_spacing",
    "feature_line_height",
    "feature_invert_colors",
    "feature_gray_hues",
    "feature_underline_links",
    "feature_big_cursor",
    "feature_reading_guide",
    "feature_text_to_speech",
    "feature_speech_to_text",
    "feature_disable_animations",
  ];

  return (
    <LegalPage title={t("title")}>
      <section>
        <p>
          <b>{t("company_name")}</b> {t("intro_paragraph_1")}
        </p>
        <p>{t("intro_paragraph_2")}</p>
        <p>
          {t("accessibility_initiative_1")}{" "}
          <a
            href='https://www.w3.org/TR/WCAG21/'
            title={t("wcag_link_title")}
            target='_blank'
            rel='noopener noreferrer'
          >
            {t("wcag_link")}
          </a>{" "}
          {t("accessibility_initiative_2")}
        </p>
      </section>

      <section>
        <h2>{t("accessibility_features_title")}</h2>
        <ul>
          {features.map((feature) => (
            <li key={feature}>{t(feature)}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{t("contact_us_title")}</h2>
        <p>{t("contact_us_paragraph")}</p>

        <h3>{t("contact_info_title")}</h3>
        <ul>
          <li>{t("company_name")}</li>
          <li>
            {t("email_label")}
            <a href={`mailto:${site.email}`} rel='noopener noreferrer'>
              {site.email}
            </a>
          </li>
        </ul>

        <p>{t("accessibility_commitment")}</p>
      </section>
    </LegalPage>
  );
}
