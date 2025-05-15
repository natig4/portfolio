"use client";

import { useTheme } from "./ThemeProvider";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className='bg-gray-200 dark:bg-gray-700 rounded-full p-2 transition-colors duration-300 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500'
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
    >
      {theme === "dark" ? (
        <FaSun
          className='text-yellow-300 transition-transform duration-300 hover:rotate-45'
          size={18}
        />
      ) : (
        <FaMoon
          className='text-gray-700 transition-transform duration-300 hover:-rotate-12'
          size={18}
        />
      )}
    </button>
  );
}
