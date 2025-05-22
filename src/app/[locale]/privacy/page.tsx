import { getTranslations } from "next-intl/server";
import BackgroundEffects from "@/components/BackgroundEffects/BackgroundEffects";
import { cookies } from "next/headers";
import { EMAIL } from "@/lib/model/common";

export async function generateMetadata() {
  const t = await getTranslations("privacy");

  return {
    title: `${t("title")} | Nati Gurevich`,
    description: t("description"),
  };
}

export default async function PrivacyPage() {
  const t = await getTranslations("privacy");
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
                {t("introduction.title")}
              </h2>
              <p className='mb-4 leading-relaxed'>
                {t("introduction.content")}
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4 text-text'>
                {t("information.title")}
              </h2>
              <h3 className='text-xl font-medium mb-3 text-text'>
                {t("information.personal.title")}
              </h3>
              <ul className='list-disc pl-6 space-y-2 mb-4'>
                <li>{t("information.personal.name")}</li>
                <li>{t("information.personal.email")}</li>
                <li>{t("information.personal.message")}</li>
              </ul>

              <h3 className='text-xl font-medium mb-3 text-text'>
                {t("information.automatic.title")}
              </h3>
              <ul className='list-disc pl-6 space-y-2 mb-4'>
                <li>{t("information.automatic.ip")}</li>
                <li>{t("information.automatic.browser")}</li>
                <li>{t("information.automatic.device")}</li>
                <li>{t("information.automatic.usage")}</li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4 text-text'>
                {t("collection.title")}
              </h2>
              <ul className='list-disc pl-6 space-y-2'>
                <li>{t("collection.forms")}</li>
                <li>{t("collection.analytics")}</li>
                <li>{t("collection.cookies")}</li>
                <li>{t("collection.interaction")}</li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4 text-text'>
                {t("usage.title")}
              </h2>
              <ul className='list-disc pl-6 space-y-2'>
                <li>{t("usage.respond")}</li>
                <li>{t("usage.improve")}</li>
                <li>{t("usage.analytics")}</li>
                <li>{t("usage.communicate")}</li>
                <li>{t("usage.legal")}</li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4 text-text'>
                {t("sharing.title")}
              </h2>
              <p className='mb-4 leading-relaxed'>{t("sharing.general")}</p>
              <h3 className='text-xl font-medium mb-3 text-text'>
                {t("sharing.exceptions.title")}
              </h3>
              <ul className='list-disc pl-6 space-y-2'>
                <li>{t("sharing.exceptions.consent")}</li>
                <li>{t("sharing.exceptions.legal")}</li>
                <li>{t("sharing.exceptions.providers")}</li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4 text-text'>
                {t("cookies.title")}
              </h2>
              <p className='mb-4 leading-relaxed'>{t("cookies.content")}</p>
              <h3 className='text-xl font-medium mb-3 text-text'>
                {t("cookies.types.title")}
              </h3>
              <ul className='list-disc pl-6 space-y-2'>
                <li>
                  <strong>{t("cookies.types.essential.title")}:</strong>{" "}
                  {t("cookies.types.essential.content")}
                </li>
                <li>
                  <strong>{t("cookies.types.analytics.title")}:</strong>{" "}
                  {t("cookies.types.analytics.content")}
                </li>
                <li>
                  <strong>{t("cookies.types.preferences.title")}:</strong>{" "}
                  {t("cookies.types.preferences.content")}
                </li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4 text-text'>
                {t("thirdParty.title")}
              </h2>
              <div className='mb-4'>
                <h3 className='text-xl font-medium mb-3 text-text'>
                  {t("thirdParty.vercel.title")}
                </h3>
                <p className='mb-2'>{t("thirdParty.vercel.content")}</p>
                <a
                  href='https://vercel.com/legal/privacy-policy'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-primary hover:text-primary-hover underline'
                >
                  {t("thirdParty.vercel.link")}
                </a>
              </div>

              <div className='mb-4'>
                <h3 className='text-xl font-medium mb-3 text-text'>
                  {t("thirdParty.accessibility.title")}
                </h3>
                <p className='mb-2'>{t("thirdParty.accessibility.content")}</p>
                <a
                  href='https://accessibe.com/privacy-policy'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-primary hover:text-primary-hover underline'
                >
                  {t("thirdParty.accessibility.link")}
                </a>
              </div>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4 text-text'>
                {t("security.title")}
              </h2>
              <p className='mb-4 leading-relaxed'>{t("security.content")}</p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4 text-text'>
                {t("retention.title")}
              </h2>
              <p className='mb-4 leading-relaxed'>{t("retention.content")}</p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4 text-text'>
                {t("rights.title")}
              </h2>
              <ul className='list-disc pl-6 space-y-2'>
                <li>{t("rights.access")}</li>
                <li>{t("rights.correct")}</li>
                <li>{t("rights.delete")}</li>
                <li>{t("rights.restrict")}</li>
                <li>{t("rights.object")}</li>
                <li>{t("rights.portability")}</li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4 text-text'>
                {t("children.title")}
              </h2>
              <p className='mb-4 leading-relaxed'>{t("children.content")}</p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4 text-text'>
                {t("international.title")}
              </h2>
              <p className='mb-4 leading-relaxed'>
                {t("international.content")}
              </p>
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
