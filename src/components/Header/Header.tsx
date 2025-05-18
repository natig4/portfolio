"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "@/i18n/routing";
import NavLink from "../NavLink/NavLink";
import MobileNav from "./MobileNav/MobileNav";
import DesktopNav from "./DesktopNav/DesktopNav";
import LocaleSwitcher from "../LocaleSwitcher/LocaleSwitcher";
import ThemeToggle from "../Theme/ThemeToggle";
import { getRoute } from "@/lib/utils/utils";

interface HeaderProps {
  links: {
    home: string;
    about: string;
    projects: string;
    contact: string;
  };
  isMobile: boolean;
}

export default function Header({
  links: { home, about, projects, contact },
  isMobile,
}: HeaderProps) {
  const { scrollY } = useScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const path = usePathname();

  // Prevent body scroll when menu is open
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

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [path]);

  const navLinks = [
    getRoute({ pathname: "/" }, home),
    getRoute({ pathname: "/about" }, about),
    getRoute({ pathname: "/projects" }, projects),
    getRoute({ pathname: "/contact" }, contact),
  ].map(({ href, name }, index, array) => (
    <li
      key={name}
      className='relative mx-3 md:mx-4 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105'
      onClick={(ev) => {
        if (isMobile) {
          ev.stopPropagation();
          setMenuOpen(false);
        }
      }}
    >
      <NavLink href={href} className='block py-2 px-1 relative group'>
        <span className='relative z-10'>{name}</span>
        {/* Futuristic hover effect */}
        <span className='absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm' />
        <span className='absolute inset-0 rounded-lg border border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
      </NavLink>

      {index < array.length - 1 && (
        <span className='absolute top-1/2 -translate-y-1/2 right-[-1rem] w-0.5 h-3/5 bg-gradient-to-b from-primary/50 to-secondary/50 rtl:right-auto rtl:left-[-1rem]'></span>
      )}
    </li>
  ));

  const opacity = useTransform(scrollY, [0, 60], [0.95, 0.8]);
  const blur = useTransform(scrollY, [0, 60], [10, 20]);

  return (
    <motion.header
      style={{ opacity }}
      className={`fixed top-0 left-0 right-0 flex flex-col md:flex-row justify-between items-center z-30 text-text px-4 md:px-6 w-full max-w-[100vw] border-b border-border/20 ${
        isMobile ? "min-h-24 py-4" : "min-h-16"
      }`}
    >
      {/* Backdrop with futuristic glass effect */}
      <motion.div
        style={{ backdropFilter: `blur(${blur}px)` }}
        className='absolute inset-0 bg-surface/80 dark:bg-surface/60'
      />

      {/* Animated border effect */}
      <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-gradient-shift' />

      {/* Content */}
      {isMobile ? (
        <div className='w-full flex justify-between items-center relative z-10'>
          {/* Left side: Menu button */}
          <MobileNav
            menuOpen={menuOpen}
            handleToggleMenu={() => setMenuOpen(!menuOpen)}
            links={navLinks}
          />

          <div className='flex flex-col items-center space-y-2'>
            <div className='flex items-center justify-center'>
              <LocaleSwitcher />
            </div>
            <div className='flex items-center justify-center'>
              <ThemeToggle />
            </div>
          </div>
        </div>
      ) : (
        <div className='relative z-10 flex justify-between items-center w-full'>
          <DesktopNav links={navLinks} />
          <div className='flex items-center space-x-6'>
            <ThemeToggle />
            <LocaleSwitcher />
          </div>
        </div>
      )}

      {/* Ambient glow effect */}
      <div className='absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none' />
    </motion.header>
  );
}
