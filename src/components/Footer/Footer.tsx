import { useTranslations } from "next-intl";
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import SocialIcon from "../SocialIcon/SocialIcon";
import NavLink from "../NavLink/NavLink";
import { getRoute } from "@/lib/utils/utils";

export default function Footer() {
  const t = useTranslations("links");

  const links = [
    getRoute({ pathname: "/terms" }, t("terms")),
    getRoute({ pathname: "/privacy" }, t("privacy")),
    getRoute({ pathname: "/accessibility" }, t("accessibility")),
  ].map(({ href, name }) => (
    <NavLink
      key={name}
      href={href}
      className='text-gray-300 hover:text-white transition-colors'
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
    <SocialIcon key={href} href={href} Icon={Icon} size={24} />
  ));

  return (
    <footer className='bg-gray-800 text-white py-6 dark:bg-gray-900 transition-colors duration-300 w-full mt-auto'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='mb-4 md:mb-0'>
            <h3 className='text-xl font-bold text-white'>Nati Gurevich</h3>
            <p className='text-gray-400 text-sm mt-1'>
              Full-Stack Software Engineer
            </p>
          </div>

          <div className='flex flex-col md:flex-row gap-6 items-center'>
            <div className='flex gap-4'>{icons}</div>
            <div className='flex gap-6'>{links}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
