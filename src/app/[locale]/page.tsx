"use client";

import { useTranslations } from "next-intl";
import { FaLaptopCode, FaServer, FaDatabase, FaDocker } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Home() {
  const t = useTranslations("home");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const skillCategories = [
    {
      icon: <FaLaptopCode size={32} className='text-primary' />,
      label: "Frontend",
      skills: ["React", "Next.js", "Angular", "TypeScript", "Tailwind CSS"],
      gradient: "from-primary to-secondary",
    },
    {
      icon: <FaServer size={32} className='text-secondary' />,
      label: "Backend",
      skills: ["Node.js", "NestJS", "Express", ".NET Core", "Scala"],
      gradient: "from-secondary to-accent",
    },
    {
      icon: <FaDatabase size={32} className='text-accent' />,
      label: "Database",
      skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "GraphQL"],
      gradient: "from-accent to-accent-secondary",
    },
    {
      icon: <FaDocker size={32} className='text-accent-secondary' />,
      label: "DevOps",
      skills: ["Docker", "Kubernetes", "CI/CD", "AWS", "Azure"],
      gradient: "from-accent-secondary to-primary",
    },
  ];

  return (
    <div className='home-container w-full flex flex-col items-center px-4 py-16 relative overflow-hidden'>
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float' />
        <div
          className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float'
          style={{ animationDelay: "1s" }}
        />
        <div
          className='absolute top-1/2 left-1/2 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-float'
          style={{ animationDelay: "2s" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='text-center max-w-4xl mb-16 relative z-10'
      >
        <motion.h1
          className='text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient-shift'
          style={{ backgroundSize: "200% 200%" }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 3,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {t("title")}
        </motion.h1>

        <motion.p
          className='text-xl md:text-2xl text-text-secondary mb-8'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          className='mt-8 flex flex-wrap justify-center gap-4'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 40px var(--glow-primary)",
            }}
            whileTap={{ scale: 0.95 }}
            className='px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl shadow-lg transition-all duration-300 font-semibold relative overflow-hidden group'
          >
            <span className='relative z-10'>{t("viewProjects")}</span>
            <div className='absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 40px var(--glow-accent)",
            }}
            whileTap={{ scale: 0.95 }}
            className='px-8 py-4 bg-surface border-2 border-primary/30 hover:border-primary/60 text-text rounded-xl shadow-lg transition-all duration-300 font-semibold relative overflow-hidden group backdrop-blur-sm'
          >
            <span className='relative z-10'>{t("contactMe")}</span>
            <div className='absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
          </motion.button>
        </motion.div>
      </motion.div>

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
          Technical Skills
        </motion.h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 60px var(--glow-primary)",
                scale: 1.02,
              }}
              className='bg-surface/80 dark:bg-surface/60 backdrop-blur-lg p-6 rounded-2xl border border-border/30 relative overflow-hidden group transition-all duration-300'
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />

              <div className='relative z-10'>
                <div className='flex items-center mb-6'>
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className='p-3 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 mr-3'
                  >
                    {category.icon}
                  </motion.div>
                  <h3 className='text-xl font-semibold text-text'>
                    {category.label}
                  </h3>
                </div>

                <ul className='space-y-3'>
                  {category.skills.map((skill, skillIndex) => (
                    <motion.li
                      key={skillIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.1 + skillIndex * 0.05,
                        duration: 0.3,
                      }}
                      className='flex items-center text-text-secondary group-hover:text-text transition-colors duration-300'
                    >
                      <span className='mr-3 w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full'></span>
                      <span className='hover:text-primary transition-colors duration-200'>
                        {skill}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <div className='absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 blur-xl' />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className='mt-20 text-center relative z-10'
      >
        <motion.div
          className='p-6 rounded-2xl bg-surface/50 backdrop-blur-lg border border-border/30'
          whileHover={{
            scale: 1.05,
            boxShadow: "0 20px 60px var(--glow-secondary)",
          }}
        >
          <p className='text-lg text-text-secondary mb-4'>📍 {t("location")}</p>
        </motion.div>
      </motion.div>

      <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent' />
      <div className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent' />
    </div>
  );
}
