import type { ProjectSlug } from "./projects";

/** Copy lives in messages under `home.services.items.<id>`. */
export const services = [
  { id: "websites", icon: "globe", examples: ["mirk", "tor-group"] },
  {
    id: "platforms",
    icon: "layers",
    examples: ["digitengo", "my-north-food"],
  },
  {
    id: "tools",
    icon: "dashboard",
    examples: ["galil-dashboard", "reports-manager"],
  },
] as const satisfies readonly {
  id: string;
  icon: "globe" | "layers" | "dashboard";
  examples: readonly ProjectSlug[];
}[];

/** Steps of the delivery process, in order. Copy lives in `home.process.steps.<id>`. */
export const processSteps = [
  "discover",
  "design",
  "build",
  "test",
  "launch",
] as const;
