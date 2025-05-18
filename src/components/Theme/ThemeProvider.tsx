"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Prevent flash by reading theme synchronously on mount
    const initializeTheme = () => {
      // Use requestAnimationFrame to defer DOM operations
      requestAnimationFrame(() => {
        const savedTheme = localStorage.getItem("theme") as Theme | null;
        const systemPrefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;

        let initialTheme: Theme = "light";

        if (savedTheme) {
          initialTheme = savedTheme;
        } else if (systemPrefersDark) {
          initialTheme = "dark";
        }

        // Batch DOM operations to prevent forced reflow
        const html = document.documentElement;

        // Use CSS custom property instead of class toggle for smoother transition
        html.style.setProperty("--theme-transition", "none");

        if (initialTheme === "dark") {
          html.classList.add("dark");
        } else {
          html.classList.remove("dark");
        }

        setTheme(initialTheme);
        setIsInitialized(true);

        // Re-enable transitions after a frame
        requestAnimationFrame(() => {
          html.style.removeProperty("--theme-transition");
        });
      });
    };

    initializeTheme();
  }, []);

  const toggleTheme = () => {
    // Use requestAnimationFrame to optimize the transition
    requestAnimationFrame(() => {
      const newTheme = theme === "light" ? "dark" : "light";
      const html = document.documentElement;

      // Batch all DOM operations
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);

      // Use transform instead of class toggle for better performance
      if (newTheme === "dark") {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
    });
  };

  // Don't render children until theme is initialized to prevent flash
  if (!isInitialized) {
    return (
      <div className='fixed inset-0 bg-white dark:bg-slate-900 flex items-center justify-center'>
        <div className='w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
