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
import Image from "next/image";

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
  links: { about, projects, experience, articles, contact, marketing },
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
    if (isMounted.current && typeof window !== "undefined") {
      setMenuOpen(value);
    }
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        if (isMounted.current) {
          safeSetMenuOpen(false);
        }
      });
    }
  }, [path, safeSetMenuOpen]);

  const navLinks = [
    getRoute({ pathname: "/projects" }, projects),
    getRoute({ pathname: "/experience" }, experience),
    getRoute({ pathname: "/articles" }, articles),
    getRoute({ pathname: "/marketing" }, marketing),
    getRoute({ pathname: "/about" }, about),
    getRoute({ pathname: "/contact" }, contact),
  ].map(({ href, name }, index, array) => (
    <li
      key={name}
      onClick={(ev) => {
        if (isMobile) {
          ev.stopPropagation();
          safeSetMenuOpen(false);
        }
      }}
    >
      <NavLink
        href={href}
        className={isMobile ? "" : "block py-2 px-1"}
        aria-label={`Navigate to ${name} page`}
      >
        {name}
      </NavLink>

      {index < array.length - 1 && (
        <span
          className='absolute top-1/2 -translate-y-1/2 right-[-1rem] w-px h-3/5 bg-gradient-to-b from-primary/30 to-secondary/30 rtl:right-auto rtl:left-[-1rem]'
          aria-hidden='true'
        />
      )}
    </li>
  ));

  const opacity = useTransform(scrollY, [0, 60], [0.95, 0.8]);

  const handleToggleMenu = useCallback(() => {
    if (isMounted.current && typeof window !== "undefined") {
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
      role='banner'
      aria-label='Main navigation'
    >
      <div
        className='absolute inset-0 bg-surface/80 dark:bg-surface/60 backdrop-blur-[8px] transition-[backdrop-filter] duration-300'
        aria-hidden='true'
      />

      <div
        className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent'
        aria-hidden='true'
      />

      {isMobile ? (
        <div
          className={`w-full flex justify-between items-center relative z-10 ${
            !isRTL ? "flex-row-reverse" : ""
          }`}
        >
          <div className={`flex items-center ${isRTL ? "order-3" : "order-1"}`}>
            <MobileNav
              menuOpen={menuOpen}
              handleToggleMenu={handleToggleMenu}
              links={navLinks}
            />
          </div>

          <div className='order-2 flex-1 flex justify-center'>
            <NavLink
              href={{ pathname: "/" }}
              className='flex items-center !no-underline hover:!no-underline'
              aria-label='Nati Gurevich - Go to homepage'
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='flex items-center justify-center p-2 rounded-lg hover:bg-primary/5 transition-colors duration-200'
              >
                <Image
                  src='/icons/NgLogo.png'
                  alt='Nati Gurevich professional logo'
                  width={40}
                  height={40}
                  className='w-10 h-10 object-contain'
                  priority
                />
              </motion.div>
            </NavLink>
          </div>

          <div
            className={`w-10 ${isRTL ? "order-1" : "order-3"}`}
            aria-hidden='true'
          />
        </div>
      ) : (
        <div className='relative z-10 flex justify-between items-center w-full'>
          <div className='flex items-center'>
            <NavLink
              href={{ pathname: "/" }}
              className='flex items-center !no-underline hover:!no-underline'
              aria-label='Nati Gurevich - Go to homepage'
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='flex items-center justify-center mr-8 rtl:mr-0 rtl:ml-8 p-2 rounded-lg hover:bg-primary/5 transition-colors duration-200'
              >
                <Image
                  src='/icons/NgLogo.png'
                  alt='Nati Gurevich professional logo'
                  width={44}
                  height={44}
                  className='w-11 h-11 object-contain'
                  priority
                />
              </motion.div>
            </NavLink>
          </div>

          <DesktopNav links={navLinks} />

          <div
            className='flex items-center space-x-6 rtl:space-x-reverse'
            role='toolbar'
            aria-label='Site preferences'
          >
            <ThemeToggle />
            <LocaleSwitcher isMobileView={false} />
          </div>
        </div>
      )}

      <div
        className='absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none'
        aria-hidden='true'
      />
    </motion.header>
  );
}
