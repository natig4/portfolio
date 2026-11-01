import Image from "next/image";
import { getProjectShots } from "@/data/project-images";
import type { ProjectSlug } from "@/data/projects";
import { BrowserFrame } from "@/components/ui/DeviceFrame";
import ScreenshotPlaceholder from "@/components/ui/ScreenshotPlaceholder";

/** Desktop screenshot in browser chrome, or a placeholder until one is supplied. */
export default function ProjectCover({
  slug,
  title,
  url,
  placeholderLabel,
  sizes,
  alt = "",
  preload = false,
  zoomOnHover = false,
  className = "",
}: {
  slug: ProjectSlug;
  title: string;
  url?: string;
  placeholderLabel: string;
  sizes: string;
  alt?: string;
  preload?: boolean;
  zoomOnHover?: boolean;
  className?: string;
}) {
  const shots = getProjectShots(slug);

  return (
    <BrowserFrame url={url} className={className}>
      {shots ? (
        <div className='overflow-hidden'>
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
      ) : (
        <ScreenshotPlaceholder title={title} label={placeholderLabel} />
      )}
    </BrowserFrame>
  );
}
