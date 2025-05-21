import { getTranslations } from "next-intl/server";
import ArticlesSection from "@/components/sections/Articles";
import BackgroundEffects from "@/components/BackgroundEffects/BackgroundEffects";
import CTASection from "@/components/CTASection/CTASection";
import { cookies } from "next/headers";
import { getTranslatedObjectArray } from "@/lib/utils/translation-helpers";

interface ArticleData {
  title: string;
  date: string;
  excerpt: string;
}

export default async function ArticlesPage() {
  const t = await getTranslations("articles");
  const commonT = await getTranslations("common");
  const isMobile = (await cookies()).get("isMobile")?.value === "true";

  const title = t("title");
  const followMe = t("followMe");
  const forMore = t("forMore");

  // Get articles data from translations
  const articles: ArticleData[] = await getTranslatedObjectArray<ArticleData>(
    "articles",
    "articles",
    3, // Assuming you have 3 articles
    ["title", "date", "excerpt"]
  );

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
