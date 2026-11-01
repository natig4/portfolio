import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import ProjectCard from "@/components/work/ProjectCard";
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
            <ProjectCard
              key={project.slug}
              project={project}
              headingLevel='h2'
              preload={index < 2}
            />
          ))}
        </div>
      </Container>
      <CtaBanner showWork={false} />
    </>
  );
}
