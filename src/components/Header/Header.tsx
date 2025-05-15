"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "@/i18n/routing";
import NavLink from "../NavLink/NavLink";
import MobileNav from "./MobileNav/MobileNav";
import DesktopNav from "./DesktopNav/DesktopNav";
import LocaleSwitcher from "../LocaleSwitcher/LocaleSwitcher";
import { getRoute } from "@/lib/utils/utils";

interface HeaderProps {
  links: {
    home: string;
    about: string;
  };
  isMobile: boolean;
}

export default function Header({
  links: { home, about },
  isMobile,
}: HeaderProps) {
  const { scrollY } = useScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const path = usePathname();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [path]);

  const navLinks = [
    getRoute({ pathname: "/" }, home),
    getRoute({ pathname: "/about" }, about),
  ].map(({ href, name }, index, array) => (
    <li
      key={name}
      className='relative mx-3 md:mx-4 transition-transform duration-200 hover:-translate-y-0.5'
      onClick={(ev) => {
        if (isMobile) {
          ev.stopPropagation();
          setMenuOpen(false);
        }
      }}
    >
      <NavLink href={href} className='block py-2 px-1'>
        {name}
      </NavLink>

      {index < array.length - 1 && (
        <span className='absolute top-1/2 -translate-y-1/2 right-[-1rem] w-0.5 h-3/5 bg-white/50 rtl:right-auto rtl:left-[-1rem]'></span>
      )}
    </li>
  ));

  const opacity = useTransform(scrollY, [0, 60], [1, 0.9]);

  return (
    <motion.header
      style={{ opacity }}
      className='fixed top-0 w-full flex justify-between items-center z-30 text-white bg-gray-800/95 shadow-md transition-all duration-300 min-h-16 px-4 md:px-6'
    >
      {isMobile ? (
        <>
          <MobileNav
            menuOpen={menuOpen}
            handleToggleMenu={() => setMenuOpen(!menuOpen)}
            links={navLinks}
          />

          <div className='z-40'>
            <LocaleSwitcher />
          </div>
        </>
      ) : (
        <>
          <DesktopNav links={navLinks} />
          <LocaleSwitcher />
        </>
      )}
    </motion.header>
  );
}
