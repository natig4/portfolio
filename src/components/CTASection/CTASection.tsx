import { Link, Pathnames } from "@/i18n/routing";
import { memo } from "react";
import { useTranslations } from "next-intl";

interface CTASectionProps {
  title?: string;
  linkedInUrl?: string;
  linkedInLabel?: string;
  contactLabel?: string;
  primaryLink?: Pathnames;
  secondaryLink?: Pathnames;
  pad?: boolean;
  useLinkedIn?: boolean;
  titleKey?: string;
}

const CTASection = memo(function CTASection({
  title,
  linkedInUrl = "https://www.linkedin.com/in/nati-gurevich-36868711b",
  linkedInLabel = "View LinkedIn Profile",
  contactLabel = "Contact Me",
  primaryLink = "/projects",
  secondaryLink = "/contact",
  pad = false,
  useLinkedIn = false,
  titleKey = "defaultTitle",
}: CTASectionProps) {
  const t = useTranslations("common");
  const containerClass = `w-full ${pad ? "py-10" : ""}`;

  const displayTitle = title || t(`cta.${titleKey}`);

  return (
    <div className={containerClass}>
      <div className='container mx-auto px-4 text-center'>
        {displayTitle && (
          <p className='text-xl text-gray-700 dark:text-gray-300 mb-6 font-normal'>
            {displayTitle}
          </p>
        )}

        <div className='inline-flex flex-wrap justify-center gap-4'>
          <div className='will-change-transform transition-transform duration-150 hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97]'>
            <Link
              href={{ pathname: secondaryLink }}
              className='min-w-[140px] h-[50px] flex items-center justify-center px-6 py-3 bg-surface border border-primary/30 hover:border-primary/60 text-text rounded-lg font-medium relative overflow-hidden group'
            >
              <span className='relative z-10'>{contactLabel}</span>
              <div className='absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
            </Link>
          </div>

          <div className='will-change-transform transition-transform duration-150 hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97]'>
            {useLinkedIn ? (
              <a
                href={linkedInUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='min-w-[140px] h-[50px] flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium relative overflow-hidden group'
              >
                <span className='relative z-10'>{linkedInLabel}</span>
                <div className='absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
              </a>
            ) : (
              <Link
                href={{ pathname: primaryLink }}
                className='min-w-[140px] h-[50px] flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium relative overflow-hidden group'
              >
                <span className='relative z-10'>{linkedInLabel}</span>
                <div className='absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default CTASection;
