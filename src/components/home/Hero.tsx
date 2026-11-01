import { useTranslations } from "next-intl";
import { LuArrowRight, LuCheck } from "react-icons/lu";
import { site, yearsSince } from "@/lib/site";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import { ButtonLink } from "@/components/ui/Button";
import HeroShots from "./HeroShots";

export default function Hero() {
  const t = useTranslations("home.hero");
  const trust = [
    t("trust.outbrain"),
    t("trust.years", { years: yearsSince(site.careerStartYear) }),
    t("trust.bilingual"),
    t("trust.stack"),
  ];

  return (
    <section
      aria-labelledby='hero-title'
      className='relative overflow-hidden border-b border-border'
    >
      <div
        className='pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:56px_56px] opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]'
        aria-hidden='true'
      />
      <div
        className='pointer-events-none absolute -top-40 end-[-10%] size-[36rem] rounded-full bg-brand-cyan/15 blur-3xl'
        aria-hidden='true'
      />

      <Container className='relative grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:py-28'>
        <div className='animate-fade-up'>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1
            id='hero-title'
            className='mt-5 text-4xl leading-[1.08] font-semibold tracking-tight sm:text-5xl lg:text-[3.5rem]'
          >
            {t("title")}
          </h1>
          <p className='mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl'>
            {t("description")}
          </p>
          <div className='mt-9 flex flex-wrap gap-3'>
            <ButtonLink href='/contact' size='lg'>
              {t("primary")}
              <LuArrowRight
                className='size-4 rtl:-scale-x-100'
                aria-hidden='true'
              />
            </ButtonLink>
            <ButtonLink href='/projects' size='lg' variant='secondary'>
              {t("secondary")}
            </ButtonLink>
          </div>
          <ul className='mt-10 grid gap-x-6 gap-y-2.5 text-sm text-muted-foreground sm:grid-cols-2'>
            {trust.map((item) => (
              <li key={item} className='flex items-center gap-2'>
                <LuCheck
                  className='size-4 shrink-0 text-accent'
                  aria-hidden='true'
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className='animate-fade-up [animation-delay:120ms]'>
          <HeroShots label={t("shotsLabel")} />
        </div>
      </Container>
    </section>
  );
}
