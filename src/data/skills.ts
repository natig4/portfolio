import type { TechCategory, TechId } from "@/lib/tech";

/** Technologies shown on the About page, grouped by category. */
export const skills: Record<TechCategory, readonly TechId[]> = {
  frontend: [
    "nextjs",
    "react",
    "vue",
    "angular",
    "typescript",
    "tailwind",
    "rxjs",
  ],
  backend: [
    "nodejs",
    "express",
    "nestjs",
    "python",
    "scala",
    "rabbitmq",
    "graphql",
  ],
  data: ["postgresql", "mongodb", "redis", "prisma", "supabase", "sanity"],
  infra: ["aws", "kubernetes", "docker", "vercel", "githubactions", "gitlab"],
  ai: ["openai", "gemini", "meta"],
  desktop: ["dotnet", "csharp", "wpf"],
};
