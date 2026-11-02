import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import LegalPage from "@/components/shared/LegalPage";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

type Props = { params: Promise<{ locale: AppLocale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  return {
    title: t("title"),
    ...pageMetadata({
      locale,
      href: "/privacy",
      title: t("title"),
      description: t("description"),
    }),
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");

  return (
    <LegalPage
      title={t("title")}
      meta={[
        `${t("lastUpdated")}: ${t("lastUpdatedDate")}`,
        `${t("effectiveDate")}: ${t("effectiveDateDate")}`,
      ]}
    >
      <section>
        <h2>{t("introduction.title")}</h2>
        <p>{t("introduction.content")}</p>
      </section>

      <section>
        <h2>{t("information.title")}</h2>
        <h3>{t("information.personal.title")}</h3>
        <ul>
          <li>{t("information.personal.name")}</li>
          <li>{t("information.personal.email")}</li>
          <li>{t("information.personal.message")}</li>
        </ul>

        <h3>{t("information.automatic.title")}</h3>
        <ul>
          <li>{t("information.automatic.ip")}</li>
          <li>{t("information.automatic.browser")}</li>
          <li>{t("information.automatic.device")}</li>
          <li>{t("information.automatic.usage")}</li>
        </ul>
      </section>

      <section>
        <h2>{t("collection.title")}</h2>
        <ul>
          <li>{t("collection.forms")}</li>
          <li>{t("collection.analytics")}</li>
          <li>{t("collection.cookies")}</li>
          <li>{t("collection.interaction")}</li>
        </ul>
      </section>

      <section>
        <h2>{t("usage.title")}</h2>
        <ul>
          <li>{t("usage.respond")}</li>
          <li>{t("usage.improve")}</li>
          <li>{t("usage.analytics")}</li>
          <li>{t("usage.communicate")}</li>
          <li>{t("usage.legal")}</li>
        </ul>
      </section>

      <section>
        <h2>{t("sharing.title")}</h2>
        <p>{t("sharing.general")}</p>
        <h3>{t("sharing.exceptions.title")}</h3>
        <ul>
          <li>{t("sharing.exceptions.consent")}</li>
          <li>{t("sharing.exceptions.legal")}</li>
          <li>{t("sharing.exceptions.providers")}</li>
        </ul>
      </section>

      <section>
        <h2>{t("cookies.title")}</h2>
        <p>{t("cookies.content")}</p>
        <h3>{t("cookies.types.title")}</h3>
        <ul>
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

      <section>
        <h2>{t("thirdParty.title")}</h2>
        <div>
          <h3>{t("thirdParty.vercel.title")}</h3>
          <p>{t("thirdParty.vercel.content")}</p>
          <a
            href='https://vercel.com/legal/privacy-policy'
            target='_blank'
            rel='noopener noreferrer'
          >
            {t("thirdParty.vercel.link")}
          </a>
        </div>

        <div>
          <h3>{t("thirdParty.accessibility.title")}</h3>
          <p>{t("thirdParty.accessibility.content")}</p>
          <a
            href='https://accessibe.com/privacy-policy'
            target='_blank'
            rel='noopener noreferrer'
          >
            {t("thirdParty.accessibility.link")}
          </a>
        </div>
      </section>

      <section>
        <h2>{t("security.title")}</h2>
        <p>{t("security.content")}</p>
      </section>

      <section>
        <h2>{t("retention.title")}</h2>
        <p>{t("retention.content")}</p>
      </section>

      <section>
        <h2>{t("rights.title")}</h2>
        <ul>
          <li>{t("rights.access")}</li>
          <li>{t("rights.correct")}</li>
          <li>{t("rights.delete")}</li>
          <li>{t("rights.restrict")}</li>
          <li>{t("rights.object")}</li>
          <li>{t("rights.portability")}</li>
        </ul>
      </section>

      <section>
        <h2>{t("children.title")}</h2>
        <p>{t("children.content")}</p>
      </section>

      <section>
        <h2>{t("international.title")}</h2>
        <p>{t("international.content")}</p>
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
