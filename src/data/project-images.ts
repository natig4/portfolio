import type { StaticImageData } from "next/image";
import type { ProjectSlug } from "./projects";

import mirkDesktop from "@/assets/projects/mirk/desktop.jpg";
import mirkMobile from "@/assets/projects/mirk/mobile.jpg";
import mirkFull from "@/assets/projects/mirk/full.jpg";
import mnfDesktop from "@/assets/projects/my-north-food/desktop.jpg";
import mnfMobile from "@/assets/projects/my-north-food/mobile.jpg";
import mnfFull from "@/assets/projects/my-north-food/full.jpg";
import torDesktop from "@/assets/projects/tor-group/desktop.jpg";
import torMobile from "@/assets/projects/tor-group/mobile.jpg";
import torFull from "@/assets/projects/tor-group/full.jpg";

export type ProjectShots = {
  /** 1440×900 viewport — cards, hero, OG image. */
  desktop: StaticImageData;
  /** 390×844 viewport. */
  mobile?: StaticImageData;
  /** Full-length page capture for the case-study gallery. */
  full?: StaticImageData;
};

/**
 * Screenshots live in src/assets/projects/<slug>/ (live sites are captured with
 * `npm run screenshots`). Projects without an entry show a placeholder.
 * To add one: drop desktop.jpg (+ optional mobile.jpg/full.jpg) in the folder and import it here.
 */
export const projectImages: Partial<Record<ProjectSlug, ProjectShots>> = {
  mirk: { desktop: mirkDesktop, mobile: mirkMobile, full: mirkFull },
  "my-north-food": { desktop: mnfDesktop, mobile: mnfMobile, full: mnfFull },
  "tor-group": { desktop: torDesktop, mobile: torMobile, full: torFull },
};

export function getProjectShots(slug: ProjectSlug): ProjectShots | undefined {
  return projectImages[slug];
}
