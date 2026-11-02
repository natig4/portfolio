import { useFormatter, useLocale, useTranslations } from "next-intl";
import { LuArrowUpRight } from "react-icons/lu";
import type { articles } from "@/data/articles";

type Article = (typeof articles)[number];

export default function ArticleCard({ article }: { article: Article }) {
  const t = useTranslations("articles");
  const format = useFormatter();
  const locale = useLocale();
  const titleId = `${article.slug}-title`;

  return (
    <article
      aria-labelledby={titleId}
      className='group relative flex flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/40 sm:p-8'
    >
      <div className='flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground'>
        <time dateTime={article.publishedAt}>
          {format.dateTime(new Date(article.publishedAt), {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <span aria-hidden='true'>·</span>
        <span>Medium</span>
        {article.lang !== locale && (
          <span className='rounded-full border border-border px-2 py-0.5 text-xs'>
            {t(`labels.language.${article.lang}`)}
          </span>
        )}
      </div>
      <h2 id={titleId} className='mt-4 text-2xl font-semibold tracking-tight'>
        <a
          href={article.url}
          target='_blank'
          rel='noopener noreferrer'
          className='after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-accent'
        >
          {t(`items.${article.slug}.title`)}
          <span className='sr-only'> {t("labels.newTab")}</span>
        </a>
      </h2>
      <p className='mt-3 leading-relaxed text-muted-foreground'>
        {t(`items.${article.slug}.excerpt`)}
      </p>
      <span className='mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent'>
        {t("labels.read")}
        <LuArrowUpRight
          className='size-4 transition-transform group-hover:-translate-y-0.5 rtl:-scale-x-100'
          aria-hidden='true'
        />
      </span>
    </article>
  );
}
