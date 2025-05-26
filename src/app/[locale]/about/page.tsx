import { getTranslations } from "next-intl/server";
import { FaLaptopCode, FaServer, FaDatabase, FaDocker } from "react-icons/fa";
import AboutSection from "@/components/sections/About";
import BackgroundEffects from "@/components/BackgroundEffects/BackgroundEffects";
import CTASection from "@/components/CTASection/CTASection";
import { cookies } from "next/headers";

export default async function AboutPage() {
  const t = await getTranslations("about");
  const commonT = await getTranslations("common");
  const isMobile = (await cookies()).get("isMobile")?.value === "true";

  const aboutData = {
    title: t("title"),
    description: t("description"),
    skillsTitle: t("skills"),
    skillCategories: {
      frontend: t("skillCategories.frontend"),
      backend: t("skillCategories.backend"),
      database: t("skillCategories.database"),
      devops: t("skillCategories.devops"),
    },
    stats: {
      years: {
        value: t("stats.years"),
        description: t("stats.yearsDesc"),
      },
      users: {
        value: t("stats.users"),
        description: t("stats.usersDesc"),
      },
      bugs: {
        value: t("stats.bugs"),
        description: t("stats.bugsDesc"),
      },
    },
  };

  const skillCategories = [
    {
      icon: <FaLaptopCode size={28} className='text-primary' />,
      label: aboutData.skillCategories.frontend,
      skills: ["React", "Next.js", "Angular", "TypeScript", "Tailwind CSS"],
      gradient: "from-primary to-secondary",
    },
    {
      icon: <FaServer size={28} className='text-secondary' />,
      label: aboutData.skillCategories.backend,
      skills: ["Node.js", "NestJS", "Express", ".NET Core", "Scala"],
      gradient: "from-secondary to-accent",
    },
    {
      icon: <FaDatabase size={28} className='text-accent' />,
      label: aboutData.skillCategories.database,
      skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "GraphQL"],
      gradient: "from-accent to-accent-secondary",
    },
    {
      icon: <FaDocker size={28} className='text-accent-secondary' />,
      label: aboutData.skillCategories.devops,
      skills: ["Docker", "Kubernetes", "CI/CD", "AWS", "Azure"],
      gradient: "from-accent-secondary to-primary",
    },
  ];

  return (
    <div
      className={`min-h-screen p-4 pt-${
        isMobile ? 16 : 0
      } relative overflow-hidden`}
    >
      <BackgroundEffects />
      <AboutSection
        title={aboutData.title}
        description={aboutData.description}
        skillsTitle={aboutData.skillsTitle}
        skillCategories={skillCategories}
        stats={aboutData.stats}
      />

      <div className='mt-16'>
        <CTASection
          linkedInLabel={commonT("buttons.viewExperience")}
          contactLabel={commonT("buttons.getInTouch")}
          primaryLink='/experience'
          secondaryLink='/contact'
          titleKey='aboutTitle'
        />
      </div>
    </div>
  );
}
