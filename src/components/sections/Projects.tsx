"use client";

import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaLock } from "react-icons/fa";
import { JSX } from "react";

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

export default function ProjectsSection({
  title,
  projects,
  techIcons,
  labels,
}: ProjectsSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className='max-w-7xl mx-auto relative z-10'
    >
      {/* Header */}
      <motion.div variants={itemVariants} className='text-center mb-16'>
        <motion.h1
          className='text-4xl md:text-6xl lg:text-7xl font-bold mb-6'
          style={{
            background:
              "linear-gradient(135deg, var(--primary), var(--secondary), var(--accent))",
            backgroundSize: "200% 200%",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 8,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {title}
        </motion.h1>
        <motion.p
          className='text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Showcasing innovative solutions built with modern technologies
        </motion.p>
      </motion.div>

      {/* Projects Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{
              y: -10,
              scale: 1.02,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            className='group relative'
          >
            {/* Project Card */}
            <div className='bg-surface/80 dark:bg-surface/60 backdrop-blur-lg rounded-2xl border border-border/30 overflow-hidden relative h-full flex flex-col'>
              {/* Gradient Header */}
              <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />

              {/* Card Content */}
              <div className='p-6 flex-1 flex flex-col'>
                {/* Title */}
                <h3 className='text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors duration-200'>
                  {project.title}
                </h3>

                {/* Description */}
                <p className='text-text-secondary text-sm leading-relaxed mb-4 flex-1'>
                  {project.description}
                </p>

                {/* Technologies */}
                <div className='mb-6'>
                  <h4 className='text-sm font-semibold text-text mb-3'>
                    Technologies
                  </h4>
                  <div className='flex flex-wrap gap-2'>
                    {project.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                        className='inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-medium border border-primary/20 hover:bg-primary/20 transition-colors duration-200'
                      >
                        {techIcons[tech] || (
                          <span className='w-4 h-4 bg-primary rounded-full' />
                        )}
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className='flex gap-3 mt-auto'>
                  {project.liveDemo && (
                    <motion.a
                      href={project.liveDemo}
                      target='_blank'
                      rel='noopener noreferrer'
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className='flex-1 px-4 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-200'
                    >
                      <FaExternalLinkAlt size={14} />
                      {labels.liveDemo}
                    </motion.a>
                  )}

                  {project.github && !project.isPrivate && (
                    <motion.a
                      href={project.github}
                      target='_blank'
                      rel='noopener noreferrer'
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className='flex-1 px-4 py-2.5 bg-surface border border-border/50 text-text rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-primary/10 hover:border-primary/30 transition-all duration-200'
                    >
                      <FaGithub size={14} />
                      {labels.code}
                    </motion.a>
                  )}

                  {project.isPrivate && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className='flex-1 px-4 py-2.5 bg-muted/50 text-text-secondary rounded-lg font-medium text-sm flex items-center justify-center gap-2 cursor-not-allowed'
                    >
                      <FaLock size={14} />
                      {labels.private}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Hover Effects */}
              <div className='absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none' />
              <div className='absolute inset-0 border border-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none' />

              {/* Animated border */}
              <motion.div
                className='absolute inset-0 rounded-2xl'
                style={{
                  background: `conic-gradient(from 0deg, transparent, var(--primary), transparent)`,
                  padding: "1px",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "xor",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  opacity: 0,
                }}
                whileHover={{ opacity: 0.4 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Note */}
      <motion.div
        variants={itemVariants}
        className='text-center mt-16 p-8 bg-surface/30 backdrop-blur-sm rounded-2xl border border-border/20'
      >
        <p className='text-text-secondary text-lg mb-4'>
          More projects coming soon! Follow my journey on
        </p>
        <div className='flex justify-center gap-4'>
          <motion.a
            href='https://github.com/natig4'
            target='_blank'
            rel='noopener noreferrer'
            whileHover={{ scale: 1.1, y: -2 }}
            className='px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg transition-all duration-200'
          >
            <FaGithub size={20} />
            GitHub
          </motion.a>
          <motion.a
            href='https://www.linkedin.com/in/nati-gurevich-36868711b'
            target='_blank'
            rel='noopener noreferrer'
            whileHover={{ scale: 1.1, y: -2 }}
            className='px-6 py-3 bg-surface border border-border/50 text-text rounded-lg font-semibold hover:bg-primary/10 hover:border-primary/30 transition-all duration-200'
          >
            LinkedIn
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
}
