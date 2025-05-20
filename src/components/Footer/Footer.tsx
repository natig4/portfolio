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
      className='text-text-secondary hover:text-primary text-sm md:text-base p-2'
    >
      {name}
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
    <footer className='bg-surface/80 backdrop-blur-lg border-t border-border/30 text-text py-4 transition-all duration-300 w-full mt-auto relative'>
      <div className='absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent' />

      <div className='container mx-auto px-4'>
        <div className='flex flex-col items-center md:flex-row md:justify-between'>
          <div className='flex gap-4 mb-6 md:mb-0 order-1 md:order-1'>
            {socialIcons.map(({ href, icon: Icon, label }) => (
              <a
                key={href}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                className='p-3 rounded-lg bg-surface/50 hover:bg-surface border border-border/30 text-text-secondary hover:text-primary transition-colors duration-300 group backdrop-blur-sm'
                aria-label={label}
              >
                <Icon size={isMobile ? 20 : 22} />
              </a>
            ))}
          </div>

          <div className='flex flex-wrap justify-center gap-2 mb-6 md:mb-0 order-2 md:order-2'>
            {links}
          </div>
        </div>

        <div className='text-center text-text-secondary text-xs md:text-sm border-t border-border/10'>
          <p className='flex items-center justify-center gap-2 flex-wrap'>
            <span>© {currentYear}</span>
            <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-semibold'>
              {t("createdBy")}
            </span>
            <span>{t("rights")}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
