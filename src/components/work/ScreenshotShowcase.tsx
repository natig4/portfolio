import Image, { type StaticImageData } from "next/image";
import { BrowserFrame, PhoneFrame } from "@/components/ui/DeviceFrame";

const FRAME_HEIGHT = 560;

/**
 * Full-length desktop capture (pans on hover), beside the mobile capture when there is one.
 * The pan is a transform, so it is skipped entirely under reduced motion.
 */
export default function ScreenshotShowcase({
  full,
  mobile,
  url,
  labels,
}: {
  full: StaticImageData;
  mobile?: StaticImageData;
  url?: string;
  labels: {
    fullAlt: string;
    mobileAlt: string;
    fullCaption: string;
    mobileCaption: string;
  };
}) {
  return (
    <div
      className={`grid items-start gap-8 ${mobile ? "md:grid-cols-[minmax(0,1fr)_260px]" : ""}`}
    >
      <figure>
        <BrowserFrame url={url}>
          <div
            className='group relative overflow-clip'
            style={{ height: FRAME_HEIGHT }}
          >
            <Image
              src={full}
              alt={labels.fullAlt}
              sizes={
                mobile
                  ? "(min-width: 1152px) 800px, 100vw"
                  : "(min-width: 1152px) 1104px, 100vw"
              }
              quality={85}
              placeholder='blur'
              className='absolute inset-x-0 top-0 h-auto w-full motion-safe:transition-transform motion-safe:duration-[8000ms] motion-safe:ease-linear motion-safe:group-hover:translate-y-[calc(-100%+560px)]'
            />
          </div>
        </BrowserFrame>
        <figcaption className='mt-3 text-sm text-muted-foreground'>
          {labels.fullCaption}
        </figcaption>
      </figure>
      {mobile && (
        <figure className='mx-auto w-full max-w-[260px]'>
          <PhoneFrame>
            <Image
              src={mobile}
              alt={labels.mobileAlt}
              sizes='260px'
              quality={85}
              placeholder='blur'
              className='w-full'
            />
          </PhoneFrame>
          <figcaption className='mt-3 text-center text-sm text-muted-foreground'>
            {labels.mobileCaption}
          </figcaption>
        </figure>
      )}
    </div>
  );
}
