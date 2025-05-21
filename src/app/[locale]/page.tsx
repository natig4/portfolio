import { getTranslations } from "next-intl/server";
import { FaLaptopCode, FaServer, FaDatabase, FaDocker } from "react-icons/fa";
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

  const skillCategories = [
    {
      icon: <FaLaptopCode size={28} className='text-primary' />,
      label: "Frontend",
      skills: ["React", "Next.js", "Angular", "TypeScript", "Tailwind CSS"],
      gradient: "from-primary to-secondary",
    },
    {
      icon: <FaServer size={28} className='text-secondary' />,
      label: "Backend",
      skills: ["Node.js", "NestJS", "Express", ".NET Core", "Scala"],
      gradient: "from-secondary to-accent",
    },
    {
      icon: <FaDatabase size={28} className='text-accent' />,
      label: "Database",
      skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "GraphQL"],
      gradient: "from-accent to-accent-secondary",
    },
    {
      icon: <FaDocker size={28} className='text-accent-secondary' />,
      label: "DevOps",
      skills: ["Docker", "Kubernetes", "CI/CD", "AWS", "Azure"],
      gradient: "from-accent-secondary to-primary",
    },
  ];

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

      <SkillsSection
        title='Technical Skills'
        skillCategories={skillCategories}
      />

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
