import type { ComponentProps } from "react";
import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["he", "en"],
  defaultLocale: "he",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/projects": "/projects",
    "/projects/[slug]": "/projects/[slug]",
    "/about": "/about",
    "/marketing": "/marketing",
    "/marketing/[slug]": "/marketing/[slug]",
    "/articles": "/articles",
    "/contact": "/contact",
    "/accessibility": "/accessibility",
    "/privacy": "/privacy",
    "/terms": "/terms",
  },
});

export type AppLocale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing);

export type Href = ComponentProps<typeof Link>["href"];
