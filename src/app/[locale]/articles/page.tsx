import { getTranslations } from "next-intl/server";
import ArticlesSection from "@/components/sections/Articles";
import BackgroundEffects from "@/components/BackgroundEffects/BackgroundEffects";
import CTASection from "@/components/CTASection/CTASection";
import { cookies } from "next/headers";

interface ArticleData {
  title: string;
  date: string;
  excerpt: string;
}

export default async function ArticlesPage() {
  const t = await getTranslations("articles");
  const isMobile = (await cookies()).get("isMobile")?.value === "true";

  const title = t("title");
  const followMe = t("followMe");
  const forMore = t("forMore");

  const articles: ArticleData[] = [
    {
      title: t("articles.0.title"),
      date: t("articles.0.date"),
      excerpt: t("articles.0.excerpt"),
    },
    {
      title: t("articles.1.title"),
      date: t("articles.1.date"),
      excerpt: t("articles.1.excerpt"),
    },
    {
      title: t("articles.2.title"),
      date: t("articles.2.date"),
      excerpt: t("articles.2.excerpt"),
    },
  ];

  return (
    <div
      className={`min-h-screen p-4 pt-pt-${
        isMobile ? 16 : 0
      } relative overflow-hidden`}
    >
      <BackgroundEffects />
      <ArticlesSection
        title={title}
        articles={articles}
        followMe={followMe}
        forMore={forMore}
      />

      <div className='mt-16'>
        <CTASection
          title='Interested in my background and technical skills?'
          linkedInLabel='Learn About Me'
          contactLabel='Get In Touch'
          primaryLink='/about'
          secondaryLink='/contact'
          showBackground={false}
        />
      </div>
    </div>
  );
}
