"use client";

import { useTheme } from "./ThemeProvider";
import { motion } from "framer-motion";
import { useDirection } from "@/hooks/useDirection";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { isRTL } = useDirection();
  const isDark = theme === "dark";

  // Optimized spring configuration for better performance
  const springConfig = {
    type: "spring",
    stiffness: 700,
    damping: 30,
    mass: 1,
  };

  // Calculate toggle position based on direction
  const togglePosition = isDark ? (isRTL ? -20 : 20) : 0;

  return (
    <motion.button
      onClick={toggleTheme}
      className='relative w-14 h-8 rounded-full p-0.5 transition-colors duration-200 border border-emerald-300/30 dark:border-violet-400/30 cursor-pointer'
      style={{
        background: isDark
          ? "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)"
          : "linear-gradient(135deg, #ecfdf5 0%, #a7f3d0 50%, #6ee7b7 100%)",
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Glow effect container */}
      <motion.div
        className='absolute inset-0 rounded-full'
        style={{
          background: isDark
            ? "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(168, 85, 247, 0.2))"
            : "linear-gradient(135deg, rgba(52, 211, 153, 0.2), rgba(34, 197, 94, 0.2))",
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />

      {/* Toggle switch with RTL/LTR support */}
      <motion.div
        className='relative w-7 h-7 rounded-full flex items-center justify-center overflow-hidden cursor-pointer'
        style={{
          background: isDark
            ? "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)"
            : "linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)",
          boxShadow: isDark
            ? "0 2px 8px rgba(139, 92, 246, 0.3)"
            : "0 2px 8px rgba(52, 211, 153, 0.2)",
        }}
        animate={{ x: togglePosition }}
        transition={springConfig}
      >
        {/* Icon with simplified animation */}
        <motion.div
          className='relative w-4 h-4 flex items-center justify-center cursor-pointer'
          animate={{ rotate: isDark ? 0 : 180 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {isDark ? (
            <motion.svg
              className='w-4 h-4 cursor-pointer'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              fill='url(#moonGradient)'
              viewBox='0 0 24 24'
            >
              <defs>
                <linearGradient
                  id='moonGradient'
                  x1='0%'
                  y1='0%'
                  x2='100%'
                  y2='100%'
                >
                  <stop offset='0%' stopColor='#a855f7' />
                  <stop offset='100%' stopColor='#ec4899' />
                </linearGradient>
              </defs>
              <path d='M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z' />
            </motion.svg>
          ) : (
            <motion.svg
              className='w-4 h-4 cursor-pointer'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              fill='url(#sunGradient)'
              viewBox='0 0 24 24'
            >
              <defs>
                <linearGradient
                  id='sunGradient'
                  x1='0%'
                  y1='0%'
                  x2='100%'
                  y2='100%'
                >
                  <stop offset='0%' stopColor='#fbbf24' />
                  <stop offset='100%' stopColor='#f59e0b' />
                </linearGradient>
              </defs>
              <circle cx='12' cy='12' r='5' />
              <line
                x1='12'
                y1='1'
                x2='12'
                y2='3'
                stroke='url(#sunGradient)'
                strokeWidth='2'
                strokeLinecap='round'
              />
              <line
                x1='12'
                y1='21'
                x2='12'
                y2='23'
                stroke='url(#sunGradient)'
                strokeWidth='2'
                strokeLinecap='round'
              />
              <line
                x1='4.22'
                y1='4.22'
                x2='5.64'
                y2='5.64'
                stroke='url(#sunGradient)'
                strokeWidth='2'
                strokeLinecap='round'
              />
              <line
                x1='18.36'
                y1='18.36'
                x2='19.78'
                y2='19.78'
                stroke='url(#sunGradient)'
                strokeWidth='2'
                strokeLinecap='round'
              />
              <line
                x1='1'
                y1='12'
                x2='3'
                y2='12'
                stroke='url(#sunGradient)'
                strokeWidth='2'
                strokeLinecap='round'
              />
              <line
                x1='21'
                y1='12'
                x2='23'
                y2='12'
                stroke='url(#sunGradient)'
                strokeWidth='2'
                strokeLinecap='round'
              />
              <line
                x1='4.22'
                y1='19.78'
                x2='5.64'
                y2='18.36'
                stroke='url(#sunGradient)'
                strokeWidth='2'
                strokeLinecap='round'
              />
              <line
                x1='18.36'
                y1='5.64'
                x2='19.78'
                y2='4.22'
                stroke='url(#sunGradient)'
                strokeWidth='2'
                strokeLinecap='round'
              />
            </motion.svg>
          )}
        </motion.div>
      </motion.div>
    </motion.button>
  );
}
