"use client";

import { useTheme } from "./ThemeProvider";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className='relative w-16 h-8 bg-gradient-to-r from-slate-400 to-slate-500 dark:from-slate-700 dark:to-slate-800 rounded-full p-1 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 dark:hover:shadow-purple-500/25 border border-slate-300 dark:border-slate-600'
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Glow effect */}
      <div className='absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 dark:from-purple-500 dark:to-pink-500 opacity-0 hover:opacity-20 transition-opacity duration-300' />

      {/* Toggle switch */}
      <motion.div
        className='relative w-6 h-6 bg-white dark:bg-slate-900 rounded-full shadow-lg flex items-center justify-center'
        animate={{
          x: isDark ? 24 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        {/* Icon container with rotation */}
        <motion.div
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className='w-4 h-4 flex items-center justify-center'
        >
          {isDark ? (
            <svg
              className='w-3 h-3 text-purple-500'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z' />
            </svg>
          ) : (
            <svg
              className='w-3 h-3 text-yellow-500'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z'
                clipRule='evenodd'
              />
            </svg>
          )}
        </motion.div>
      </motion.div>

      {/* Background track indicators */}
      <div className='absolute inset-1 flex items-center justify-between px-1'>
        <div className='w-3 h-3 rounded-full bg-yellow-400/30 dark:bg-transparent transition-all duration-300' />
        <div className='w-3 h-3 rounded-full bg-transparent dark:bg-purple-400/30 transition-all duration-300' />
      </div>
    </button>
  );
}
