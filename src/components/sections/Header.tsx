"use client";

import { motion } from "framer-motion";
import CTASection from "../CTASection/CTASection";

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

      <CTASection
        title=''
        linkedInLabel={viewProjectsLabel}
        contactLabel={contactMeLabel}
        primaryLink='/projects'
        secondaryLink='/contact'
        showBackground={false}
      />
    </motion.div>
  );
}
