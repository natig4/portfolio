"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

/**
 * Fades content up once when it scrolls into view. Server HTML still contains the
 * content (opacity is restored by a <noscript> rule in BaseLayout), and
 * MotionConfig reducedMotion="user" turns the movement off when requested.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
