"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useDirection } from "@/hooks/useDirection";
import { memo } from "react";
import Image from "next/image";

const MarketingSection = memo(function MarketingSection() {
  const t = useTranslations("marketing");
  const { direction } = useDirection();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className='max-w-6xl mx-auto relative z-10'
    >
      <motion.div variants={itemVariants} className='text-center mb-16'>
        <h1 className='text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>
          {t("title")}
        </h1>
        <p className='text-xl text-text-secondary max-w-3xl mx-auto'>
          {t("subtitle")}
        </p>
      </motion.div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
        <motion.div
          variants={itemVariants}
          className='bg-surface/80 backdrop-blur-sm rounded-2xl p-8 border border-border/30 relative overflow-hidden'
          dir={direction}
        >
          <div className='absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 pointer-events-none' />

          <div className='relative z-10'>
            <p className='text-lg text-text-secondary mb-8'>
              {t("description")}
            </p>

            <div className='grid grid-cols-2 gap-6'>
              <div className='flex flex-col p-4 bg-primary/10 rounded-lg border border-primary/20'>
                <h3 className='text-lg font-medium text-primary mb-2'>
                  {t("metrics.users")}
                </h3>
                <div className='text-3xl font-bold'>+41.3%</div>
                <div className='text-sm text-text-secondary mt-1'>
                  {t("prevQuarter")}
                </div>
              </div>

              <div className='flex flex-col p-4 bg-secondary/10 rounded-lg border border-secondary/20'>
                <h3 className='text-lg font-medium text-secondary mb-2'>
                  {t("metrics.activity")}
                </h3>
                <div className='text-3xl font-bold'>+41.2%</div>
                <div className='text-sm text-text-secondary mt-1'>
                  {t("prevQuarter")}
                </div>
              </div>

              <div className='flex flex-col p-4 bg-accent/10 rounded-lg border border-accent/20'>
                <h3 className='text-lg font-medium text-accent mb-2'>
                  {t("metrics.firstPurchase")}
                </h3>
                <div className='text-3xl font-bold'>+31.9%</div>
                <div className='text-sm text-text-secondary mt-1'>
                  {t("prevQuarter")}
                </div>
              </div>

              <div className='flex flex-col p-4 bg-accent-secondary/10 rounded-lg border border-accent-secondary/20'>
                <h3 className='text-lg font-medium text-accent-secondary mb-2'>
                  {t("metrics.purchases")}
                </h3>
                <div className='text-3xl font-bold'>+51.7%</div>
                <div className='text-sm text-text-secondary mt-1'>
                  {t("prevQuarter")}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className='bg-surface/80 backdrop-blur-sm rounded-2xl border border-border/30 overflow-hidden flex flex-col'
        >
          <div className='relative z-10 h-full'>
            <Image
              priority
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              src='/images/performance-heb.png'
              alt='Marketing Performance Chart'
              className='max-w-full h-auto rounded-lg border border-border/30 shadow-lg'
            />
          </div>
          <p className='text-center text-sm text-text-secondary mt-4'>
            {t("chartCaption")}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
});

export default MarketingSection;
