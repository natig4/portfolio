import type { MarketingSlug } from "./marketing";
import type { ProjectSlug } from "./projects";

/** Copy lives in messages under `home.services.items.<id>`. Examples link to projects and marketing cases. */
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
  { id: "growth", icon: "search", examples: [], cases: ["mirk-seo"] },
] as const satisfies readonly {
  id: string;
  icon: "globe" | "layers" | "dashboard" | "search";
  examples: readonly ProjectSlug[];
  cases?: readonly MarketingSlug[];
}[];

/** Steps of the delivery process, in order. Copy lives in `home.process.steps.<id>`. */
export const processSteps = [
  "discover",
  "design",
  "build",
  "test",
  "launch",
] as const;
