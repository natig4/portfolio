import { getTranslations } from "next-intl/server";
import ExperienceSection from "@/components/sections/Experience";
import BackgroundEffects from "@/components/BackgroundEffects/BackgroundEffects";
import CTASection from "@/components/CTASection/CTASection";
import { cookies } from "next/headers";

interface CompanyData {
  company: string;
  position: string;
  period: string;
  description: string[];
}

export default async function ExperiencePage() {
  const t = await getTranslations("experience");
  const isMobile = (await cookies()).get("isMobile")?.value === "true";

  const title = t("title");

  const companies: CompanyData[] = [
    {
      company: t("companies.0.company"),
      position: t("companies.0.position"),
      period: t("companies.0.period"),
      description: [
        t("companies.0.description.0"),
        t("companies.0.description.1"),
        t("companies.0.description.2"),
        t("companies.0.description.3"),
      ],
    },
    {
      company: t("companies.1.company"),
      position: t("companies.1.position"),
      period: t("companies.1.period"),
      description: [
        t("companies.1.description.0"),
        t("companies.1.description.1"),
        t("companies.1.description.2"),
        t("companies.1.description.3"),
      ],
    },
    {
      company: t("companies.2.company"),
      position: t("companies.2.position"),
      period: t("companies.2.period"),
      description: [
        t("companies.2.description.0"),
        t("companies.2.description.1"),
      ],
    },
    {
      company: t("companies.3.company"),
      position: t("companies.3.position"),
      period: t("companies.3.period"),
      description: [
        t("companies.3.description.0"),
        t("companies.3.description.1"),
      ],
    },
    {
      company: t("companies.4.company"),
      position: t("companies.4.position"),
      period: t("companies.4.period"),
      description: [t("companies.4.description.0")],
    },
  ];

  return (
    <div
      className={`min-h-screen p-4 pt-${
        isMobile ? 16 : 0
      } relative overflow-hidden`}
    >
      <BackgroundEffects />
      <ExperienceSection title={title} companies={companies} />

      <div className='mt-16'>
        <CTASection
          title='Want to see my technical skills in action?'
          linkedInLabel='View My Projects'
          contactLabel='Contact Me'
          primaryLink='/projects'
          secondaryLink='/contact'
          showBackground={false}
        />
      </div>
    </div>
  );
}
