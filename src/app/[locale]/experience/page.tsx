import { getTranslations } from "next-intl/server";
import ExperienceSection from "@/components/sections/Experience";
import BackgroundEffects from "@/components/BackgroundEffects/BackgroundEffects";

export default async function ExperiencePage() {
  const t = await getTranslations("experience");

  const title = t("title");
  const companies = t("companies").map((company: any) => ({
    company: company.company,
    position: company.position,
    period: company.period,
    description: company.description,
  }));

  return (
    <div className='min-h-screen p-4 py-16 relative overflow-hidden'>
      <BackgroundEffects />
      <ExperienceSection title={title} companies={companies} />
    </div>
  );
}
