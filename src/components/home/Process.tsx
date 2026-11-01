import { useTranslations } from "next-intl";
import { processSteps } from "@/data/services";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

export default function Process() {
  const t = useTranslations("home.process");

  return (
    <Section
      id='process'
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={t("description")}
      className='border-y border-border bg-surface'
    >
      <ol className='grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-5'>
        {processSteps.map((step, index) => (
          <li key={step}>
            <Reveal
              delay={index * 0.05}
              className='border-t-2 border-border pt-5'
            >
              <span className='font-mono text-sm font-medium text-accent'>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className='mt-2 text-lg font-semibold tracking-tight'>
                {t(`steps.${step}.title`)}
              </h3>
              <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
                {t(`steps.${step}.description`)}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
