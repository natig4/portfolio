import { useTranslations } from "next-intl";
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import NavLink from "../NavLink/NavLink";
import { getRoute } from "@/lib/utils/utils";

interface FooterProps {
  isMobile?: boolean;
}

export default function Footer({ isMobile = false }: FooterProps) {
  const t = useTranslations("links");

  const links = [
    getRoute({ pathname: "/terms" }, t("terms")),
    getRoute({ pathname: "/privacy" }, t("privacy")),
    getRoute({ pathname: "/accessibility" }, t("accessibility")),
  ].map(({ href, name }) => (
    <NavLink
      key={name}
      href={href}
      className='text-text-secondary hover:text-primary transition-all duration-300 text-sm md:text-base relative group'
    >
      <span className='relative z-10'>{name}</span>
      <span className='absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg' />
    </NavLink>
  ));

  const socialIcons = [
    {
      href: "https://www.facebook.com/nati.gurevich.3",
      icon: FaFacebook,
      label: "Facebook",
    },
    {
      href: "https://www.linkedin.com/in/nati-gurevich-36868711b",
      icon: FaLinkedin,
      label: "LinkedIn",
    },
    { href: "https://github.com/natig4", icon: FaGithub, label: "GitHub" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-surface/80 backdrop-blur-lg border-t border-border/30 text-text py-6 md:py-8 transition-all duration-300 w-full mt-auto relative overflow-hidden'>
      {/* Animated background elements */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent' />
        <div className='absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent' />

        {/* Subtle glow effects */}
        <div className='absolute top-1/2 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl transform -translate-y-1/2' />
        <div className='absolute top-1/2 right-1/4 w-32 h-32 bg-secondary/5 rounded-full blur-3xl transform -translate-y-1/2' />
      </div>

      <div className='container mx-auto px-4 relative z-10'>
        <div className='flex flex-col items-center md:flex-row md:justify-between'>
          {/* Social Icons with RTL support */}
          <div className='flex gap-4 mb-6 md:mb-0 order-1 md:order-1'>
            {socialIcons.map(({ href, icon: Icon, label }) => (
              <a
                key={href}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                className='p-3 rounded-lg bg-surface/50 hover:bg-surface border border-border/30 text-text-secondary hover:text-primary transition-all duration-300 hover:scale-110 hover:shadow-glow group backdrop-blur-sm cursor-pointer'
                aria-label={label}
              >
                <Icon
                  size={isMobile ? 20 : 24}
                  className='group-hover:drop-shadow-lg'
                />
              </a>
            ))}
          </div>

          {/* Navigation Links */}
          <div className='flex flex-wrap justify-center gap-6 md:gap-8 mb-6 md:mb-0 order-2 md:order-2'>
            {links}
          </div>
        </div>

        {/* Copyright with RTL support */}
        <div className='text-center text-text-secondary text-xs md:text-sm mt-6 pt-6 border-t border-border/20 relative'>
          <div className='absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-px bg-gradient-to-r from-primary to-secondary' />

          <p className='relative flex items-center justify-center gap-2 flex-wrap'>
            <span>© {currentYear}</span>
            <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-semibold'>
              {t("createdBy")}
            </span>
            <span>{t("rights")}</span>
          </p>

          {/* Subtle pulse effect */}
          <div className='absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300' />
        </div>
      </div>
    </footer>
  );
}
