"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "@/i18n/routing";
import NavLink from "../NavLink/NavLink";
import MobileNav from "./MobileNav/MobileNav";
import DesktopNav from "./DesktopNav/DesktopNav";
import LocaleSwitcher from "../LocaleSwitcher/LocaleSwitcher";
import ThemeToggle from "../Theme/ThemeToggle";
import { getRoute } from "@/lib/utils/utils";
import { useDirection } from "@/hooks/useDirection";

interface HeaderProps {
  links: {
    home: string;
    about: string;
    projects: string;
    experience: string;
    articles: string;
    contact: string;
    marketing: string;
  };
  isMobile: boolean;
}

export default function Header({
  links: { home, about, projects, experience, articles, contact, marketing }, // Added marketing
  isMobile,
}: HeaderProps) {
  const { scrollY } = useScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const path = usePathname();
  const { isRTL, direction } = useDirection();
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const safeSetMenuOpen = useCallback((value: boolean) => {
    if (isMounted.current) {
      setMenuOpen(value);
    }
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (isMounted.current) {
      safeSetMenuOpen(false);
    }
  }, [path, safeSetMenuOpen]);

  const navLinks = [
    getRoute({ pathname: "/" }, home),
    getRoute({ pathname: "/projects" }, projects),
    getRoute({ pathname: "/experience" }, experience),
    getRoute({ pathname: "/articles" }, articles),
    getRoute({ pathname: "/marketing" }, marketing), // Added marketing link
    getRoute({ pathname: "/about" }, about),
    getRoute({ pathname: "/contact" }, contact),
  ].map(({ href, name }, index, array) => (
    <li
      key={name}
      className='relative mx-3 md:mx-4'
      onClick={(ev) => {
        if (isMobile) {
          ev.stopPropagation();
          safeSetMenuOpen(false);
        }
      }}
    >
      <NavLink href={href} className='block py-2 px-1'>
        {name}
      </NavLink>

      {index < array.length - 1 && (
        <span className='absolute top-1/2 -translate-y-1/2 right-[-1rem] w-px h-3/5 bg-gradient-to-b from-primary/30 to-secondary/30 rtl:right-auto rtl:left-[-1rem]'></span>
      )}
    </li>
  ));

  const opacity = useTransform(scrollY, [0, 60], [0.95, 0.8]);

  const handleToggleMenu = useCallback(() => {
    if (isMounted.current) {
      safeSetMenuOpen(!menuOpen);
    }
  }, [safeSetMenuOpen, menuOpen]);

  return (
    <motion.header
      style={{ opacity }}
      className={`fixed top-0 left-0 right-0 flex flex-row justify-between items-center z-30 text-text px-4 md:px-6 w-full max-w-[100vw] border-b border-border/10 ${
        isMobile ? "h-16" : "h-16"
      }`}
      dir={direction}
    >
      <div className='absolute inset-0 bg-surface/80 dark:bg-surface/60 backdrop-blur-[8px] transition-[backdrop-filter] duration-300' />

      <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent' />

      {isMobile ? (
        <div className='w-full flex justify-between items-center relative z-10'>
          <div className={`flex items-center ${isRTL ? "order-2" : "order-1"}`}>
            <MobileNav
              menuOpen={menuOpen}
              handleToggleMenu={handleToggleMenu}
              links={navLinks}
            />
          </div>
        </div>
      ) : (
        <div className='relative z-10 flex justify-between items-center w-full'>
          <DesktopNav links={navLinks} />
          <div className='flex items-center space-x-6 rtl:space-x-reverse'>
            <ThemeToggle />
            <LocaleSwitcher isMobileView={false} />
          </div>
        </div>
      )}

      <div className='absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none' />
    </motion.header>
  );
}
