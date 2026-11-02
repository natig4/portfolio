import type { IconType } from "react-icons";
import { FaAws, FaWindows } from "react-icons/fa";
import { TbBrandCSharp, TbFileSpreadsheet, TbWorld } from "react-icons/tb";
import {
  SiAngular,
  SiDocker,
  SiDotnet,
  SiDrizzle,
  SiExpress,
  SiFramer,
  SiGithubactions,
  SiGoogleads,
  SiGoogleanalytics,
  SiGooglesearchconsole,
  SiGoogletagmanager,
  SiGitlab,
  SiGooglegemini,
  SiGraphql,
  SiJest,
  SiKubernetes,
  SiMeta,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiOpenai,
  SiPinia,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiRabbitmq,
  SiRadixui,
  SiReact,
  SiReactivex,
  SiReactquery,
  SiRedis,
  SiSanity,
  SiScala,
  SiSendgrid,
  SiShadcnui,
  SiSocketdotio,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVuedotjs,
} from "react-icons/si";

export type TechCategory =
  | "marketing"
  | "frontend"
  | "backend"
  | "data"
  | "infra"
  | "ai"
  | "desktop";

type TechInfo = { label: string; icon?: IconType; category: TechCategory };

/** Every technology named on the site. Brand names are not translated. */
export const TECH = {
  nextjs: { label: "Next.js", icon: SiNextdotjs, category: "frontend" },
  react: { label: "React", icon: SiReact, category: "frontend" },
  vue: { label: "Vue 3", icon: SiVuedotjs, category: "frontend" },
  pinia: { label: "Pinia", icon: SiPinia, category: "frontend" },
  angular: { label: "Angular", icon: SiAngular, category: "frontend" },
  rxjs: { label: "RxJS", icon: SiReactivex, category: "frontend" },
  typescript: { label: "TypeScript", icon: SiTypescript, category: "frontend" },
  tailwind: {
    label: "Tailwind CSS",
    icon: SiTailwindcss,
    category: "frontend",
  },
  vite: { label: "Vite", icon: SiVite, category: "frontend" },
  framer: { label: "Framer Motion", icon: SiFramer, category: "frontend" },
  radix: { label: "Radix UI", icon: SiRadixui, category: "frontend" },
  shadcn: { label: "shadcn/ui", icon: SiShadcnui, category: "frontend" },
  tanstack: {
    label: "TanStack Query",
    icon: SiReactquery,
    category: "frontend",
  },
  nextintl: { label: "next-intl", icon: TbWorld, category: "frontend" },
  nodejs: { label: "Node.js", icon: SiNodedotjs, category: "backend" },
  express: { label: "Express", icon: SiExpress, category: "backend" },
  nestjs: { label: "NestJS", icon: SiNestjs, category: "backend" },
  scala: { label: "Scala", icon: SiScala, category: "backend" },
  python: { label: "Python", icon: SiPython, category: "backend" },
  socketio: { label: "Socket.io", icon: SiSocketdotio, category: "backend" },
  rabbitmq: { label: "RabbitMQ", icon: SiRabbitmq, category: "backend" },
  graphql: { label: "GraphQL", icon: SiGraphql, category: "backend" },
  sendgrid: { label: "SendGrid", icon: SiSendgrid, category: "backend" },
  dotnet: { label: ".NET", icon: SiDotnet, category: "desktop" },
  csharp: { label: "C#", icon: TbBrandCSharp, category: "desktop" },
  wpf: { label: "WPF", icon: FaWindows, category: "desktop" },
  epplus: { label: "EPPlus", icon: TbFileSpreadsheet, category: "desktop" },
  postgresql: { label: "PostgreSQL", icon: SiPostgresql, category: "data" },
  mongodb: { label: "MongoDB", icon: SiMongodb, category: "data" },
  mysql: { label: "MySQL", icon: SiMysql, category: "data" },
  redis: { label: "Redis", icon: SiRedis, category: "data" },
  prisma: { label: "Prisma", icon: SiPrisma, category: "data" },
  drizzle: { label: "Drizzle ORM", icon: SiDrizzle, category: "data" },
  supabase: { label: "Supabase", icon: SiSupabase, category: "data" },
  sanity: { label: "Sanity CMS", icon: SiSanity, category: "data" },
  sheetjs: { label: "SheetJS", icon: TbFileSpreadsheet, category: "data" },
  aws: { label: "AWS", icon: FaAws, category: "infra" },
  lambda: { label: "AWS Lambda", icon: FaAws, category: "infra" },
  kubernetes: { label: "Kubernetes", icon: SiKubernetes, category: "infra" },
  docker: { label: "Docker", icon: SiDocker, category: "infra" },
  nginx: { label: "nginx", icon: SiNginx, category: "infra" },
  gitlab: { label: "GitLab CI", icon: SiGitlab, category: "infra" },
  githubactions: {
    label: "GitHub Actions",
    icon: SiGithubactions,
    category: "infra",
  },
  vercel: { label: "Vercel", icon: SiVercel, category: "infra" },
  jest: { label: "Jest", icon: SiJest, category: "infra" },
  openai: { label: "OpenAI", icon: SiOpenai, category: "ai" },
  gemini: { label: "Gemini", icon: SiGooglegemini, category: "ai" },
  meta: { label: "Meta Graph API", icon: SiMeta, category: "ai" },
  googleads: { label: "Google Ads", icon: SiGoogleads, category: "marketing" },
  metaads: { label: "Meta Ads", icon: SiMeta, category: "marketing" },
  ga4: { label: "Google Analytics 4", icon: SiGoogleanalytics, category: "marketing" },
  searchconsole: {
    label: "Search Console",
    icon: SiGooglesearchconsole,
    category: "marketing",
  },
  tagmanager: {
    label: "Tag Manager",
    icon: SiGoogletagmanager,
    category: "marketing",
  },
  seo: { label: "SEO", icon: TbWorld, category: "marketing" },
} as const satisfies Record<string, TechInfo>;

export type TechId = keyof typeof TECH;

export function getTech(id: TechId): TechInfo {
  return TECH[id];
}
