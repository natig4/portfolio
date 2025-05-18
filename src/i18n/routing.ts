import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";
import { Language } from "@/lib/model/language";

export const locales = Object.values(Language) as [string, ...string[]];
export const defaultLocale = Language.he;

const pathnames = {
  "/": "/",
  "/about": "/about",
  "/projects": "/projects",
  "/contact": "/contact",
  "/accessibility": "/accessibility",
  "/privacy": "/privacy",
  "/terms": "/terms",
} as const;

export const routing = defineRouting({
  locales,
  defaultLocale,
  pathnames,
});

export const pages = Object.keys(pathnames) as (keyof typeof pathnames)[];

export type Pathnames = keyof typeof pathnames;

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing);
