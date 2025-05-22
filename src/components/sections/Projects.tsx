"use client";

import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaLock,
  FaSpider,
  FaWindows,
  FaFileExcel,
} from "react-icons/fa";
import { JSX } from "react";
import { useTranslations } from "next-intl";
import {
  SiAngular,
  SiCloudinary,
  SiDotnet,
  SiExpress,
  SiFirebase,
  SiJsonwebtokens,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPassport,
  SiPostgresql,
  SiReact,
  SiRedux,
  SiSass,
  SiSharp,
  SiSocketdotio,
  SiTypescript,
  SiAuth0,
  SiHelm,
} from "react-icons/si";

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
  "Next.js": <SiNextdotjs className='text-black' />,
  Cloudinary: <SiCloudinary className='text-blue-400' />,
  Redux: <SiRedux className='text-purple-500' />,
  "Socket.io": <SiSocketdotio className='text-black' />,
  Sass: <SiSass className='text-pink-400' />,
  Express: <SiExpress className='text-gray-700' />,
  Oauth2: <SiAuth0 className='text-green-500' />,
  passport: <SiPassport className='text-blue-700' />,
  helmet: <SiHelm className='text-green-700' />,
  "Web crawling": <FaSpider className='text-black' />,
  JWT: <SiJsonwebtokens className='text-yellow-400' />,
  WPF: <FaWindows className='text-blue-700' />,
  EPPlus: <FaFileExcel className='text-green-600' />,
};

const hebrewToEnglishTechMap: { [key: string]: string } = {
  נקסט: "Next.js",
  קלאודינרי: "Cloudinary",
  טייפסקריפט: "TypeScript",
  ריאקט: "React",
  "Node.js": "Node.js",
  רידאקס: "Redux",
  סוקטים: "Socket.io",
  סאס: "Sass",
  אקספרס: "Express",
  Oauth2: "Oauth2",
  Passport: "passport",
  Helmet: "helmet",
  "Web crawling": "Web crawling",
  "C#": "C#",
  ".NET Core": ".NET Core",
  JWT: "JWT",
  WPF: "WPF",
  EPPlus: "EPPlus",
};

export function getTechIcon(tech: string) {
  const englishTech = hebrewToEnglishTechMap[tech] || tech;
  return techIconMap[englishTech] || null;
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  liveDemo?: string;
  github?: string;
  isPrivate?: string;
  gradient: string;
}

