import React from "react";
import { motion, Variants } from "framer-motion";
import { useDirection } from "@/hooks/useDirection";

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  skills: string[];
  gradient: string;
  index: number;
  itemVariants: Variants;
}

const SkillCard: React.FC<SkillCardProps> = ({
  icon,
  title,
  skills,
  gradient,
  index,
  itemVariants,
}) => {
  const { direction } = useDirection();

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      className='bg-surface/80 dark:bg-surface/60 backdrop-blur-lg p-6 rounded-2xl border border-border/30 relative overflow-hidden group transition-all duration-200 cursor-pointer'
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-200`}
      />

      <div className='relative z-10'>
        <div className='flex items-center gap-3 mb-6' dir={direction}>
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
            className='flex items-center justify-center p-3 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 cursor-pointer flex-shrink-0'
          >
            {icon}
          </motion.div>
          <h3 className='text-xl font-semibold text-text'>{title}</h3>
        </div>

        <ul className='space-y-3'>
          {skills.map((skill, skillIndex) => (
            <motion.li
              key={skillIndex}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.1 + skillIndex * 0.03,
                duration: 0.2,
              }}
              className='flex items-center gap-3 text-text-secondary group-hover:text-text transition-colors duration-200'
              dir={direction}
            >
              <span className='w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full flex-shrink-0'></span>
              <span className='hover:text-primary transition-colors duration-150 cursor-default'>
                {skill}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default SkillCard;
