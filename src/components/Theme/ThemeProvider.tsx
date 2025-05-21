"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useRef,
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
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const initialTheme: Theme =
      savedTheme || (systemPrefersDark ? "dark" : "light");

    const html = document.documentElement;

    html.style.setProperty("--theme-transition", "none");

    if (initialTheme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    if (isMounted.current) {
      setTheme(initialTheme);
      setIsInitialized(true);
    }

    setTimeout(() => {
      if (document.documentElement) {
        document.documentElement.style.removeProperty("--theme-transition");
      }
    }, 0);
  }, []);

  const toggleTheme = useMemo(() => {
    return () => {
      if (!isMounted.current) return;

      setTheme((prevTheme) => {
        const newTheme = prevTheme === "light" ? "dark" : "light";

        localStorage.setItem("theme", newTheme);

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
