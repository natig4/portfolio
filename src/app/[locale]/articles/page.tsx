import { getTranslations } from "next-intl/server";
import ArticlesSection from "@/components/sections/Articles";
import BackgroundEffects from "@/components/BackgroundEffects/BackgroundEffects";

export default async function ArticlesPage() {
  const t = await getTranslations("articles");

  const title = t("title");
  const followMe = t("followMe");
  const forMore = t("forMore");

  // Get articles from translations
  const articles = t("articles").map((article: any) => ({
    title: article.title,
    date: article.date,
    excerpt: article.excerpt,
  }));

  return (
    <div className='min-h-screen p-4 py-16 relative overflow-hidden'>
      <BackgroundEffects />
      <ArticlesSection
        title={title}
        articles={articles}
        followMe={followMe}
        forMore={forMore}
      />
    </div>
  );
}
