"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize theme only once on mount
  useEffect(() => {
    // Get theme synchronously to avoid flash
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // Determine initial theme
    const initialTheme: Theme =
      savedTheme || (systemPrefersDark ? "dark" : "light");

    // Apply theme to document
    const html = document.documentElement;

    // Disable transitions temporarily
    html.style.setProperty("--theme-transition", "none");

    // Set theme class
    if (initialTheme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    // Update state
    setTheme(initialTheme);
    setIsInitialized(true);

    // Re-enable transitions after a short delay
    setTimeout(() => {
      html.style.removeProperty("--theme-transition");
    }, 0);
  }, []);

  // Memoize the toggle function to prevent unnecessary rerenders
  const toggleTheme = useMemo(() => {
    return () => {
      setTheme((prevTheme) => {
        const newTheme = prevTheme === "light" ? "dark" : "light";

        // Update localStorage
        localStorage.setItem("theme", newTheme);

        // Update DOM - do this synchronously
        const html = document.documentElement;
        if (newTheme === "dark") {
          html.classList.add("dark");
        } else {
          html.classList.remove("dark");
        }

        return newTheme;
      });
    };
  }, []);

  // Don't render children until theme is initialized
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
