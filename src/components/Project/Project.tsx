import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { memo } from "react";
import { FaExternalLinkAlt, FaGithub, FaLock } from "react-icons/fa";
import { getTechIcon, Project } from "../sections/Projects";

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
  labels: {
    code: string;
    private: string;
    liveDemo: string;
    inProgress: string;
  };
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

export default ProjectCard;
