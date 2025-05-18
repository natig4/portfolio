import { useTranslations } from "next-intl";
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import SocialIcon from "../SocialIcon/SocialIcon";
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
      className='text-gray-300 hover:text-text transition-colors text-sm md:text-base'
    >
      {name}
    </NavLink>
  ));

  const icons = [
    { href: "https://www.facebook.com/nati.gurevich.3", icon: FaFacebook },
    {
      href: "https://www.linkedin.com/in/nati-gurevich-36868711b",
      icon: FaLinkedin,
    },
    { href: "https://github.com/natig4", icon: FaGithub },
  ].map(({ href, icon: Icon }) => (
    <SocialIcon key={href} href={href} Icon={Icon} size={isMobile ? 20 : 24} />
  ));

  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gray-800 text-text py-4 md:py-6 transition-colors duration-300 w-full mt-auto'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col items-center md:flex-row md:justify-between'>
          <div className='flex gap-4 mb-4 md:mb-0 order-1 md:order-1'>
            {icons}
          </div>

          <div className='flex flex-wrap justify-center gap-3 md:gap-6 mb-4 md:mb-0 order-2 md:order-2'>
            {links}
          </div>
        </div>

        <div className='text-center text-gray-400 text-xs mt-4 pt-3 border-t border-gray-700'>
          <p>
            © {currentYear} {t("createdBy")}. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
