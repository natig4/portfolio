import { getTranslations } from "next-intl/server";
import BackgroundEffects from "@/components/BackgroundEffects/BackgroundEffects";
import MarketingSection from "@/components/sections/Marketing";
import CTASection from "@/components/CTASection/CTASection";
import { cookies } from "next/headers";

export default async function MarketingPage() {
  const t = await getTranslations("common");
  const isMobile = (await cookies()).get("isMobile")?.value === "true";

  return (
    <div
      className={`min-h-screen p-4 pt-${
        isMobile ? 16 : 0
      } relative overflow-hidden`}
    >
      <BackgroundEffects />
      <MarketingSection />

      <div className='mt-16'>
        <CTASection
          linkedInLabel={t("buttons.viewProjects")}
          contactLabel={t("buttons.getInTouch")}
          primaryLink='/projects'
          secondaryLink='/contact'
          titleKey='marketingTitle'
        />
      </div>
    </div>
  );
}
