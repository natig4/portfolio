import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import ProjectCard from "@/components/work/ProjectCard";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import CaseCard from "@/components/marketing/CaseCard";
import { getFeaturedMarketingCases } from "@/data/marketing";
import CtaBanner from "@/components/shared/CtaBanner";

type Props = { params: Promise<{ locale: AppLocale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects.page" });

  return {
    title: t("title"),
    ...pageMetadata({
      locale,
      href: "/projects",
      title: t("title"),
      description: t("description"),
    }),
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projects.page");
  const marketing = await getTranslations("projects.marketing");

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      <Container className='py-14 sm:py-20'>
        <div className='grid gap-x-10 gap-y-16 md:grid-cols-2'>
          {projects.map((project, index) => (
            <Reveal key={project.slug} index={index % 2}>
              <ProjectCard
                project={project}
                headingLevel='h2'
                preload={index < 2}
              />
            </Reveal>
          ))}
        </div>
      </Container>

      <Section
        id='marketing'
        ink
        eyebrow={marketing("eyebrow")}
        title={marketing("title")}
        description={marketing("description")}
        actions={
          <ButtonLink href='/marketing' variant='secondary'>
            {marketing("viewAll")}
          </ButtonLink>
        }
      >
        <ul className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {getFeaturedMarketingCases().map((data, index) => (
            <li key={data.slug}>
              <Reveal index={index} className='h-full'>
                <CaseCard data={data} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBanner showWork={false} />
    </>
  );
}
