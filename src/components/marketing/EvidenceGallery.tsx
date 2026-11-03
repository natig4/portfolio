import Image from "next/image";
import { useTranslations } from "next-intl";
import { LuMaximize2 } from "react-icons/lu";
import type { MarketingCaseData } from "@/data/marketing";

/** Redacted report screenshots. Each opens full size in a new tab. */
export default function EvidenceGallery({
  evidence,
}: {
  evidence: MarketingCaseData["evidence"];
}) {
  const t = useTranslations("marketing");

  return (
    <ul className='grid gap-6 md:grid-cols-2'>
      {evidence.map(({ id, image }, index) => (
        <li key={id} className={evidence.length === 1 || index === 0 ? "md:col-span-2" : ""}>
          <figure>
            <a
              href={image.src}
              target='_blank'
              rel='noopener'
              className='group relative block overflow-clip rounded-2xl border border-border bg-white shadow-[0_24px_48px_-28px_rgb(11_15_26/0.4)]'
            >
              <Image
                src={image}
                alt={t(`evidence.${id}.alt`)}
                sizes='(min-width: 1152px) 1104px, 100vw'
                quality={85}
                placeholder='blur'
                className='h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.015]'
              />
              <span className='absolute end-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink/80 px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100'>
                <LuMaximize2 className='size-3.5' aria-hidden='true' />
                {t("labels.openImage")}
              </span>
            </a>
            <figcaption className='mt-3 text-sm text-muted-foreground'>
              {t(`evidence.${id}.caption`)}
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
