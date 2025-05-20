"use client";

import { motion } from "framer-motion";
import SkillCard from "@/components/SkillCard/SkillCard";
import { ReactNode } from "react";

interface SkillCategory {
  icon: ReactNode;
  label: string;
  skills: string[];
  gradient: string;
}

interface SkillsSectionProps {
  title: string;
  skillCategories: SkillCategory[];
}

export default function SkillsSection({
  title,
  skillCategories,
}: SkillsSectionProps) {
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
