import { useTranslations } from "next-intl";
import type { IconType } from "react-icons";
import {
  LuCheck,
  LuGlobe,
  LuLayers,
  LuLayoutDashboard,
  LuSearch,
} from "react-icons/lu";
import { Link } from "@/i18n/routing";
import { services } from "@/data/services";
import { marketingCaseHref, projectHref } from "@/lib/routes";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

const icons: Record<(typeof services)[number]["icon"], IconType> = {
  globe: LuGlobe,
  layers: LuLayers,
  dashboard: LuLayoutDashboard,
  search: LuSearch,
};

export default function Services() {
  const t = useTranslations("home.services");
  const projects = useTranslations("projects.items");
  const cases = useTranslations("marketing.cases");

  return (
    <Section
      id='services'
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={t("description")}
    >
      <div className='grid gap-6 md:grid-cols-2'>
        {services.map((service) => {
          const { id, icon } = service;
          const Icon = icons[icon];
          const points = t.raw(`items.${id}.points`) as string[];
          const examples = [
            ...service.examples.map((slug) => ({
              key: slug,
              href: projectHref(slug),
              label: projects(`${slug}.title`),
            })),
            ...("cases" in service ? service.cases : []).map((slug) => ({
              key: slug,
              href: marketingCaseHref(slug),
              label: cases(`${slug}.title`),
            })),
          ];
          return (
            <Reveal key={id} className='h-full'>
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
                <ul className='mt-5 mb-6 space-y-2 text-sm'>
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
                  {examples.map(({ key, href, label }, i) => (
                    <span key={key}>
                      {i > 0 && ", "}
                      <Link
                        href={href}
                        className='font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent'
                      >
                        {label}
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
