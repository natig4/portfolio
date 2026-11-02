import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import Image from "next/image";
import { getProjectShots, getShowcaseProjects } from "@/data/project-images";
import { BrowserFrame, PhoneFrame } from "@/components/ui/DeviceFrame";

/** Corners and edges where a chip doesn't cover the phone or the front site's content. */
const chipPositions = [
  "start-[-3%] top-[3%]",
  "end-[-5%] top-[22%]",
  "start-[6%] bottom-[-3%]",
];

/**
 * Two recent client sites as overlapping browser windows, the lead project on a
 * phone, and a few headline results floating around them. Decorative as a
 * whole: the results are stated in full elsewhere on the page.
 */
export default function HeroShots({
  label,
  chips = [],
}: {
  label: string;
  chips?: { key: string; value: string; label: string; icon?: IconType }[];
}) {
  const [front, back] = getShowcaseProjects(2)
    .map((p) => ({ project: p, shots: getProjectShots(p.slug) }))
    .filter((entry) => entry.shots);
  if (!front?.shots) return null;

  return (
    <>
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
      {chips.map(({ key, value, label: chipLabel, icon: Icon }, index) => (
        <div
          key={key}
          className={`float absolute z-10 hidden rounded-2xl border border-border bg-surface/95 px-4 py-3 shadow-[0_20px_40px_-20px_rgb(0_0_0/0.6)] sm:block ${chipPositions[index % chipPositions.length]}`}
          style={{ "--i": index } as CSSProperties}
        >
          <span className='flex items-center gap-2 text-2xl leading-none font-bold text-growth'>
            {Icon && (
              <Icon className='size-5 shrink-0 text-accent' aria-hidden='true' />
            )}
            <bdi dir='ltr'>{value}</bdi>
          </span>
          <span className='mt-1 block text-xs font-medium text-muted-foreground'>
            {chipLabel}
          </span>
        </div>
      ))}
    </div>
    {/* Phones: the same results as a row under the screenshots instead of floating over them. */}
    <ul className='mx-auto mt-6 grid max-w-xl grid-cols-3 gap-2 sm:hidden' aria-hidden='true'>
      {chips.map(({ key, value, label: chipLabel }) => (
        <li
          key={key}
          className='rounded-2xl border border-border bg-surface/95 px-3 py-2.5 text-center'
        >
          <span className='block text-xl leading-none font-bold text-growth'>
            <bdi dir='ltr'>{value}</bdi>
          </span>
          <span className='mt-1 block text-[11px] font-medium text-muted-foreground'>
            {chipLabel}
          </span>
        </li>
      ))}
    </ul>
    </>
  );
}
