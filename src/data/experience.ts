import type { TechId } from "@/lib/tech";

type ExperienceData = {
  id: string;
  start: number;
  /** Omitted for the current role. */
  end?: number;
  stack?: readonly TechId[];
};

/** Newest first. Company, role and highlights live in messages under `about.experience.items.<id>`. */
export const experience = [
  {
    id: "ngsw",
    start: 2024,
    stack: ["nextjs", "react", "vue", "nodejs", "aws", "dotnet"],
  },
  {
    id: "outbrain",
    start: 2022,
    end: 2024,
    stack: ["angular", "react", "rxjs", "nodejs", "nestjs", "scala"],
  },
  { id: "nova", start: 2018, end: 2021 },
  { id: "mythings", start: 2016, end: 2018 },
  { id: "bezeq", start: 2010, end: 2015 },
] as const satisfies readonly ExperienceData[];

export type ExperienceId = (typeof experience)[number]["id"];
