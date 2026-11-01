import { getTranslations, setRequestLocale } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";

import ProjectsSection from "@/components/sections/Projects";
import { getTranslatedObject } from "@/lib/utils/translation-helpers";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  liveDemo?: string;
  github?: string;
  isPrivate?: string;
  gradient: string;
}

const gradients = [
  "from-blue-500 to-purple-600",
  "from-green-500 to-blue-600",
  "from-purple-500 to-pink-600",
  "from-red-500 to-orange-600",
  "from-cyan-500 to-blue-600",
  "from-yellow-500 to-red-600",
];

async function getProjects(): Promise<Project[]> {
  const t = await getTranslations("projects");
  const raw = await t.raw("projects");
  const keys = Object.keys(raw);
  const basePath = "projects";

  const projects: Project[] = await Promise.all(
    keys.map(async (key, index) => {
      const project = await getTranslatedObject<
        Omit<Project, "technologies" | "gradient">
      >("projects", `${basePath}.${key}`, [
        "title",
        "description",
        "liveDemo",
        "github",
        "isPrivate",
        "inProgress",
      ]);

      return {
        ...project,
        technologies: Object.values(raw[key]?.technologies),
        isPrivate: project.isPrivate,
        gradient: gradients[index % gradients.length],
      };
    }),
  );

  return projects;
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projects");

  const projects = await getProjects();

  const translatedTitle = t("title");
  const translatedCodeLabel = t("code");
  const translatedPrivateLabel = t("private");
  const translatedLiveDemoLabel = t("liveDemo");
  const translatedProgressLabel = t("inProgress");

  return (
    <div className='min-h-screen p-4 relative overflow-hidden'>
      <ProjectsSection
        title={translatedTitle}
        projects={projects}
        labels={{
          inProgress: translatedProgressLabel,
          code: translatedCodeLabel,
          private: translatedPrivateLabel,
          liveDemo: translatedLiveDemoLabel,
        }}
      />
    </div>
  );
}
