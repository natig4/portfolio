import type { CSSProperties } from "react";
import { useFormatter, useTranslations } from "next-intl";
import { LuArrowRight, LuCheck } from "react-icons/lu";
import { getHeadlineMetric, getMarketingCase } from "@/data/marketing";
import { formatMetricHeadline } from "@/lib/metrics";
import { site, yearsSince } from "@/lib/site";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Aurora from "@/components/ui/Aurora";
import { ButtonLink } from "@/components/ui/Button";
import HeroShots from "./HeroShots";

/** Splits a line into words that rise in one after another (`.rise`). */
function Words({
  text,
  offset = 0,
  className = "",
}: {
  text: string;
  offset?: number;
  className?: string;
}) {
  return text.split(" ").map((word, index) => (
    <span key={index}>
      <span
        className={`rise ${className}`}
        style={{ "--i": offset + index } as CSSProperties}
      >
        {word}
      </span>{" "}
    </span>
  ));
}

export default function Hero() {
  const t = useTranslations("home.hero");
  const format = useFormatter();
  const start = t("titleStart");

  const trust = [
    t("trust.years", { years: yearsSince(site.careerStartYear) }),
    t("trust.saved"),
    t("trust.channels"),
    t("trust.bilingual"),
  ];

  const chips = [
    {
      key: "purchaseValue",
      value: formatMetricHeadline(
        format,
        getHeadlineMetric(getMarketingCase("ecommerce-growth")),
      ),
      label: t("chips.purchaseValue"),
    },
    { key: "google", value: "#1", label: t("chips.google") },
    {
      key: "cpc",
      value: formatMetricHeadline(
        format,
        getHeadlineMetric(getMarketingCase("security-leads")),
      ),
      label: t("chips.cpc"),
    },
  ];

  return (
    <section
      aria-labelledby='hero-title'
      className='section-ink relative overflow-hidden'
    >
      <Aurora />
      <div
        className='bg-grid pointer-events-none absolute inset-0 opacity-40'
        aria-hidden='true'
      />

      <Container className='relative grid items-center gap-16 py-16 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:py-28'>
        {/* The words only move and sharpen — opacity stays 1, so this LCP text paints immediately. */}
        <div>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1
            id='hero-title'
            className='mt-6 text-[2.6rem] leading-[1.04] font-extrabold tracking-tight sm:text-6xl lg:text-[3.75rem]'
          >
            <Words text={start} />
            {/* Gradient per word: a clipped background on a parent wouldn't cover the animating words. */}
            <Words
              text={t("titleHighlight")}
              offset={start.split(" ").length}
              className='text-gradient'
            />
          </h1>
          <p className='mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl'>
            {t("description")}
          </p>
          <div className='mt-10 flex flex-wrap gap-3'>
            <ButtonLink href='/contact' size='lg' variant='brand'>
              {t("primary")}
              <LuArrowRight
                className='size-4 transition-transform group-hover/button:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover/button:-translate-x-0.5'
                aria-hidden='true'
              />
            </ButtonLink>
            <ButtonLink href='/marketing' size='lg' variant='secondary'>
              {t("secondary")}
            </ButtonLink>
          </div>
          <ul className='mt-11 grid gap-x-6 gap-y-3 text-sm text-muted-foreground sm:grid-cols-2'>
            {trust.map((item) => (
              <li key={item} className='flex items-center gap-2.5'>
                <LuCheck
                  className='size-4 shrink-0 text-growth'
                  aria-hidden='true'
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className='animate-fade-up [animation-delay:150ms]'>
          <HeroShots label={t("shotsLabel")} chips={chips} />
        </div>
      </Container>
    </section>
  );
}
