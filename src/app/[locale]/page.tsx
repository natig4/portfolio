"use client";

import { useTranslations } from "next-intl";
import { FaLaptopCode, FaServer, FaDatabase, FaDocker } from "react-icons/fa";
import { motion } from "framer-motion";
import SkillCard from "@/components/SkillCard/SkillCard";
import { useDirection } from "@/hooks/useDirection";
import { Link } from "@/i18n/routing";

export default function Home() {
  const t = useTranslations("home");
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

  const skillCategories = [
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

  return (
    <div className='home-container w-full flex flex-col items-center px-4 py-16 relative overflow-hidden'>
      {/* Background elements */}
      <div className='absolute inset-0 pointer-events-none'>
        <motion.div
          className='absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl'
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl'
          animate={{
            y: [0, 20, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Header section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className='text-center max-w-4xl mb-16 relative z-10'
      >
        <motion.h1
          className='text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'
          style={{ backgroundSize: "200% 200%" }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 6,
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
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          className='mt-8 flex flex-wrap justify-center gap-4'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            <Link
              href={{ pathname: "/projects" }}
              className='px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl shadow-lg font-semibold relative overflow-hidden group cursor-pointer inline-block'
            >
              <span className='relative z-10'>{t("viewProjects")}</span>
              <div className='absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            <Link
              href={{ pathname: "/contact" }}
              className='px-8 py-4 bg-surface border-2 border-primary/30 hover:border-primary/60 text-text rounded-xl shadow-lg font-semibold relative overflow-hidden group backdrop-blur-sm cursor-pointer inline-block'
            >
              <span className='relative z-10'>{t("contactMe")}</span>
              <div className='absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Skills section */}
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

      {/* Location section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className='mt-20 text-center relative z-10'
      >
        <motion.div
          className='p-6 rounded-2xl bg-surface/50 backdrop-blur-lg border border-border/30 cursor-pointer'
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ duration: 0.2 }}
          onClick={() =>
            window.open(
              "https://www.google.com/maps/place/YASUR/data=!4m2!3m1!1s0x151dca54b64c7603:0x1acb071f63e0bc23?sa=X&ved=1t:242&ictx=111",
              "_blank"
            )
          }
        >
          <p
            className='text-lg text-text-secondary mb-4 flex items-center justify-center gap-3'
            dir={direction}
          >
            <span className='flex-shrink-0'>📍</span>
            <span>{t("location")}</span>
          </p>
        </motion.div>
      </motion.div>

      <div className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50' />
    </div>
  );
}
