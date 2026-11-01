import { getTranslations, setRequestLocale } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import SkillsSection from "@/components/sections/Skills";
import HeaderSection from "@/components/sections/Header";
import LocationSection from "@/components/sections/Location";
import CTASection from "@/components/CTASection/CTASection";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const commonT = await getTranslations("common");

  return (
    <div
      className='home-container w-full flex flex-col items-center px-4 relative overflow-hidden'
      role='main'
    >
      <main className='w-full flex flex-col items-center'>
        <section
          aria-labelledby='hero-title'
          className='w-full flex justify-center'
        >
          <HeaderSection title={t("title")} subtitle={t("subtitle")} />
        </section>

        <section
          aria-labelledby='skills-section-title'
          className='w-full flex justify-center'
        >
          <SkillsSection title={commonT("skills.title")} />
        </section>

        <section
          aria-labelledby='location-section'
          className='w-full flex justify-center'
        >
          <LocationSection />
        </section>

        <section aria-labelledby='cta-section' className='w-full'>
          <CTASection
            linkedInLabel={commonT("buttons.viewProjects")}
            contactLabel={commonT("buttons.contactMe")}
            primaryLink='/projects'
            secondaryLink='/contact'
            useLinkedIn={false}
            pad
            titleKey='projectsTitle'
          />
        </section>
      </main>

      <div
        className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50'
        aria-hidden='true'
      />
    </div>
  );
}
