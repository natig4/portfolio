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
import Aurora from "@/components/ui/Aurora";

const icons: Record<(typeof services)[number]["icon"], IconType> = {
  globe: LuGlobe,
  layers: LuLayers,
  dashboard: LuLayoutDashboard,
  search: LuSearch,
};

/** Bento grid: the first service is the tall ink tile, the last spans two columns. */
const layout = [
  "md:col-span-2 lg:col-span-1 lg:row-span-2",
  "",
  "",
  "md:col-span-2",
];

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
      <div className='grid gap-5 md:grid-cols-2 lg:grid-cols-3'>
        {services.map((service, index) => {
          const { id, icon } = service;
          const Icon = icons[icon];
          const featured = index === 0;
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
            <Reveal
              key={id}
              index={index}
              variant='scale'
              className={`h-full ${layout[index] ?? ""}`}
            >
              <article
                className={`glow-card relative flex h-full flex-col overflow-hidden rounded-3xl border border-border p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-8 ${featured ? "section-ink lg:p-10" : "bg-surface"}`}
              >
                {featured && <Aurora />}
                <span
                  className={`relative inline-flex items-center justify-center rounded-2xl bg-accent-soft text-accent ${featured ? "size-14" : "size-11"}`}
                >
                  <Icon
                    className={featured ? "size-7" : "size-5"}
                    aria-hidden='true'
                  />
                </span>
                <h3
                  className={`relative mt-6 font-bold tracking-tight ${featured ? "text-3xl sm:text-4xl" : "text-xl"}`}
                >
                  {t(`items.${id}.title`)}
                </h3>
                <p
                  className={`relative mt-3 leading-relaxed text-muted-foreground ${featured ? "text-lg" : ""}`}
                >
                  {t(`items.${id}.description`)}
                </p>
                <ul className='relative mt-6 mb-8 space-y-2.5 text-sm'>
                  {points.map((point) => (
                    <li key={point} className='flex gap-2.5'>
                      <LuCheck
                        className={`mt-0.5 size-4 shrink-0 ${featured ? "text-growth" : "text-accent"}`}
                        aria-hidden='true'
                      />
                      {point}
                    </li>
                  ))}
                </ul>
                <p className='relative mt-auto border-t border-border pt-4 text-sm text-muted-foreground'>
                  <span className='me-1'>{t("examples")}:</span>
                  {examples.map(({ key, href, label }, i) => (
                    <span key={key}>
                      {i > 0 && " · "}
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
