import Image from "next/image";
import { getProjectShots, getShowcaseProjects } from "@/data/project-images";
import { BrowserFrame, PhoneFrame } from "@/components/ui/DeviceFrame";

/** Two recent client sites as overlapping browser windows, plus the lead project on a phone. */
export default function HeroShots({ label }: { label: string }) {
  const [front, back] = getShowcaseProjects(2)
    .map((p) => ({ project: p, shots: getProjectShots(p.slug) }))
    .filter((entry) => entry.shots);
  if (!front?.shots) return null;

  return (
    <div
      role='img'
      aria-label={label}
      className='relative mx-auto aspect-[5/4] w-full max-w-xl lg:max-w-none'
    >
      {back?.shots && (
        <BrowserFrame
          url={"url" in back.project ? back.project.url : undefined}
          className='absolute end-0 top-0 w-[82%] opacity-90'
        >
          <Image
            src={back.shots.desktop}
            alt=''
            sizes='(min-width: 1024px) 460px, 80vw'
            quality={85}
            placeholder='blur'
            className='aspect-[16/10] w-full object-cover object-top'
          />
        </BrowserFrame>
      )}
      <BrowserFrame
        url={"url" in front.project ? front.project.url : undefined}
        className='absolute start-0 bottom-[6%] w-[82%]'
      >
        <Image
          src={front.shots.desktop}
          alt=''
          sizes='(min-width: 1024px) 460px, 80vw'
          quality={85}
          placeholder='blur'
          preload
          className='aspect-[16/10] w-full object-cover object-top'
        />
      </BrowserFrame>
      {front.shots.mobile && (
        <PhoneFrame className='absolute end-[4%] bottom-0 w-[24%]'>
          <Image
            src={front.shots.mobile}
            alt=''
            sizes='140px'
            quality={85}
            placeholder='blur'
            className='aspect-[9/17] w-full object-cover object-top'
          />
        </PhoneFrame>
      )}
    </div>
  );
}
