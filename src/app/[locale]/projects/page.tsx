"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaLock } from "react-icons/fa";
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

interface Project {
  title: string;
  description: string;
  technologies: string[];
  liveDemo?: string;
  github?: string;
  isPrivate?: boolean;
  gradient: string;
}

const getTechIcon = (tech: string) => {
  const iconMap: { [key: string]: JSX.Element } = {
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

  return iconMap[tech] || <span className='w-4 h-4 bg-primary rounded-full' />;
};

export default function ProjectsPage() {
  const t = useTranslations("projects");

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
    <div className='min-h-screen p-4 py-16 relative overflow-hidden'>
      {/* Background Effects */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]' />
        <motion.div
          className='absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl'
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className='absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl'
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

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
            {t("title")}
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
                          {getTechIcon(tech)}
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
                        Live Demo
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
                        Code
                      </motion.a>
                    )}

                    {project.isPrivate && (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className='flex-1 px-4 py-2.5 bg-muted/50 text-text-secondary rounded-lg font-medium text-sm flex items-center justify-center gap-2 cursor-not-allowed'
                      >
                        <FaLock size={14} />
                        Private
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
    </div>
  );
}
