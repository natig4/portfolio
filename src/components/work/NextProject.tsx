import { useTranslations } from "next-intl";
import { LuArrowUpRight } from "react-icons/lu";
import { Link } from "@/i18n/routing";
import type { ProjectSlug } from "@/data/projects";
import { projectHref } from "@/lib/routes";
import Eyebrow from "@/components/ui/Eyebrow";
import ProjectCover from "./ProjectCover";

export default function NextProject({ slug }: { slug: ProjectSlug }) {
  const t = useTranslations("projects");
  const title = t(`items.${slug}.title`);

  return (
    <Link
      href={projectHref(slug)}
      className='group grid items-center gap-6 rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/40 sm:grid-cols-[1fr_280px] sm:p-8'
    >
      <div>
        <Eyebrow>{t("labels.nextProject")}</Eyebrow>
        <p className='mt-3 flex items-center gap-2 text-2xl font-semibold tracking-tight'>
          {title}
          <LuArrowUpRight
            className='size-5 text-muted-foreground transition-colors group-hover:text-accent rtl:-scale-x-100'
            aria-hidden='true'
          />
        </p>
        <p className='mt-2 text-muted-foreground'>
          {t(`items.${slug}.tagline`)}
        </p>
      </div>
      <ProjectCover slug={slug} title={title} sizes='280px' />
    </Link>
  );
}
