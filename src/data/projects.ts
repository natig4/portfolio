import type { TechId } from "@/lib/tech";

export type ProjectStatus = "live" | "in-progress" | "internal" | "private";
export type ProjectKind =
  "website" | "web-app" | "saas" | "internal-tool" | "desktop";

type ProjectData = {
  slug: string;
  featured: boolean;
  year: number;
  /** Still being worked on — shown as "<year> – present". */
  ongoing?: boolean;
  status: ProjectStatus;
  kind: ProjectKind;
  /** Public URL. Omitted for internal/private work. */
  url?: string;
  stack: readonly TechId[];
  /** Screenshots can never be shown (client confidentiality) — renders a confidential cover. */
  confidential?: boolean;
  /** A headline outcome shown on the card, e.g. "$1M+". Its label lives in `projects.items.<slug>.outcome`. */
  outcome?: string;
};

/**
 * Display order is array order. Prose (title, summary, case study) lives in
 * messages under `projects.items.<slug>`; screenshots in `project-images.ts`.
 */
export const projects = [
  {
    slug: "mirk",
    featured: true,
    year: 2026,
    status: "live",
    kind: "website",
    url: "https://mirk.co.il",
    outcome: "#1",
    stack: [
      "nextjs",
      "typescript",
      "tailwind",
      "sanity",
      "prisma",
      "postgresql",
      "supabase",
      "sendgrid",
      "framer",
    ],
  },
  {
    slug: "digitengo",
    featured: true,
    year: 2025,
    ongoing: true,
    status: "live",
    kind: "saas",
    url: "https://digitengo.com",
    stack: [
      "vue",
      "pinia",
      "typescript",
      "nodejs",
      "express",
      "mongodb",
      "redis",
      "rabbitmq",
      "aws",
      "kubernetes",
      "lambda",
      "python",
      "openai",
      "gemini",
      "meta",
      "gitlab",
    ],
  },
  {
    slug: "my-north-food",
    featured: false,
    year: 2026,
    ongoing: true,
    status: "in-progress",
    kind: "web-app",
    url: "https://mynorthfood.com",
    stack: [
      "react",
      "vite",
      "typescript",
      "express",
      "drizzle",
      "tanstack",
      "radix",
      "tailwind",
      "sendgrid",
    ],
  },
  {
    slug: "galil-dashboard",
    featured: false,
    year: 2026,
    status: "internal",
    kind: "internal-tool",
    stack: [
      "nextjs",
      "typescript",
      "tailwind",
      "shadcn",
      "prisma",
      "postgresql",
      "supabase",
      "sheetjs",
      "vercel",
    ],
  },
  {
    slug: "tor-group",
    featured: false,
    year: 2025,
    status: "live",
    kind: "website",
    url: "https://thetorgroup.com",
    stack: ["nextjs", "typescript", "framer", "nextintl"],
  },
  {
    slug: "reports-manager",
    featured: false,
    year: 2024,
    status: "private",
    kind: "desktop",
    confidential: true,
    outcome: "$1M+",
    stack: ["csharp", "dotnet", "wpf", "epplus"],
  },
] as const satisfies readonly ProjectData[];

export type Project = (typeof projects)[number];
export type ProjectSlug = Project["slug"];

export function isProjectSlug(value: string): value is ProjectSlug {
  return projects.some((p) => p.slug === value);
}

export function getProject(slug: ProjectSlug): Project {
  return projects.find((p) => p.slug === slug)!;
}

export function getNextProject(slug: ProjectSlug): Project {
  const index = projects.findIndex((p) => p.slug === slug);
  return projects[(index + 1) % projects.length];
}
