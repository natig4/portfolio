"use client";

import { motion } from "framer-motion";
import SkillCard from "@/components/SkillCard/SkillCard";
import { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { FaLaptopCode, FaServer, FaDatabase, FaDocker } from "react-icons/fa";

interface SkillCategory {
  icon: ReactNode;
  label: string;
  skills: string[];
  gradient: string;
}

const skillCategories: SkillCategory[] = [
  {
    icon: <FaLaptopCode size={28} className='text-primary' />,
    label: "Frontend",
    skills: ["React", "Next.js", "Angular", "TypeScript", "Tailwind CSS"],
    gradient: "from-primary to-secondary",
  },
  {
    icon: <FaServer size={28} className='text-secondary' />,
    label: "Backend",
    skills: ["Node.js", "NestJS", "Express", ".NET Core", "Scala"],
    gradient: "from-secondary to-accent",
  },
  {
    icon: <FaDatabase size={28} className='text-accent' />,
    label: "Database",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "GraphQL"],
    gradient: "from-accent to-accent-secondary",
  },
  {
    icon: <FaDocker size={28} className='text-accent-secondary' />,
    label: "DevOps",
    skills: ["Docker", "Kubernetes", "CI/CD", "AWS", "Azure"],
    gradient: "from-accent-secondary to-primary",
  },
];

interface SkillsSectionProps {
  title: string;
}

export default function SkillsSection({ title }: SkillsSectionProps) {
  const t = useTranslations("common");

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
      className='w-full max-w-6xl relative z-10'
    >
      <motion.h2
        variants={itemVariants}
        className='text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'
      >
        {title}
      </motion.h2>

      <motion.p
        variants={itemVariants}
        className='text-xl text-text-secondary max-w-3xl mx-auto text-center mb-12'
      >
        {t("subtitles.skills")}
      </motion.p>

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
  );
}
