import { useTranslations } from "next-intl";
import { LuArrowUpRight } from "react-icons/lu";
import { Link } from "@/i18n/routing";
import type { Project } from "@/data/projects";
import { projectHref } from "@/lib/routes";
import StatusBadge from "@/components/ui/StatusBadge";
import TechList from "@/components/ui/TechList";
import ProjectCover from "./ProjectCover";

export default function ProjectCard({
  project,
  headingLevel = "h3",
  preload = false,
}: {
  project: Project;
  headingLevel?: "h2" | "h3";
  preload?: boolean;
}) {
  const t = useTranslations("projects");
  const { slug } = project;
  const Heading = headingLevel;
  const title = t(`items.${slug}.title`);
  const url = "url" in project ? project.url : undefined;

  return (
    <article className='group relative flex flex-col'>
      <ProjectCover
        slug={slug}
        title={title}
        url={url}
        sizes='(min-width: 1024px) 544px, (min-width: 640px) 90vw, 100vw'
        preload={preload}
        zoomOnHover
        className='transition-[border-color,box-shadow,translate] duration-300 group-hover:-translate-y-1 group-hover:border-accent/40 motion-reduce:group-hover:translate-y-0'
      />

      <div className='mt-5 flex flex-wrap items-center gap-x-3 gap-y-2'>
        <StatusBadge
          status={project.status}
          label={t(`status.${project.status}`)}
        />
        <span className='text-sm text-muted-foreground'>
          {t(`kind.${project.kind}`)} · {project.year}
          {"ongoing" in project && project.ongoing
            ? `–${t("labels.present")}`
            : ""}
        </span>
      </div>

      <Heading className='mt-3 text-xl font-semibold tracking-tight'>
        <Link
          href={projectHref(slug)}
          className='inline-flex items-center gap-1.5 after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-accent'
        >
          {title}
          <LuArrowUpRight
            className='size-4 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:text-accent ltr:group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5'
            aria-hidden='true'
          />
        </Link>
      </Heading>
      <p className='mt-1 text-sm text-muted-foreground'>
        {t(`items.${slug}.client`)}
      </p>
      <p className='mt-3 leading-relaxed text-foreground/80'>
        {t(`items.${slug}.tagline`)}
      </p>

      <TechList
        ids={project.stack}
        max={4}
        moreLabel={(count) => t("labels.moreStack", { count })}
        className='mt-4'
      />
    </article>
  );
}
