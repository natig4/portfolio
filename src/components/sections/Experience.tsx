"use client";

import { motion } from "framer-motion";
import { useDirection } from "@/hooks/useDirection";
import { JSX, memo } from "react";
import { useTranslations } from "next-intl";

import {
  FaHeadset,
  FaClipboardCheck,
  FaUsersCog,
  FaCode,
  FaLaptopCode,
} from "react-icons/fa";
import TimelineItem from "../TimelineItem/TimelineItem";

interface Company {
  company: string;
  position: string;
  period: string;
  description: string[];
}

interface ExperienceSectionProps {
  title: string;
  companies: Company[];
  isMobile: boolean;
}

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

interface CompanyIconData {
  icon: JSX.Element;
  gradient: [string, string];
}

const companyIconMap: { [key: string]: CompanyIconData } = {
  Freelance: {
    icon: <FaLaptopCode size={24} />,
    gradient: ["primary", "secondary"],
  },
  Outbrain: {
    icon: <FaCode size={24} />,
    gradient: ["yellow-500", "amber-500"],
  },
  Nova: {
    icon: <FaClipboardCheck size={24} />,
    gradient: ["green-500", "emerald-500"],
  },
  myThings: {
    icon: <FaUsersCog size={24} />,
    gradient: ["purple-500", "pink-500"],
  },
  Bezeq: {
    icon: <FaHeadset size={24} />,
    gradient: ["blue-500", "cyan-400"],
  },
};

const hebrewToEnglishCompanyMap: { [key: string]: string } = {
  פרילנס: "Freelance",
  עצמאי: "Freelance",
  אאוטבריין: "Outbrain",
  נובה: "Nova",
  מייתינגס: "myThings",
  בזק: "Bezeq",
};

export function getCompanyIcon(companyName: string): CompanyIconData {
  const englishCompany = hebrewToEnglishCompanyMap[companyName] || companyName;
  return (
    companyIconMap[englishCompany] || {
      icon: <FaCode size={24} />,
      gradient: ["gray-500", "gray-600"],
    }
  );
}

const ExperienceSection = memo(function ExperienceSection({
  title,
  companies,
  isMobile,
}: ExperienceSectionProps) {
  const { direction } = useDirection();
  const t = useTranslations("common");

  return (
    <motion.main
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className='max-w-6xl mx-auto relative z-10'
      role='main'
      aria-labelledby='experience-title'
    >
      <motion.header variants={itemVariants} className='text-center mb-16'>
        <h1
          id='experience-title'
          className='text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'
        >
          {title}
        </h1>
        <p className='text-xl text-text-secondary max-w-3xl mx-auto'>
          {t("subtitles.experience")}
        </p>
      </motion.header>

      <motion.section
        variants={itemVariants}
        className='mb-12 bg-surface/80 dark:bg-surface/60 backdrop-blur-sm p-8 rounded-2xl border border-border/30'
        aria-labelledby='journey-title'
      >
        <h2 id='journey-title' className='text-2xl font-bold mb-4 text-text'>
          {t("career.journeyTitle")}
        </h2>
        <p className='text-text-secondary' dir={direction}>
          {t("career.journeyDescription")}
        </p>
      </motion.section>

      {!isMobile && (
        <section className='relative mb-20' aria-labelledby='timeline-title'>
          <h2 id='timeline-title' className='sr-only'>
            Career Timeline
          </h2>
          <div
            className='absolute top-8 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-primary/40 via-secondary/40 to-accent/40 transform -translate-x-1/2 hidden md:block'
            aria-hidden='true'
          />

          <div className='space-y-0' role='list' aria-label='Career timeline'>
            {companies.map((company, idx) => {
              const iconDetails = getCompanyIcon(company.company);

              return (
                <div key={company.company} role='listitem'>
                  <TimelineItem
                    year={company.period}
                    title={company.position}
                    company={company.company}
                    description={company.description.join(" ")}
                    side={idx % 2 === 0 ? "left" : "right"}
                    icon={iconDetails.icon}
                    gradientFrom={iconDetails.gradient[0]}
                    gradientTo={iconDetails.gradient[1]}
                  />
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section className='mt-20' aria-labelledby='detailed-experience-title'>
        <motion.h2
          id='detailed-experience-title'
          variants={itemVariants}
          className='text-3xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'
        >
          {t("career.detailedExperience")}
        </motion.h2>

        <div
          className='grid grid-cols-1 gap-10 lg:gap-16'
          role='list'
          aria-label='Detailed work experience'
        >
          {companies.map((company, index) => (
            <motion.article
              key={index}
              variants={itemVariants}
              className='relative'
              role='listitem'
              aria-labelledby={`experience-${index}`}
            >
              {index < companies.length - 1 && (
                <div
                  className='absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 to-secondary/40 hidden md:block'
                  aria-hidden='true'
                />
              )}

              <motion.div
                whileHover={{
                  y: -5,
                  scale: 1.01,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                className='relative md:ml-16 bg-surface/80 dark:bg-surface/60 backdrop-blur-lg p-8 rounded-2xl border border-border/30 overflow-hidden group transition-all duration-200'
                dir={direction}
              >
                <div
                  className='absolute left-[-2rem] top-8 w-4 h-4 rounded-full bg-gradient-to-r from-primary to-secondary hidden md:block'
                  aria-hidden='true'
                />

                <div
                  className='absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none'
                  aria-hidden='true'
                />

                <div className='relative z-10'>
                  <div className='flex flex-col md:flex-row md:items-center gap-4 mb-4'>
                    <time
                      className='px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-lg inline-flex items-center justify-center'
                      dateTime={company.period}
                    >
                      {company.period}
                    </time>
                  </div>

                  <header className='mb-6'>
                    <h3
                      id={`experience-${index}`}
                      className='text-2xl md:text-3xl font-bold mb-2 text-text'
                    >
                      {company.position}
                    </h3>
                    <p className='text-xl text-text-secondary'>
                      {company.company}
                    </p>
                  </header>

                  <section aria-labelledby={`responsibilities-${index}`}>
                    <h4 id={`responsibilities-${index}`} className='sr-only'>
                      Key responsibilities and achievements
                    </h4>
                    <ul
                      className='space-y-3'
                      role='list'
                      aria-label={`Responsibilities at ${company.company}`}
                    >
                      {company.description.map((item, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.3 + itemIndex * 0.1,
                            duration: 0.3,
                          }}
                          className='flex items-start gap-3 text-text-secondary'
                          role='listitem'
                        >
                          <span
                            className='w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full mt-2 flex-shrink-0'
                            aria-hidden='true'
                          />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </section>
                </div>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </section>
    </motion.main>
  );
});

export default ExperienceSection;
