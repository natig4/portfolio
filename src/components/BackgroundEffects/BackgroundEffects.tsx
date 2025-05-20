"use client";

import { motion } from "framer-motion";

export default function BackgroundEffects() {
  return (
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
  );
}
