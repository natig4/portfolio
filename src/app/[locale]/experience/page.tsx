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

export async function generateMetadata() {
  const experienceT = await getTranslations("experience");
  const commonT = await getTranslations("common");

  return {
    title: `${experienceT("title")} | Nati Gurevich`,
    description: commonT("subtitles.experience"),
  };
}

async function getCompanies(): Promise<CompanyData[]> {
  const t = await getTranslations("experience");
  const raw = await t.raw("companies");
  const keys = Object.keys(raw);

  const companies: CompanyData[] = keys.map((key) => {
    const companyData = raw[key];

    const description =
      typeof companyData.description === "object"
        ? Array.isArray(companyData.description)
          ? companyData.description
          : Object.values(companyData.description)
        : [];

    return {
      company: companyData.company,
      position: companyData.position,
      period: companyData.period,
      description,
    };
  });

  return companies;
}

export default async function ExperiencePage() {
  const t = await getTranslations("experience");
  const commonT = await getTranslations("common");
  const isMobile = (await cookies()).get("isMobile")?.value === "true";

  const title = t("title");
  const companies: CompanyData[] = await getCompanies();

  return (
    <div
      className={`min-h-screen p-4 pt-${
        isMobile ? 16 : 0
      } relative overflow-hidden`}
    >
      <BackgroundEffects />
      <ExperienceSection
        isMobile={isMobile}
        title={title}
        companies={companies}
      />

      <div className='mt-16'>
        <CTASection
          linkedInLabel={commonT("buttons.viewProjects")}
          contactLabel={commonT("buttons.contactMe")}
          primaryLink='/projects'
          secondaryLink='/contact'
          titleKey='experienceTitle'
        />
      </div>
    </div>
  );
}
