import Image from "next/image";
import { useTranslations } from "next-intl";
import { getProjectShots } from "@/data/project-images";
import { getProject, type ProjectSlug } from "@/data/projects";
import { BrowserFrame } from "@/components/ui/DeviceFrame";
import ConfidentialCover from "@/components/ui/ConfidentialCover";
import ScreenshotPlaceholder from "@/components/ui/ScreenshotPlaceholder";

/**
 * Desktop screenshot in browser chrome. Confidential projects get a dedicated
 * cover; anything else without screenshots shows a "coming soon" placeholder.
 */
export default function ProjectCover({
  slug,
  title,
  url,
  sizes,
  alt = "",
  preload = false,
  zoomOnHover = false,
  className = "",
}: {
  slug: ProjectSlug;
  title: string;
  url?: string;
  sizes: string;
  alt?: string;
  preload?: boolean;
  zoomOnHover?: boolean;
  className?: string;
}) {
  const t = useTranslations("projects.labels");
  const shots = getProjectShots(slug);
  const project = getProject(slug);

  return (
    <BrowserFrame url={url} className={className}>
      {shots ? (
        <div className='overflow-clip'>
          <Image
            src={shots.desktop}
            alt={alt}
            sizes={sizes}
            quality={85}
            placeholder='blur'
            preload={preload}
            className={`aspect-[16/10] w-full object-cover object-top ${
              zoomOnHover
                ? "transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
                : ""
            }`}
          />
        </div>
      ) : "confidential" in project && project.confidential ? (
        <ConfidentialCover
          title={t("confidential")}
          description={t("confidentialNote")}
        />
      ) : (
        <ScreenshotPlaceholder title={title} label={t("noScreenshots")} />
      )}
    </BrowserFrame>
  );
}
