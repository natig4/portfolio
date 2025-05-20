"use client";

import { useTheme } from "./ThemeProvider";
import { motion } from "framer-motion";
import { useDirection } from "@/hooks/useDirection";
import { useMemo } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { isRTL } = useDirection();
  const isDark = theme === "dark";

  const animations = useMemo(
    () => ({
      togglePosition: isDark ? (isRTL ? -20 : 20) : 0,
      containerStyle: {
        background: isDark
          ? "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)"
          : "linear-gradient(135deg, #ecfdf5 0%, #a7f3d0 50%, #6ee7b7 100%)",
      },
      switchStyle: {
        background: isDark
          ? "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)"
          : "linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)",
        boxShadow: isDark
          ? "0 2px 8px rgba(139, 92, 246, 0.3)"
          : "0 2px 8px rgba(52, 211, 153, 0.2)",
      },
    }),
    [isDark, isRTL]
  );

  return (
    <motion.button
      onClick={toggleTheme}
      className='relative w-14 h-8 rounded-full p-0.5 transition-colors duration-200 border border-emerald-300/30 dark:border-violet-400/30 cursor-pointer'
      style={animations.containerStyle}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        className='relative w-7 h-7 rounded-full flex items-center justify-center overflow-hidden cursor-pointer'
        style={animations.switchStyle}
        animate={{ x: animations.togglePosition }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div
          className='relative w-4 h-4 flex items-center justify-center cursor-pointer transition-transform duration-300 ease-in-out'
          style={{
            transform: isDark
              ? "rotate(0deg) scale(1)"
              : "rotate(180deg) scale(1)",
          }}
        >
          {isDark ? (
            <svg
              className='w-4 h-4 cursor-pointer transition-opacity duration-200'
              fill='#a855f7'
              viewBox='0 0 24 24'
            >
              <path d='M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z' />
            </svg>
          ) : (
            <svg
              className='w-4 h-4 cursor-pointer transition-opacity duration-200'
              fill='#f59e0b'
              viewBox='0 0 24 24'
            >
              <circle cx='12' cy='12' r='5' />
              <path
                strokeWidth='2'
                strokeLinecap='round'
                d='M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42'
              />
            </svg>
          )}
        </div>
      </motion.div>
    </motion.button>
  );
}
