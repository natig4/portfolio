import { getTranslations } from "next-intl/server";
import ArticlesSection from "@/components/sections/Articles";
import BackgroundEffects from "@/components/BackgroundEffects/BackgroundEffects";
import CTASection from "@/components/CTASection/CTASection";
import { cookies } from "next/headers";
import { getTranslatedObject } from "@/lib/utils/translation-helpers";

interface ArticleData {
  title: string;
  date: string;
  excerpt: string;
}

async function getArticles(): Promise<ArticleData[]> {
  const t = await getTranslations("articles");
  const raw = await t.raw("articles");
  const keys = Object.keys(raw);
  const basePath = "articles";

  const articles: ArticleData[] = await Promise.all(
    keys.map(async (key) => {
      const article = await getTranslatedObject<ArticleData>(
        "articles",
        `${basePath}.${key}`,
        ["title", "date", "excerpt"]
      );

      return article;
    })
  );

  return articles;
}

export default async function ArticlesPage() {
  const t = await getTranslations("articles");
  const commonT = await getTranslations("common");
  const isMobile = (await cookies()).get("isMobile")?.value === "true";

  const title = t("title");
  const followMe = t("followMe");
  const forMore = t("forMore");

  const articles: ArticleData[] = await getArticles();

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
          linkedInLabel={commonT("buttons.learnAboutMe")}
          contactLabel={commonT("buttons.getInTouch")}
          primaryLink='/about'
          secondaryLink='/contact'
          showBackground={false}
          titleKey='articlesTitle'
        />
      </div>
    </div>
  );
}
