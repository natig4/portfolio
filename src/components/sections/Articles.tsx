"use client";

import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useDirection } from "@/hooks/useDirection";
import { FaMedium } from "react-icons/fa";
import { useTranslations } from "next-intl";

interface Article {
  title: string;
  date: string;
  excerpt: string;
}

interface ArticlesSectionProps {
  title: string;
  articles: Article[];
  followMe: string;
  forMore: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      duration: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const ArticleCard = memo(function ArticleCard({
  article,
  direction,
  prefersReducedMotion,
}: {
  article: Article;
  direction: string;
  prefersReducedMotion: boolean;
}) {
  const t = useTranslations("common");
  const hoverProps = prefersReducedMotion
    ? {}
    : {
        whileHover: {
          y: -8,
          scale: 1.02,
          transition: { duration: 0.2, ease: "easeOut" },
        },
      };

  return (
    <motion.div
      variants={itemVariants}
      {...hoverProps}
      className='will-change-transform bg-surface/80 dark:bg-surface/60 backdrop-blur-sm p-7 rounded-2xl border border-border/30 relative overflow-hidden group h-full flex flex-col'
      dir={direction}
    >
      <div className='absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200'></div>

      <div className='relative z-10 flex-1 flex flex-col'>
        <div className='mb-4'>
          <span className='text-sm text-text-secondary'>{article.date}</span>
        </div>

        <h3 className='text-xl font-bold mb-4 text-text group-hover:text-primary transition-colors duration-200'>
          {article.title}
        </h3>

        <p className='text-text-secondary mb-6 flex-1'>{article.excerpt}</p>
        <a
          href='#'
          className='text-primary font-medium inline-flex items-center gap-2 mt-auto hover:translate-x-1 transition-transform duration-200'
        >
          {t("readMore")}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className={direction === "rtl" ? "rotate-180" : ""}
          >
            <line x1='5' y1='12' x2='19' y2='12'></line>
            <polyline points='12 5 19 12 12 19'></polyline>
          </svg>
        </a>
      </div>
    </motion.div>
  );
});

const ArticlesSection = memo(function ArticlesSection({
  title,
  articles,
  followMe,
  forMore,
}: ArticlesSectionProps) {
  const { direction } = useDirection();
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("common");

  return (
    <div className='max-w-6xl mx-auto relative z-10'>
      <div className='text-center mb-16'>
        <h1 className='text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>
          {title}
        </h1>
        <p className='text-xl text-text-secondary max-w-3xl mx-auto'>
          {t("subtitles.articles")}
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'
      >
        {articles.map((article) => (
          <ArticleCard
            key={article.title}
            article={article}
            direction={direction}
            prefersReducedMotion={!!prefersReducedMotion}
          />
        ))}
      </motion.div>

      <div className='text-center p-10 bg-surface/30 backdrop-blur-sm rounded-2xl border border-border/20'>
        <FaMedium className='text-primary text-5xl mb-6 mx-auto' />
        <p className='text-text-secondary mb-8'>{forMore}</p>
        <a
          href='https://medium.com/@nati_g4'
          target='_blank'
          rel='noopener noreferrer'
          className='will-change-transform px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold inline-flex items-center gap-2 hover:shadow-lg hover:scale-[1.05] hover:-translate-y-1 transition-all duration-200'
        >
          <FaMedium />
          {followMe}
        </a>
      </div>
    </div>
  );
});

export default ArticlesSection;
