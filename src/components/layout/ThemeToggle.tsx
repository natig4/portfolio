"use client";

import { LuMoon, LuSun } from "react-icons/lu";

function toggleTheme() {
  const html = document.documentElement;
  const isDark = !html.classList.contains("dark");

  html.classList.add("theme-switching");
  html.classList.toggle("dark", isDark);
  html.style.colorScheme = isDark ? "dark" : "light";
  try {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch {}
  requestAnimationFrame(() => html.classList.remove("theme-switching"));
}

export default function ThemeToggle({ label }: { label: string }) {
  return (
    <button
      type='button'
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className='inline-flex size-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground'
    >
      <LuMoon className='size-[18px] dark:hidden' aria-hidden='true' />
      <LuSun className='hidden size-[18px] dark:block' aria-hidden='true' />
    </button>
  );
}
