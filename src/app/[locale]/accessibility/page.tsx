import { getTranslations } from "next-intl/server";
import BackgroundEffects from "@/components/BackgroundEffects/BackgroundEffects";
import { cookies } from "next/headers";
import { EMAIL } from "@/lib/model/common";

export async function generateMetadata() {
  const t = await getTranslations("accessibility");

  return {
    title: `${t("title")} | Nati Gurevich`,
    description: t("intro_paragraph_1"),
  };
}

export default async function AccessibilityPage() {
  const t = await getTranslations("accessibility");
  const isMobile = (await cookies()).get("isMobile")?.value === "true";

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
    <div
      className={`min-h-screen p-4 pt-${
        isMobile ? 16 : 0
      } relative overflow-hidden`}
    >
      <BackgroundEffects />

      <div className='max-w-4xl mx-auto relative z-10'>
        <div className='bg-surface/80 backdrop-blur-lg rounded-2xl border border-border/30 p-8 md:p-12'>
          <h1 className='text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>
            {t("title")}
          </h1>

          <div className='prose prose-lg max-w-none text-text'>
            <section className='mb-8'>
              <p className='mb-4 leading-relaxed'>
                <b>{t("company_name")}</b> {t("intro_paragraph_1")}
              </p>
              <p className='mb-4 leading-relaxed'>{t("intro_paragraph_2")}</p>
              <p className='mb-4 leading-relaxed'>
                {t("accessibility_initiative_1")}{" "}
                <a
                  className='text-primary hover:text-primary-hover underline'
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

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4 text-text'>
                {t("accessibility_features_title")}
              </h2>
              <ul className='list-disc pl-6 space-y-2'>
                {features.map((feature) => (
                  <li key={feature} className='leading-relaxed'>
                    {t(feature)}
                  </li>
                ))}
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4 text-text'>
                {t("contact_us_title")}
              </h2>
              <p className='mb-4 leading-relaxed'>
                {t("contact_us_paragraph")}
              </p>

              <h3 className='text-xl font-medium mb-3 text-text'>
                {t("contact_info_title")}
              </h3>
              <ul className='list-disc pl-6 space-y-2 mb-6'>
                <li>{t("company_name")}</li>
                <li>
                  {t("email_label")}
                  <a
                    className='text-primary hover:text-primary-hover underline'
                    href={`mailto:${EMAIL}`}
                    rel='noopener noreferrer'
                  >
                    {EMAIL}
                  </a>
                </li>
              </ul>

              <p className='mb-4 leading-relaxed'>
                {t("accessibility_commitment")}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
