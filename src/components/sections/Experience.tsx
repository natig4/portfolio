"use client";

import { motion } from "framer-motion";
import { useDirection } from "@/hooks/useDirection";
import { memo } from "react";

interface Company {
  company: string;
  position: string;
  period: string;
  description: string[];
}

interface ExperienceSectionProps {
  title: string;
  companies: Company[];
}

const ExperienceSection = memo(function ExperienceSection({
  title,
  companies,
}: ExperienceSectionProps) {
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
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className='max-w-6xl mx-auto relative z-10'
    >
      <motion.div variants={itemVariants} className='text-center mb-16'>
        <h1 className='text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>
          {title}
        </h1>
        <p className='text-xl text-text-secondary max-w-3xl mx-auto'>
          My professional journey across development and quality assurance
        </p>
      </motion.div>

      <div className='grid grid-cols-1 gap-10 lg:gap-16'>
        {companies.map((company, index) => (
          <motion.div key={index} variants={itemVariants} className='relative'>
            {/* Timeline connector */}
            {index < companies.length - 1 && (
              <div className='absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 to-secondary/40 hidden md:block'></div>
            )}

            <motion.div
              whileHover={{
                y: -5,
                scale: 1.01,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              className='relative md:ml-16 bg-surface/80 dark:bg-surface/60 backdrop-blur-lg p-8 rounded-2xl border border-border/30 overflow-hidden group transition-all duration-200'
              dir={direction}
            >
              {/* Timeline dot */}
              <div className='absolute left-[-2rem] top-8 w-4 h-4 rounded-full bg-gradient-to-r from-primary to-secondary hidden md:block'></div>

              <div className='absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none'></div>

              <div className='relative z-10'>
                {/* Period indicator */}
                <div className='flex flex-col md:flex-row md:items-center gap-4 mb-4'>
                  <span className='px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-lg inline-flex items-center justify-center'>
                    {company.period}
                  </span>
                </div>

                {/* Company & Position */}
                <div className='mb-6'>
                  <h3 className='text-2xl md:text-3xl font-bold mb-2 text-text'>
                    {company.position}
                  </h3>
                  <p className='text-xl text-text-secondary'>
                    {company.company}
                  </p>
                </div>

                {/* Description */}
                <ul className='space-y-3'>
                  {company.description.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.3 + itemIndex * 0.1,
                        duration: 0.3,
                      }}
                      className='flex items-start gap-3 text-text-secondary'
                    >
                      <span className='w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full mt-2 flex-shrink-0'></span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
});

export default ExperienceSection;
