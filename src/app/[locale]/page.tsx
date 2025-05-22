import { getTranslations } from "next-intl/server";
import SkillsSection from "@/components/sections/Skills";
import HeaderSection from "@/components/sections/Header";
import LocationSection from "@/components/sections/Location";
import BackgroundEffects from "@/components/BackgroundEffects/BackgroundEffects";
import CTASection from "@/components/CTASection/CTASection";
import { cookies } from "next/headers";

export default async function Home() {
  const t = await getTranslations("home");
  const commonT = await getTranslations("common");
  const isMobile = (await cookies()).get("isMobile")?.value === "true";

  return (
    <div
      className={`home-container w-full flex flex-col items-center px-4 pt-${
        isMobile ? 16 : 0
      } relative overflow-hidden`}
    >
      <BackgroundEffects />

      <HeaderSection
        title={t("title")}
        subtitle={t("subtitle")}
        viewProjectsLabel={t("viewProjects")}
        contactMeLabel={t("contactMe")}
      />

      <SkillsSection title={commonT("skills.title")} />

      <LocationSection />

      <CTASection
        linkedInLabel={commonT("buttons.viewProjects")}
        contactLabel={commonT("buttons.contactMe")}
        primaryLink='/projects'
        secondaryLink='/contact'
        useLinkedIn={false}
        showBackground
        titleKey='projectsTitle'
      />

      <div className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50' />
    </div>
  );
}
