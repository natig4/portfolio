"use client";

import { useLayoutEffect } from "react";

/**
 * Switching locale re-renders <html> (it lives in the [locale] layout), which drops the
 * class ThemeScript set on first load. Re-apply the stored theme before paint.
 */
export default function ThemeSync({ locale }: { locale: string }) {
  useLayoutEffect(() => {
    let isDark = true;
    try {
      isDark = localStorage.getItem("theme") !== "light";
    } catch {}
    const html = document.documentElement;
    html.classList.toggle("dark", isDark);
    html.style.colorScheme = isDark ? "dark" : "light";
  }, [locale]);

  return null;
}
