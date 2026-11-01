import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FaMedium } from "react-icons/fa";
import type { AppLocale } from "@/i18n/routing";
import { articles } from "@/data/articles";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import { buttonClass } from "@/components/ui/Button";
import ArticleCard from "@/components/articles/ArticleCard";
import CtaBanner from "@/components/shared/CtaBanner";

type Props = { params: Promise<{ locale: AppLocale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "articles.page" });

  return {
    title: t("eyebrow"),
    ...pageMetadata({
      locale,
      href: "/articles",
      title: t("eyebrow"),
      description: t("description"),
    }),
  };
}

export default async function ArticlesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("articles");

  return (
    <>
      <PageHeader
        eyebrow={t("page.eyebrow")}
        title={t("page.title")}
        description={t("page.description")}
      >
        <a
          href={site.socials.medium}
          target='_blank'
          rel='noopener noreferrer'
          className={buttonClass({ variant: "secondary", className: "mt-8" })}
        >
          <FaMedium className='size-4' aria-hidden='true' />
          {t("page.follow")}
          <span className='sr-only'>{t("labels.newTab")}</span>
        </a>
      </PageHeader>
      <Container className='py-14 sm:py-20'>
        <div className='grid gap-6 md:grid-cols-2'>
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </Container>
      <CtaBanner />
    </>
  );
}
