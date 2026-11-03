import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";
import type { IconType } from "react-icons";
import {
  LuArrowRight,
  LuChartColumnIncreasing,
  LuCodeXml,
  LuEqual,
  LuGauge,
  LuHandshake,
  LuMegaphone,
  LuPlus,
  LuRocket,
  LuTarget,
} from "react-icons/lu";
import { Link } from "@/i18n/routing";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Aurora from "@/components/ui/Aurora";

const points: { id: "tracking" | "seo" | "landing" | "owner"; icon: IconType }[] =
  [
    { id: "tracking", icon: LuTarget },
    { id: "seo", icon: LuGauge },
    { id: "landing", icon: LuRocket },
    { id: "owner", icon: LuHandshake },
  ];

/** Decorative campaign bars for the marketing card; they grow in on scroll. */
const bars = [38, 52, 46, 68, 74, 92];

function Operator({ icon: Icon }: { icon: IconType }) {
  return (
    <Reveal variant='scale' className='flex items-center justify-center'>
      <span className='flex size-12 items-center justify-center rounded-full bg-brand text-white shadow-[0_10px_30px_-10px_var(--brand-from)]'>
        <Icon className='size-6' aria-hidden='true' />
      </span>
    </Reveal>
  );
}

/**
 * The studio's pitch as an equation: development + marketing = customers.
 * The two halves slide in from opposite sides as the section scrolls into view.
 */
export default function Edge() {
  const t = useTranslations("home.edge");
  const devItems = t.raw("dev.items") as string[];
  const marketingItems = t.raw("marketing.items") as string[];

  return (
    <Section
      id='edge'
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={t("description")}
    >
      <div className='grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr_auto_0.9fr]'>
        {/* Development: drawn as a code editor. */}
        <Reveal variant='start' className='h-full'>
          <div className='h-full overflow-clip rounded-3xl border border-border bg-surface shadow-[0_24px_48px_-32px_rgb(11_15_26/0.45)]'>
            <div
              className='flex items-center gap-2 border-b border-border bg-muted/60 px-5 py-3'
              dir='ltr'
            >
              <span className='size-2.5 rounded-full bg-[#f87171]' />
              <span className='size-2.5 rounded-full bg-[#fbbf24]' />
              <span className='size-2.5 rounded-full bg-[#4ade80]' />
              <span className='ms-3 font-mono text-xs text-muted-foreground'>
                {t("dev.file")}
              </span>
            </div>
            <div className='p-6 sm:p-7'>
              <h3 className='flex items-center gap-3 text-2xl font-bold'>
                <LuCodeXml className='size-7 text-accent' aria-hidden='true' />
                {t("dev.title")}
              </h3>
              <ul className='mt-5 space-y-3'>
                {devItems.map((item, index) => (
                  <li key={item} className='flex gap-3 leading-snug'>
                    <span
                      className='mt-0.5 shrink-0 font-mono text-xs font-semibold text-muted-foreground tabular-nums'
                      dir='ltr'
                      aria-hidden='true'
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Operator icon={LuPlus} />

        {/* Marketing: drawn as a campaign dashboard. */}
        <Reveal variant='end' className='h-full'>
          <div className='h-full overflow-clip rounded-3xl border border-border bg-surface shadow-[0_24px_48px_-32px_rgb(11_15_26/0.45)]'>
            <div className='flex items-center justify-between border-b border-border bg-muted/60 px-5 py-3'>
              <span className='font-mono text-xs text-muted-foreground'>
                {t("marketing.file")}
              </span>
              <LuChartColumnIncreasing
                className='size-4 text-growth'
                aria-hidden='true'
              />
            </div>
            <div className='p-6 sm:p-7'>
              <h3 className='flex items-center gap-3 text-2xl font-bold'>
                <LuMegaphone className='size-7 text-accent' aria-hidden='true' />
                {t("marketing.title")}
              </h3>
              <ul className='mt-5 space-y-3'>
                {marketingItems.map((item) => (
                  <li key={item} className='flex gap-3 leading-snug'>
                    <span
                      className='mt-2 size-1.5 shrink-0 rounded-full bg-brand'
                      aria-hidden='true'
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <div
                className='mt-6 flex h-14 items-end gap-1.5'
                aria-hidden='true'
              >
                {bars.map((height, index) => (
                  <span
                    key={index}
                    className='grow-y flex-1 rounded-t-md bg-brand opacity-80'
                    style={
                      { height: `${height}%`, "--i": index } as CSSProperties
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Operator icon={LuEqual} />

        {/* The sum. */}
        <Reveal variant='scale' className='h-full'>
          <div className='section-ink relative flex h-full flex-col justify-between overflow-clip rounded-3xl p-7 sm:p-8'>
            <Aurora />
            <div className='relative'>
              <h3 className='text-gradient text-5xl font-extrabold tracking-tight sm:text-6xl'>
                {t("result.title")}
              </h3>
              <p className='mt-4 text-lg leading-relaxed text-muted-foreground'>
                {t("result.description")}
              </p>
            </div>
            <Link
              href='/marketing'
              className='group relative mt-8 inline-flex items-center gap-2 font-semibold text-growth'
            >
              {t("result.cta")}
              <LuArrowRight
                className='size-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1'
                aria-hidden='true'
              />
            </Link>
          </div>
        </Reveal>
      </div>

      <ul className='mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4'>
        {points.map(({ id, icon: Icon }, index) => (
          <li key={id}>
            <Reveal index={index}>
              <span className='inline-flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent'>
                <Icon className='size-5' aria-hidden='true' />
              </span>
              <h3 className='mt-4 text-lg font-bold'>
                {t(`points.${id}.title`)}
              </h3>
              <p className='mt-2 leading-relaxed text-muted-foreground'>
                {t(`points.${id}.description`)}
              </p>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
