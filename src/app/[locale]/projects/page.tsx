import { getTranslations, getMessages } from "next-intl/server";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiAngular,
  SiTypescript,
  SiPostgresql,
  SiDotnet,
  SiSharp,
  SiFirebase,
} from "react-icons/si";
import { JSX } from "react";
import ProjectsSection from "@/components/sections/Projects";
import BackgroundEffects from "@/components/BackgroundEffects/BackgroundEffects";
import { cookies } from "next/headers";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  liveDemo?: string;
  github?: string;
  isPrivate?: boolean;
  gradient: string;
}

interface TranslatedProjectEntry {
  title: string;
  description: string;
  technologies: Record<string, string>;
  liveDemo?: string;
  github?: string;
  isPrivate?: boolean;
}

interface TranslatedProjects {
  title: string;
  code: string;
  private: string;
  liveDemo: string;
  projects: Record<string, TranslatedProjectEntry>;
}

const gradients = [
  "from-blue-500 to-purple-600",
  "from-green-500 to-blue-600",
  "from-purple-500 to-pink-600",
  "from-red-500 to-orange-600",
  "from-cyan-500 to-blue-600",
  "from-yellow-500 to-red-600",
];

const techIconMap: { [key: string]: JSX.Element } = {
  React: <SiReact className='text-blue-400' />,
  "Node.js": <SiNodedotjs className='text-green-400' />,
  MongoDB: <SiMongodb className='text-green-600' />,
  Angular: <SiAngular className='text-red-500' />,
  TypeScript: <SiTypescript className='text-blue-600' />,
  PostgreSQL: <SiPostgresql className='text-blue-700' />,
  ".NET Core": <SiDotnet className='text-purple-500' />,
  "C#": <SiSharp className='text-purple-600' />,
  Firebase: <SiFirebase className='text-yellow-500' />,
};

export default async function ProjectsPage() {
  const t = await getTranslations("projects");
  const messages = await getMessages();
  const translatedProjects: TranslatedProjects["projects"] =
    messages.projects.projects;
  const isMobile = (await cookies()).get("isMobile")?.value === "true";

  const projectEntries = Object.values(translatedProjects);

  const projects: Project[] = projectEntries.map((projectData, index) => ({
    title: projectData.title,
    description: projectData.description,
    technologies: Object.values(projectData.technologies),
    liveDemo: projectData.liveDemo,
    github: projectData.github,
    isPrivate: projectData.isPrivate ?? false,
    gradient: gradients[index % gradients.length],
  }));

  const translatedTitle = t("title");
  const translatedCodeLabel = t("code");
  const translatedPrivateLabel = t("private");
  const translatedLiveDemoLabel = t("liveDemo");

  return (
    <div
      className={`min-h-screen p-4 pt-${
        isMobile ? 16 : 0
      } relative overflow-hidden`}
    >
      <BackgroundEffects />

      <ProjectsSection
        title={translatedTitle}
        projects={projects}
        techIcons={techIconMap}
        labels={{
          code: translatedCodeLabel,
          private: translatedPrivateLabel,
          liveDemo: translatedLiveDemoLabel,
        }}
      />
    </div>
  );
}
