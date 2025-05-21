"use client";

import { motion } from "framer-motion";
import { JSX } from "react";
import SkillCard from "@/components/SkillCard/SkillCard";
import { useDirection } from "@/hooks/useDirection";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

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

export default function AboutSection({
  title,
  description,
  skillsTitle,
  skillCategories,
  stats,
}: AboutSectionProps) {
  const { direction } = useDirection();
  const t = useTranslations("contact");

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
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className='max-w-6xl mx-auto relative z-10'
    >
      {/* About Me Section */}
      <motion.div variants={itemVariants} className='text-center mb-20'>
        <h1 className='text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>
          {title}
        </h1>
        <p
          className='text-lg md:text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed'
          dir={direction}
        >
          {description}
        </p>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        variants={itemVariants}
        className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-20'
      >
        {/* Years of Experience */}
        <motion.div
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className='p-8 bg-surface/80 backdrop-blur-lg rounded-2xl border border-border/30 text-center hover:shadow-lg hover:shadow-primary/5 transition-all duration-200'
        >
          <h3 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4'>
            {stats.years.value}
          </h3>
          <p className='text-text-secondary'>{stats.years.description}</p>
        </motion.div>

        {/* Users Served */}
        <motion.div
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className='p-8 bg-surface/80 backdrop-blur-lg rounded-2xl border border-border/30 text-center hover:shadow-lg hover:shadow-secondary/5 transition-all duration-200'
        >
          <h3 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent mb-4'>
            {stats.users.value}
          </h3>
          <p className='text-text-secondary'>{stats.users.description}</p>
        </motion.div>

        {/* Critical Bugs */}
        <motion.div
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className='p-8 bg-surface/80 backdrop-blur-lg rounded-2xl border border-border/30 text-center hover:shadow-lg hover:shadow-accent/5 transition-all duration-200'
        >
          <h3 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent mb-4'>
            {stats.bugs.value}
          </h3>
          <p className='text-text-secondary'>{stats.bugs.description}</p>
        </motion.div>
      </motion.div>

      {/* Skills Section */}
      <motion.div
        variants={containerVariants}
        className='w-full max-w-6xl relative z-10'
      >
        <motion.h2
          variants={itemVariants}
          className='text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'
        >
          {skillsTitle}
        </motion.h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {skillCategories.map((category, index) => (
            <SkillCard
              key={index}
              icon={category.icon}
              title={category.label}
              skills={category.skills}
              gradient={category.gradient}
              index={index}
              itemVariants={itemVariants}
            />
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        variants={itemVariants}
        className='text-center mt-20 p-10 bg-surface/30 backdrop-blur-sm rounded-2xl border border-border/20'
      >
        <h3 className='text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
          Let&rsquo;s Work Together
        </h3>
        <p className='text-text-secondary text-lg mb-8 max-w-3xl mx-auto'>
          Looking for a developer with a quality-first approach? Let&rsquo;s
          discuss how I can help bring your project to life with clean,
          maintainable code and exceptional user experiences.
        </p>
        <motion.div
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href={{ pathname: "/contact" }}
            className='px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold inline-block hover:shadow-lg transition-all duration-200'
          >
            {t("title")}
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
