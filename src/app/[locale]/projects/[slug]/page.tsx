import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LuArrowLeft, LuArrowUpRight, LuCheck } from "react-icons/lu";
import { Link, type AppLocale } from "@/i18n/routing";
import {
  getNextProject,
  getProject,
  isProjectSlug,
  projects,
} from "@/data/projects";
import { getProjectShots } from "@/data/project-images";
import { localizedUrl, pageMetadata } from "@/lib/metadata";
import { projectHref } from "@/lib/routes";
import { site } from "@/lib/site";
import { getTech } from "@/lib/tech";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import StatusBadge from "@/components/ui/StatusBadge";
import { buttonClass } from "@/components/ui/Button";
import ProjectCover from "@/components/work/ProjectCover";
import CaseStudyMeta from "@/components/work/CaseStudyMeta";
import ScreenshotShowcase from "@/components/work/ScreenshotShowcase";
import NextProject from "@/components/work/NextProject";
import CtaBanner from "@/components/shared/CtaBanner";
import JsonLd from "@/components/shared/JsonLd";

type Props = { params: Promise<{ locale: AppLocale; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isProjectSlug(slug)) return {};
  const t = await getTranslations({ locale, namespace: "projects.items" });
  const title = t(`${slug}.title`);

  return {
    title,
    ...pageMetadata({
      locale,
      href: projectHref(slug),
      title,
      description: t(`${slug}.summary`),
    }),
  };
}

const bodyText = "mt-4 text-lg leading-relaxed text-foreground/85";
const sectionTitle = "text-2xl font-semibold tracking-tight";

export default async function CaseStudyPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isProjectSlug(slug)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("projects");
  const project = getProject(slug);
  const shots = getProjectShots(slug);
  const item = (key: string) => t(`items.${slug}.${key}`);
  const highlights = t.raw(`items.${slug}.highlights`) as string[];
  const url = "url" in project ? project.url : undefined;
  const years =
    "ongoing" in project && project.ongoing
      ? `${project.year} – ${t("labels.present")}`
      : String(project.year);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: item("title"),
          description: item("summary"),
          url: localizedUrl(projectHref(slug), locale),
          dateCreated: String(project.year),
          inLanguage: locale,
          keywords: project.stack.map((id) => getTech(id).label).join(", "),
          creator: { "@type": "Person", name: site.name, url: site.url },
          ...(url ? { sameAs: url } : {}),
        }}
      />

      <Container className='pt-10 sm:pt-14'>
        <Link
          href='/projects'
          className='inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground'
        >
          <LuArrowLeft className='size-4 rtl:-scale-x-100' aria-hidden='true' />
          {t("labels.backToWork")}
        </Link>

        <header className='mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end'>
          <div className='max-w-3xl'>
            <Eyebrow>{item("sector")}</Eyebrow>
            <h1 className='mt-4 text-4xl font-semibold tracking-tight sm:text-5xl'>
              {item("title")}
            </h1>
            <p className='mt-5 text-xl leading-relaxed text-muted-foreground'>
              {item("tagline")}
            </p>
          </div>
          <div className='flex flex-wrap items-center gap-3'>
            <StatusBadge
              status={project.status}
              label={t(`status.${project.status}`)}
            />
            {url && (
              <a
                href={url}
                target='_blank'
                rel='noopener noreferrer'
                className={buttonClass()}
              >
                {t("labels.visitSite")}
                <LuArrowUpRight
                  className='size-4 rtl:-scale-x-100'
                  aria-hidden='true'
                />
                <span className='sr-only'>{t("labels.newTab")}</span>
              </a>
            )}
          </div>
        </header>

        <ProjectCover
          slug={slug}
          title={item("title")}
          url={url}
          alt={item("alt.desktop")}
          placeholderLabel={t("labels.noScreenshots")}
          sizes='(min-width: 1152px) 1104px, 100vw'
          preload
          className='mt-12'
        />
      </Container>

      <Container className='grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_300px] lg:gap-16'>
        <div className='max-w-2xl space-y-12'>
          <section aria-labelledby='overview'>
            <h2 id='overview' className={sectionTitle}>
              {t("labels.overview")}
            </h2>
            <p className={bodyText}>{item("summary")}</p>
          </section>

          <section aria-labelledby='challenge'>
            <h2 id='challenge' className={sectionTitle}>
              {t("labels.challenge")}
            </h2>
            <p className={bodyText}>{item("challenge")}</p>
          </section>

          <section aria-labelledby='solution'>
            <h2 id='solution' className={sectionTitle}>
              {t("labels.solution")}
            </h2>
            <p className={bodyText}>{item("solution")}</p>
            <ul className='mt-6 grid gap-3 sm:grid-cols-2'>
              {highlights.map((highlight) => (
                <li
                  key={highlight}
                  className='flex gap-3 rounded-lg border border-border bg-surface p-4 text-sm leading-relaxed'
                >
                  <LuCheck
                    className='mt-0.5 size-4 shrink-0 text-accent'
                    aria-hidden='true'
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby='result'>
            <h2 id='result' className={sectionTitle}>
              {t("labels.result")}
            </h2>
            <p className='mt-4 border-s-2 border-accent ps-5 text-lg leading-relaxed'>
              {item("result")}
            </p>
          </section>
        </div>

        <aside className='lg:sticky lg:top-24 lg:self-start'>
          <CaseStudyMeta
            items={[
              { label: t("labels.client"), value: item("client") },
              { label: t("labels.year"), value: years },
              { label: t("labels.role"), value: item("role") },
              { label: t("labels.type"), value: t(`kind.${project.kind}`) },
            ]}
            stackLabel={t("labels.stack")}
            stack={project.stack}
          />
        </aside>
      </Container>

      {shots?.full && shots.mobile && (
        <Container>
          <ScreenshotShowcase
            full={shots.full}
            mobile={shots.mobile}
            url={url}
            labels={{
              fullAlt: item("alt.full"),
              mobileAlt: item("alt.mobile"),
              fullCaption: `${t("labels.gallery")} · ${t("labels.desktop")}`,
              mobileCaption: t("labels.mobile"),
            }}
          />
        </Container>
      )}

      <Container className='pt-16'>
        <NextProject slug={getNextProject(slug).slug} />
      </Container>

      <CtaBanner />
    </>
  );
}
