import { useTranslations } from "next-intl";
import type { IconType } from "react-icons";
import { LuCheck, LuGlobe, LuLayers, LuLayoutDashboard } from "react-icons/lu";
import { Link } from "@/i18n/routing";
import { services } from "@/data/services";
import { projectHref } from "@/lib/routes";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

const icons: Record<(typeof services)[number]["icon"], IconType> = {
  globe: LuGlobe,
  layers: LuLayers,
  dashboard: LuLayoutDashboard,
};

export default function Services() {
  const t = useTranslations("home.services");
  const projects = useTranslations("projects.items");

  return (
    <Section
      id='services'
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={t("description")}
    >
      <div className='grid gap-6 md:grid-cols-3'>
        {services.map(({ id, icon, examples }, index) => {
          const Icon = icons[icon];
          const points = t.raw(`items.${id}.points`) as string[];
          return (
            <Reveal key={id} delay={index * 0.06} className='h-full'>
              <article className='flex h-full flex-col rounded-2xl border border-border bg-surface p-6 sm:p-7'>
                <span className='inline-flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent'>
                  <Icon className='size-5' aria-hidden='true' />
                </span>
                <h3 className='mt-5 text-xl font-semibold tracking-tight'>
                  {t(`items.${id}.title`)}
                </h3>
                <p className='mt-3 leading-relaxed text-muted-foreground'>
                  {t(`items.${id}.description`)}
                </p>
                <ul className='mt-5 space-y-2 text-sm'>
                  {points.map((point) => (
                    <li key={point} className='flex gap-2.5'>
                      <LuCheck
                        className='mt-0.5 size-4 shrink-0 text-accent'
                        aria-hidden='true'
                      />
                      {point}
                    </li>
                  ))}
                </ul>
                <p className='mt-auto border-t border-border pt-4 text-sm text-muted-foreground'>
                  <span className='me-1'>{t("examples")}:</span>
                  {examples.map((slug, i) => (
                    <span key={slug}>
                      {i > 0 && ", "}
                      <Link
                        href={projectHref(slug)}
                        className='font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent'
                      >
                        {projects(`${slug}.title`)}
                      </Link>
                    </span>
                  ))}
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
