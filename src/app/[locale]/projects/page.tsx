import { getTranslations } from "next-intl/server";
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

interface Project {
  title: string;
  description: string;
  technologies: string[];
  liveDemo?: string;
  github?: string;
  isPrivate?: boolean;
  gradient: string;
}

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

  const projects: Project[] = [
    {
      title: "Portfolio Website",
      description:
        "A modern, responsive portfolio website built with Next.js, featuring dark/light themes, internationalization (Hebrew/English), and futuristic UI design with animations.",
      technologies: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
      ],
      liveDemo: "https://nati-gurevich.vercel.app",
      github: "https://github.com/natig4/portfolio",
      gradient: "from-blue-500 to-purple-600",
    },
    {
      title: "Enterprise Resource Planning System",
      description:
        "A comprehensive ERP system for small businesses with modules for inventory management, customer relationships, and financial reporting. Built with .NET for maximum performance.",
      technologies: [
        "C#",
        ".NET Core",
        "SQL Server",
        "WPF",
        "Entity Framework",
      ],
      isPrivate: true,
      gradient: "from-purple-500 to-pink-600",
    },
    {
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce platform with user authentication, product catalog, shopping cart, and payment processing. Handles high traffic with optimized performance.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
      isPrivate: true,
      gradient: "from-green-500 to-blue-600",
    },
    {
      title: "Task Management Dashboard",
      description:
        "A drag-and-drop task management application with real-time updates using WebSockets. Features project creation, task assignment, and progress tracking.",
      technologies: [
        "Angular",
        "TypeScript",
        "NestJS",
        "PostgreSQL",
        "Socket.io",
      ],
      isPrivate: true,
      gradient: "from-red-500 to-orange-600",
    },
    {
      title: "Real-time Analytics Dashboard",
      description:
        "Interactive analytics dashboard for marketing performance monitoring. Features real-time data visualization, customizable reports, and advanced filtering.",
      technologies: ["React", "D3.js", "Node.js", "GraphQL", "Firebase"],
      liveDemo: "#",
      github: "#",
      gradient: "from-cyan-500 to-blue-600",
    },
  ];

  const translatedTitle = t("title");
  const translatedCodeLabel = t("code");
  const translatedPrivateLabel = t("private");
  const translatedLiveDemoLabel = t("liveDemo");

  return (
    <div className='min-h-screen p-4 pt-0 relative overflow-hidden'>
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
