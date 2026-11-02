import { useTranslations } from "next-intl";
import { processSteps } from "@/data/services";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";

/**
 * Delivery process as cards that stack while scrolling (CSS `position:
 * sticky` with a growing offset; no JavaScript). The intro stays pinned beside
 * them on large screens.
 */
export default function Process() {
  const t = useTranslations("home.process");

  return (
    <section
      id='process'
      aria-labelledby='process-title'
      className='border-y border-border bg-surface/60 py-20 sm:py-28'
    >
      <Container className='grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-20'>
        <div className='lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:self-start'>
          <Eyebrow className='mb-4'>{t("eyebrow")}</Eyebrow>
          <h2
            id='process-title'
            className='text-3xl leading-[1.1] font-bold tracking-tight sm:text-4xl lg:text-[2.75rem]'
          >
            {t("title")}
          </h2>
          <p className='mt-5 text-lg leading-relaxed text-muted-foreground'>
            {t("description")}
          </p>
        </div>

        <ol className='space-y-5'>
          {processSteps.map((step, index) => (
            <li
              key={step}
              className='lg:sticky'
              style={{
                top: `calc(var(--header-height) + 2rem + ${index * 1.5}rem)`,
              }}
            >
              <div className='rounded-3xl border border-border bg-surface p-7 shadow-[0_-16px_40px_-28px_rgb(11_15_26/0.35)] sm:p-8'>
                <div className='flex items-baseline gap-5'>
                  <span className='text-gradient text-4xl font-extrabold tabular-nums'>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className='text-xl font-bold tracking-tight'>
                    {t(`steps.${step}.title`)}
                  </h3>
                </div>
                <p className='mt-3 leading-relaxed text-muted-foreground'>
                  {t(`steps.${step}.description`)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
