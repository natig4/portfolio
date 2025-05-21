"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

export default function BackgroundEffects() {
  const prefersReducedMotion = useReducedMotion();

  const animationProps = prefersReducedMotion
    ? {}
    : {
        animate: {
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
        },
        transition: {
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",

          times: [0, 0.5, 1],
        },
      };

  const animation2Props = prefersReducedMotion
    ? {}
    : {
        animate: {
          y: [0, 20, 0],
          opacity: [0.3, 0.5, 0.3],
        },
        transition: {
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,

          times: [0, 0.5, 1],
        },
      };

  return (
    <div className='absolute inset-0 pointer-events-none'>
      <motion.div
        className='absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl'
        {...animationProps}
      />
      <motion.div
        className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl'
        {...animation2Props}
      />
    </div>
  );
}
