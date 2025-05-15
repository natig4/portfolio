"use client";

import { useTranslations } from "next-intl";
import { FaLaptopCode, FaServer, FaDatabase, FaDocker } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTheme } from "@/components/Theme/ThemeProvider";

export default function Home() {
  const t = useTranslations("home");
  const { theme } = useTheme();

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
      icon: <FaLaptopCode size={32} className='text-primary-600' />,
      label: "Frontend",
      skills: ["React", "Next.js", "Angular", "TypeScript", "Tailwind CSS"],
    },
    {
      icon: <FaServer size={32} className='text-primary-600' />,
      label: "Backend",
      skills: ["Node.js", "NestJS", "Express", ".NET Core", "Scala"],
    },
    {
      icon: <FaDatabase size={32} className='text-primary-600' />,
      label: "Database",
      skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "GraphQL"],
    },
    {
      icon: <FaDocker size={32} className='text-primary-600' />,
      label: "DevOps",
      skills: ["Docker", "Kubernetes", "CI/CD", "AWS", "Azure"],
    },
  ];

  return (
    <div className='home-container w-full flex flex-col items-center px-4 py-16'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='text-center max-w-3xl mb-16'
      >
        <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 dark:text-white'>
          {t("title")}
        </h1>
        <p className='text-xl md:text-2xl text-gray-700 dark:text-gray-300'>
          {t("subtitle")}
        </p>

        <div className='mt-8 flex flex-wrap justify-center gap-4'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='px-6 py-3 bg-primary-700 hover:bg-primary-800 text-white rounded-lg shadow-md transition-colors duration-300'
          >
            {t("viewProjects")}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg shadow-md transition-colors duration-300'
          >
            {t("contactMe")}
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        className='w-full max-w-6xl'
      >
        <h2 className='text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white'>
          Technical Skills
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg'
            >
              <div className='flex items-center mb-4'>
                {category.icon}
                <h3 className='text-xl font-semibold ml-3 text-gray-900 dark:text-white'>
                  {category.label}
                </h3>
              </div>
              <ul className='space-y-2'>
                {category.skills.map((skill, skillIndex) => (
                  <li
                    key={skillIndex}
                    className='flex items-center text-gray-700 dark:text-gray-300'
                  >
                    <span className='mr-2'>•</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className='mt-20 text-center'
      >
        <p className='text-lg text-gray-600 dark:text-gray-400'>
          {t("location")}
        </p>
        <p className='mt-4 text-gray-500 dark:text-gray-500'>
          {theme === "dark" ? "Dark mode active" : "Light mode active"}
        </p>
      </motion.div>
    </div>
  );
}