interface ProjectsSectionProps {
  title: string;
  projects: Project[];
  labels: {
    code: string;
    private: string;
    liveDemo: string;
  };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      duration: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const ProjectCard = memo(function ProjectCard({
  project,
  labels,
  prefersReducedMotion,
}: {
  project: Project;
  labels: { code: string; private: string; liveDemo: string };
  prefersReducedMotion: boolean;
}) {
  const t = useTranslations("projects");
  const hoverProps = prefersReducedMotion
    ? {}
    : {
        whileHover: {
          y: -10,
          scale: 1.02,
          transition: { duration: 0.2, ease: "easeOut" },
        },
      };

  return (
    <motion.article
      variants={itemVariants}
      {...hoverProps}
      className='will-change-transform group relative'
      role='article'
      aria-labelledby={`project-${project.title
        .replace(/\s+/g, "-")
        .toLowerCase()}`}
    >
      <div className='bg-surface/80 dark:bg-surface/60 backdrop-blur-sm rounded-2xl border border-border/30 overflow-hidden relative h-full flex flex-col'>
        <div
          className={`h-2 bg-gradient-to-r ${project.gradient}`}
          aria-hidden='true'
        />

        <div className='p-6 flex-1 flex flex-col'>
          <header>
            <h3
              id={`project-${project.title.replace(/\s+/g, "-").toLowerCase()}`}
              className='text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors duration-200'
            >
              {project.title}
            </h3>
          </header>

          <p className='text-text-secondary text-sm leading-relaxed mb-4 flex-1'>
            {project.description}
          </p>

          <section
            className='mb-6'
            aria-labelledby={`tech-${project.title
              .replace(/\s+/g, "-")
              .toLowerCase()}`}
          >
            <h4
              id={`tech-${project.title.replace(/\s+/g, "-").toLowerCase()}`}
              className='text-sm font-semibold text-text mb-3'
            >
              {t("technologies")}
            </h4>
            <ul
              className='flex flex-wrap gap-2'
              role='list'
              aria-label={`Technologies used in ${project.title}`}
            >
              {project.technologies.map((tech, techIndex) => (
                <li key={techIndex} role='listitem'>
                  <span
                    className='inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-medium border border-primary/20 hover:bg-primary/20 transition-colors duration-200'
                    role='img'
                    aria-label={`Technology: ${tech}`}
                  >
                    {getTechIcon(tech) || (
                      <span
                        className='w-4 h-4 bg-primary rounded-full'
                        aria-hidden='true'
                      />
                    )}
                    {tech}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <footer className='flex gap-3 mt-auto'>
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target='_blank'
                rel='noopener noreferrer'
                className='flex-1 px-4 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:shadow-lg will-change-transform hover:scale-[1.03] transition-all duration-200'
                aria-label={`View live demo of ${project.title} (opens in new tab)`}
              >
                <FaExternalLinkAlt size={14} aria-hidden='true' />
                {labels.liveDemo}
              </a>
            )}

            {project.github && !(project.isPrivate === "true") && (
              <a
                href={project.github}
                target='_blank'
                rel='noopener noreferrer'
                className='flex-1 px-4 py-2.5 bg-surface border border-border/50 text-text rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-primary/10 hover:border-primary/30 will-change-transform hover:scale-[1.03] transition-all duration-200'
                aria-label={`View source code for ${project.title} on GitHub (opens in new tab)`}
              >
                <FaGithub size={14} aria-hidden='true' />
                {labels.code}
              </a>
            )}

            {project.isPrivate === "true" && (
              <div
                className='flex-1 px-4 py-2.5 bg-muted/50 text-text-secondary rounded-lg font-medium text-sm flex items-center justify-center gap-2 cursor-not-allowed'
                role='button'
                aria-disabled='true'
                aria-label={`Source code for ${project.title} is private`}
              >
                <FaLock size={14} aria-hidden='true' />
                {labels.private}
              </div>
            )}
          </footer>
        </div>

        <div
          className='absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'
          aria-hidden='true'
        />
        <div
          className='absolute inset-0 border border-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'
          aria-hidden='true'
        />
      </div>
    </motion.article>
  );
});

const ProjectsSection = memo(function ProjectsSection({
  title,
  projects,
  labels,
}: ProjectsSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("common");

  return (
    <main
      className='max-w-7xl mx-auto relative z-10'
      role='main'
      aria-labelledby='projects-title'
    >
      <header className='text-center mb-16'>
        <h1
          id='projects-title'
          className='text-4xl md:text-6xl lg:text-7xl font-bold mb-6'
          style={{
            background:
              "linear-gradient(135deg, var(--primary), var(--secondary), var(--accent))",
            backgroundSize: "200% 200%",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {title}
        </h1>
        <p className='text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto'>
          {t("subtitles.projects")}
        </p>
      </header>

      <motion.section
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start'
        aria-label='Portfolio projects'
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
            labels={labels}
            prefersReducedMotion={!!prefersReducedMotion}
          />
        ))}
      </motion.section>

      <aside className='text-center mt-16 p-8 bg-surface/30 backdrop-blur-sm rounded-2xl border border-border/20'>
        <p className='text-text-secondary text-lg mb-4'>
          {t("subtitles.moreProjects")}
        </p>
        <nav
          className='flex justify-center gap-4'
          aria-label='External portfolio links'
        >
          <a
            href='https://github.com/natig4'
            target='_blank'
            rel='noopener noreferrer'
            className='will-change-transform px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg hover:scale-[1.05] hover:-translate-y-1 transition-all duration-200'
            aria-label='View more projects on GitHub (opens in new tab)'
          >
            <FaGithub size={20} aria-hidden='true' />
            {t("buttons.github")}
          </a>
          <a
            href='https://www.linkedin.com/in/nati-gurevich-36868711b'
            target='_blank'
            rel='noopener noreferrer'
            className='will-change-transform px-6 py-3 bg-surface border border-border/50 text-text rounded-lg font-semibold hover:bg-primary/10 hover:border-primary/30 hover:scale-[1.05] hover:-translate-y-1 transition-all duration-200'
            aria-label='Connect on LinkedIn (opens in new tab)'
          >
            {t("buttons.linkedin")}
          </a>
        </nav>
      </aside>
    </main>
  );
});

export default ProjectsSection;
