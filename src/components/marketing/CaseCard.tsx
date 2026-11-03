import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { LuArrowRight } from "react-icons/lu";
import { Link } from "@/i18n/routing";
import {
  getHeadlineMetric,
  type MarketingCaseData,
} from "@/data/marketing";
import { getProjectShots } from "@/data/project-images";
import { formatMetricHeadline } from "@/lib/metrics";
import { marketingCaseHref } from "@/lib/routes";
import CountUp from "@/components/ui/CountUp";
import ChannelBadges from "./ChannelBadges";

/** Teaser for one marketing case: report screenshot, headline result, title. The whole card links to the case. */
export default function CaseCard({
  data,
  headingLevel: Heading = "h3",
}: {
  data: MarketingCaseData;
  headingLevel?: "h2" | "h3";
}) {
  const t = useTranslations("marketing");
  const format = useFormatter();
  const metric = getHeadlineMetric(data);
  const image =
    data.evidence[0]?.image ??
    ("relatedProject" in data
      ? getProjectShots(data.relatedProject)?.desktop
      : undefined);

  return (
    <article className='glow-card group relative flex h-full min-w-0 flex-col overflow-clip rounded-3xl border border-border bg-surface shadow-[0_1px_0_var(--border)] transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgb(11_15_26/0.35)]'>
      <div className='relative aspect-[16/9] w-full shrink-0 overflow-clip border-b border-border bg-white'>
        {image && (
          <Image
            src={image}
            alt=''
            fill
            sizes='(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw'
            className='object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]'
          />
        )}
        <div className='absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-surface to-transparent' />
        <ChannelBadges channels={data.channels} className='absolute start-4 top-4' />
      </div>

      <div className='relative -mt-10 flex flex-1 flex-col px-6 pb-6'>
        <p className='text-5xl font-bold tracking-tight text-foreground'>
          <CountUp text={formatMetricHeadline(format, metric)} />
        </p>
        <p className='mt-1 text-sm font-medium text-muted-foreground'>
          {t(`metrics.${metric.id}`)}
        </p>
        <Heading className='mt-5 text-lg leading-snug font-bold'>
          <Link
            href={marketingCaseHref(data.slug)}
            className='after:absolute after:inset-0 after:z-10 after:rounded-3xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-accent'
          >
            {t(`cases.${data.slug}.title`)}
          </Link>
        </Heading>
        <p className='mt-2 text-sm text-muted-foreground'>
          {t(`cases.${data.slug}.client`)} · {t(`objectives.${data.objective}`)}
        </p>
        <span className='mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-accent'>
          {t("labels.viewCase")}
          <LuArrowRight
            className='size-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1'
            aria-hidden='true'
          />
        </span>
      </div>
    </article>
  );
}
