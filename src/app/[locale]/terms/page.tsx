import { getTranslations } from "next-intl/server";
import BackgroundEffects from "@/components/BackgroundEffects/BackgroundEffects";
import { cookies } from "next/headers";
import { EMAIL } from "@/lib/model/common";

export async function generateMetadata() {
  const t = await getTranslations("terms");

  return {
    title: `${t("title")} | Nati Gurevich`,
    description: t("metaDescription"),
  };
}

export default async function TermsPage() {
  const t = await getTranslations("terms");
  const isMobile = (await cookies()).get("isMobile")?.value === "true";

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

          <div className='text-text-secondary mb-8'>
            <p className='mb-2'>
              {t("lastUpdated")}: {t("lastUpdatedDate")}
            </p>
            <p>
              {t("effectiveDate")}: {t("effectiveDateDate")}
            </p>
          </div>

          <div className='prose prose-lg max-w-none text-text'>
            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4 text-text'>
                {t("acceptance.title")}
              </h2>
              <p className='mb-4 leading-relaxed'>{t("acceptance.content")}</p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4 text-text'>
                {t("description.title")}
              </h2>
              <p className='mb-4 leading-relaxed'>{t("description.content")}</p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4 text-text'>
                {t("usage.title")}
              </h2>
              <ul className='list-disc pl-6 space-y-2'>
                <li>{t("usage.permitted.browse")}</li>
                <li>{t("usage.permitted.contact")}</li>
                <li>{t("usage.permitted.share")}</li>
              </ul>
              <h3 className='text-xl font-medium mt-6 mb-3 text-text'>
                {t("usage.prohibited.title")}
              </h3>
              <ul className='list-disc pl-6 space-y-2'>
                <li>{t("usage.prohibited.commercial")}</li>
                <li>{t("usage.prohibited.modify")}</li>
                <li>{t("usage.prohibited.harmful")}</li>
                <li>{t("usage.prohibited.rights")}</li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4 text-text'>
                {t("intellectual.title")}
              </h2>
              <p className='mb-4 leading-relaxed'>
                {t("intellectual.content")}
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4 text-text'>
                {t("links.title")}
              </h2>
              <p className='mb-4 leading-relaxed'>{t("links.content")}</p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4 text-text'>
                {t("disclaimer.title")}
              </h2>
              <p className='mb-4 leading-relaxed'>{t("disclaimer.content")}</p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4 text-text'>
                {t("limitation.title")}
              </h2>
              <p className='mb-4 leading-relaxed'>{t("limitation.content")}</p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4 text-text'>
                {t("changes.title")}
              </h2>
              <p className='mb-4 leading-relaxed'>{t("changes.content")}</p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4 text-text'>
                {t("contact.title")}
              </h2>
              <p className='mb-4 leading-relaxed'>
                {t("contact.content")}{" "}
                <a
                  href={`mailto:${EMAIL}`}
                  className='text-primary hover:text-primary-hover underline'
                >
                  {EMAIL}
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
