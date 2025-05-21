"use client";

import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaLock } from "react-icons/fa";
import { JSX } from "react";
import { useTranslations } from "next-intl";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  liveDemo?: string;
  github?: string;
  isPrivate?: boolean;
  gradient: string;
}

interface ProjectsSectionProps {
  title: string;
  projects: Project[];
  techIcons: { [key: string]: JSX.Element };
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
  techIcons,
  labels,
  prefersReducedMotion,
}: {
  project: Project;
  techIcons: { [key: string]: JSX.Element };
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
    <motion.div
      variants={itemVariants}
      {...hoverProps}
      className='will-change-transform group relative'
    >
      <div className='bg-surface/80 dark:bg-surface/60 backdrop-blur-sm rounded-2xl border border-border/30 overflow-hidden relative h-full flex flex-col'>
        <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />

        <div className='p-6 flex-1 flex flex-col'>
          <h3 className='text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors duration-200'>
            {project.title}
          </h3>

          <p className='text-text-secondary text-sm leading-relaxed mb-4 flex-1'>
            {project.description}
          </p>

          <div className='mb-6'>
            <h4 className='text-sm font-semibold text-text mb-3'>
              {t("technologies")}
            </h4>
            <div className='flex flex-wrap gap-2'>
              {project.technologies.map((tech, techIndex) => (
                <div
                  key={techIndex}
                  className='inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-medium border border-primary/20 hover:bg-primary/20 transition-colors duration-200'
                >
                  {techIcons[tech] || (
                    <span className='w-4 h-4 bg-primary rounded-full' />
                  )}
                  {tech}
                </div>
              ))}
            </div>
          </div>

          <div className='flex gap-3 mt-auto'>
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target='_blank'
                rel='noopener noreferrer'
                className='flex-1 px-4 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:shadow-lg will-change-transform hover:scale-[1.03] transition-all duration-200'
              >
                <FaExternalLinkAlt size={14} />
                {labels.liveDemo}
              </a>
            )}

            {project.github && !project.isPrivate && (
              <a
                href={project.github}
                target='_blank'
                rel='noopener noreferrer'
                className='flex-1 px-4 py-2.5 bg-surface border border-border/50 text-text rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-primary/10 hover:border-primary/30 will-change-transform hover:scale-[1.03] transition-all duration-200'
              >
                <FaGithub size={14} />
                {labels.code}
              </a>
            )}

            {project.isPrivate && (
              <div className='flex-1 px-4 py-2.5 bg-muted/50 text-text-secondary rounded-lg font-medium text-sm flex items-center justify-center gap-2 cursor-not-allowed'>
                <FaLock size={14} />
                {labels.private}
              </div>
            )}
          </div>
        </div>

        <div className='absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none' />
        <div className='absolute inset-0 border border-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none' />
      </div>
    </motion.div>
  );
});

const ProjectsSection = memo(function ProjectsSection({
  title,
  projects,
  techIcons,
  labels,
}: ProjectsSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("common");

  return (
    <div className='max-w-7xl mx-auto relative z-10'>
      <div className='text-center mb-16'>
        <h1
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
      </div>

      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
            techIcons={techIcons}
            labels={labels}
            prefersReducedMotion={!!prefersReducedMotion}
          />
        ))}
      </motion.div>

      <div className='text-center mt-16 p-8 bg-surface/30 backdrop-blur-sm rounded-2xl border border-border/20'>
        <p className='text-text-secondary text-lg mb-4'>
          More projects coming soon! Follow my journey on
        </p>
        <div className='flex justify-center gap-4'>
          <a
            href='https://github.com/natig4'
            target='_blank'
            rel='noopener noreferrer'
            className='will-change-transform px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg hover:scale-[1.05] hover:-translate-y-1 transition-all duration-200'
          >
            <FaGithub size={20} />
            GitHub
          </a>
          <a
            href='https://www.linkedin.com/in/nati-gurevich-36868711b'
            target='_blank'
            rel='noopener noreferrer'
            className='will-change-transform px-6 py-3 bg-surface border border-border/50 text-text rounded-lg font-semibold hover:bg-primary/10 hover:border-primary/30 hover:scale-[1.05] hover:-translate-y-1 transition-all duration-200'
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
});

export default ProjectsSection;
