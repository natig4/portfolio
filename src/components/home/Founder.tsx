import { useTranslations } from "next-intl";
import { LuArrowRight } from "react-icons/lu";
import { marketingCases } from "@/data/marketing";
import { site, yearsSince } from "@/lib/site";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import CountUp from "@/components/ui/CountUp";
import { ButtonLink } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

/** Who runs the studio, in short; the full story is on /about. */
export default function Founder() {
  const t = useTranslations("home.founder");
  const years = yearsSince(site.careerStartYear);
  const stats = [
    { key: "years", value: `${years}+`, label: t("stats.years") },
    { key: "saved", value: "$1M+", label: t("stats.saved") },
    { key: "cases", value: String(marketingCases.length), label: t("stats.cases") },
  ];

  return (
    <section aria-labelledby='founder-title' className='py-20 sm:py-28'>
      <Container className='grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20'>
        <Reveal variant='start'>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2
            id='founder-title'
            className='mt-4 text-3xl leading-[1.1] font-bold tracking-tight sm:text-4xl lg:text-[2.75rem]'
          >
            {t("title")}
          </h2>
          <p className='mt-5 text-lg leading-relaxed text-muted-foreground'>
            {t("description", { years })}
          </p>
          <ButtonLink href='/about' variant='secondary' className='mt-8'>
            {t("cta")}
            <LuArrowRight
              className='size-4 transition-transform group-hover/button:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover/button:-translate-x-0.5'
              aria-hidden='true'
            />
          </ButtonLink>
        </Reveal>

        <Reveal variant='scale'>
          <div className='glow-card relative overflow-hidden rounded-3xl border border-border bg-surface p-8 sm:p-10'>
            <dl className='relative grid gap-8 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3'>
              {stats.map(({ key, value, label }) => (
                <div key={key} className='flex flex-col'>
                  <dt className='order-2 mt-1 text-sm text-muted-foreground'>
                    {label}
                  </dt>
                  <dd className='text-4xl font-bold tracking-tight text-accent'>
                    <CountUp text={value} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
