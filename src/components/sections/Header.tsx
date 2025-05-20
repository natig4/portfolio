"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";

interface HeaderSectionProps {
  title: string;
  subtitle: string;
  viewProjectsLabel: string;
  contactMeLabel: string;
}

export default function HeaderSection({
  title,
  subtitle,
  viewProjectsLabel,
  contactMeLabel,
}: HeaderSectionProps) {
  return (
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
        {title}
      </motion.h1>

      <motion.p
        className='text-xl md:text-2xl text-text-secondary mb-8'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {subtitle}
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
            <span className='relative z-10'>{viewProjectsLabel}</span>
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
            <span className='relative z-10'>{contactMeLabel}</span>
            <div className='absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
