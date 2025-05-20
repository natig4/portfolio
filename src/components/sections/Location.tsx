"use client";

import { motion } from "framer-motion";
import LocationButton from "@/components/LocationButton/LocationButton";

export default function Location() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.4 }}
      className='mt-20 text-center relative z-10'
    >
      <LocationButton />
    </motion.div>
  );
}
