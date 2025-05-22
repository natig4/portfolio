"use client";

import { motion } from "framer-motion";
import { JSX } from "react";
import SkillCard from "@/components/SkillCard/SkillCard";
import { useDirection } from "@/hooks/useDirection";
import { memo } from "react";

interface SkillCategory {
  icon: JSX.Element;
  label: string;
  skills: string[];
  gradient: string;
}

interface Stats {
  years: {
    value: string;
    description: string;
  };
  users: {
    value: string;
    description: string;
  };
  bugs: {
    value: string;
    description: string;
  };
}

interface AboutSectionProps {
  title: string;
  description: string;
  skillsTitle: string;
  skillCategories: SkillCategory[];
  stats: Stats;
}

const AboutSection = memo(function AboutSection({
  title,
  description,
  skillsTitle,
  skillCategories,
  stats,
}: AboutSectionProps) {
  const { direction } = useDirection();

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.main
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className='max-w-6xl mx-auto relative z-10'
      role='main'
      aria-labelledby='about-title'
    >
      <motion.section
        variants={itemVariants}
        className='text-center mb-20'
        aria-labelledby='about-title'
      >
        <header>
          <h1
            id='about-title'
            className='text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'
          >
            {title}
          </h1>
        </header>
        <p
          className='text-lg md:text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed'
          dir={direction}
        >
          {description}
        </p>
      </motion.section>

      <motion.section
        variants={itemVariants}
        className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-20'
        aria-labelledby='stats-title'
      >
        <h2 id='stats-title' className='sr-only'>
          Professional Statistics
        </h2>

        <motion.article
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className='p-8 bg-surface/80 backdrop-blur-lg rounded-2xl border border-border/30 text-center hover:shadow-lg hover:shadow-primary/5 transition-all duration-200'
          role='article'
          aria-labelledby='years-stat'
        >
          <h3
            id='years-stat'
            className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4'
          >
            {stats.years.value}
          </h3>
          <p className='text-text-secondary'>{stats.years.description}</p>
        </motion.article>

        <motion.article
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className='p-8 bg-surface/80 backdrop-blur-lg rounded-2xl border border-border/30 text-center hover:shadow-lg hover:shadow-secondary/5 transition-all duration-200'
          role='article'
          aria-labelledby='users-stat'
        >
          <h3
            id='users-stat'
            className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent mb-4'
          >
            {stats.users.value}
          </h3>
          <p className='text-text-secondary'>{stats.users.description}</p>
        </motion.article>

        <motion.article
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className='p-8 bg-surface/80 backdrop-blur-lg rounded-2xl border border-border/30 text-center hover:shadow-lg hover:shadow-accent/5 transition-all duration-200'
          role='article'
          aria-labelledby='bugs-stat'
        >
          <h3
            id='bugs-stat'
            className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent mb-4'
          >
            {stats.bugs.value}
          </h3>
          <p className='text-text-secondary'>{stats.bugs.description}</p>
        </motion.article>
      </motion.section>

      <motion.section
        variants={containerVariants}
        className='w-full max-w-6xl relative z-10'
        aria-labelledby='skills-title'
      >
        <header>
          <motion.h2
            id='skills-title'
            variants={itemVariants}
            className='text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'
          >
            {skillsTitle}
          </motion.h2>
        </header>

        <div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'
          role='list'
          aria-label='Technical skills organized by category'
        >
          {skillCategories.map((category, index) => (
            <div key={index} role='listitem'>
              <SkillCard
                icon={category.icon}
                title={category.label}
                skills={category.skills}
                gradient={category.gradient}
                index={index}
                itemVariants={itemVariants}
              />
            </div>
          ))}
        </div>
      </motion.section>
    </motion.main>
  );
});

export default AboutSection;
