import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { getShowcaseProjects } from "@/data/project-images";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Process from "@/components/home/Process";
import Background from "@/components/home/Background";
import ProjectCard from "@/components/work/ProjectCard";
import CtaBanner from "@/components/shared/CtaBanner";
import JsonLd from "@/components/shared/JsonLd";

type Props = { params: Promise<{ locale: AppLocale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: { absolute: t("title") },
    ...pageMetadata({
      locale,
      href: "/",
      title: t("title"),
      description: t("description"),
    }),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home.work");
  const nav = await getTranslations("nav");

  const sameAs = [
    site.socials.linkedin,
    site.socials.github,
    site.socials.medium,
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": `${site.url}/#organization`,
              name: site.company,
              url: site.url,
              logo: `${site.url}/icons/icon-512.png`,
              email: site.email,
              telephone: site.phone.href.replace("tel:", ""),
              areaServed: "IL",
              founder: { "@id": `${site.url}/#person` },
            },
            {
              "@type": "Person",
              "@id": `${site.url}/#person`,
              name: site.name,
              jobTitle: nav("role"),
              url: site.url,
              worksFor: { "@id": `${site.url}/#organization` },
              sameAs,
            },
          ],
        }}
      />

      <Hero />

      <Section
        id='work'
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        actions={
          <ButtonLink href='/projects' variant='secondary'>
            {t("viewAll")}
          </ButtonLink>
        }
      >
        <div className='grid gap-x-10 gap-y-14 md:grid-cols-2'>
          {getShowcaseProjects(4).map((project) => (
            <Reveal key={project.slug}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Process />
      <Services />
      <Background />
      <CtaBanner showWork={false} />
    </>
  );
}
