"use client";

import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "../../Theme/ThemeToggle";
import LocaleSwitcher from "../../LocaleSwitcher/LocaleSwitcher";
import { useDirection } from "@/hooks/useDirection";
import { useRef, useEffect, useCallback } from "react";
import NavLink from "../../NavLink/NavLink";
import Image from "next/image";

interface MobileNavProps {
  links: React.JSX.Element[];
  menuOpen: boolean;
  handleToggleMenu: () => void;
}

export default function MobileNav({
  menuOpen,
  links,
  handleToggleMenu,
}: MobileNavProps) {
  const { isRTL, direction } = useDirection();
  const isMountedRef = useRef(true);
  const bodyStylesRef = useRef<{
    overflow: string;
    position: string;
    width: string;
    height: string;
  }>({
    overflow: "",
    position: "",
    width: "",
    height: "",
  });

  useEffect(() => {
    isMountedRef.current = true;

    // Store original body styles
    if (typeof window !== "undefined" && document.body) {
      bodyStylesRef.current = {
        overflow: document.body.style.overflow,
        position: document.body.style.position,
        width: document.body.style.width,
        height: document.body.style.height,
      };
    }

    return () => {
      isMountedRef.current = false;
      // Restore original body styles on unmount
      if (typeof window !== "undefined" && document.body) {
        const originalStyles = bodyStylesRef.current;
        document.body.style.overflow = originalStyles.overflow;
        document.body.style.position = originalStyles.position;
        document.body.style.width = originalStyles.width;
        document.body.style.height = originalStyles.height;
      }
    };
  }, []);

  const safeToggleMenu = useCallback(
    (event?: React.MouseEvent) => {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      if (!isMountedRef.current || typeof window === "undefined") {
        return;
      }

      handleToggleMenu();
    },
    [handleToggleMenu]
  );

  useEffect(() => {
    if (typeof window === "undefined" || !document.body) return;

    if (menuOpen && isMountedRef.current) {
      // Store current styles before changing
      bodyStylesRef.current = {
        overflow: document.body.style.overflow,
        position: document.body.style.position,
        width: document.body.style.width,
        height: document.body.style.height,
      };

      // Apply menu open styles
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.height = "100%";
    } else {
      // Restore original styles
      const originalStyles = bodyStylesRef.current;
      document.body.style.overflow = originalStyles.overflow;
      document.body.style.position = originalStyles.position;
      document.body.style.width = originalStyles.width;
      document.body.style.height = originalStyles.height;
    }

    // Cleanup function
    return () => {
      if (
        typeof window !== "undefined" &&
        document.body &&
        isMountedRef.current
      ) {
        const originalStyles = bodyStylesRef.current;
        document.body.style.overflow = originalStyles.overflow;
        document.body.style.position = originalStyles.position;
        document.body.style.width = originalStyles.width;
        document.body.style.height = originalStyles.height;
      }
    };
  }, [menuOpen]);

  const handleNavItemClick = useCallback(
    (e: React.MouseEvent | React.KeyboardEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (isMountedRef.current) {
        // Use requestAnimationFrame to ensure DOM updates are completed
        requestAnimationFrame(() => {
          if (isMountedRef.current) {
            safeToggleMenu();
          }
        });
      }
    },
    [safeToggleMenu]
  );

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isMountedRef.current) {
        safeToggleMenu();
      }
    },
    [safeToggleMenu]
  );

  if (typeof window === "undefined") {
    return null;
  }

  return (
    <nav
      className='z-40 flex flex-col items-start'
      role='navigation'
      aria-label='Mobile navigation'
    >
      <button
        className='relative z-50 flex flex-col justify-center items-center w-10 h-10 bg-transparent border-0 cursor-pointer p-0'
        onClick={safeToggleMenu}
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls='mobile-menu'
        type='button'
      >
        <div className='w-8 h-9 relative flex justify-center items-center'>
          <span
            className={`absolute w-8 h-0.5 bg-primary rounded-sm transition-all duration-300 ${
              menuOpen
                ? "rotate-45 bg-primary translate-y-0"
                : "translate-y-[-10px]"
            }`}
            aria-hidden='true'
          />

          <span
            className={`absolute w-8 h-0.5 bg-primary rounded-sm transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
            aria-hidden='true'
          />

          <span
            className={`absolute w-8 h-0.5 bg-primary rounded-sm transition-all duration-300 ${
              menuOpen
                ? "-rotate-45 bg-primary translate-y-0"
                : "translate-y-[10px]"
            }`}
            aria-hidden='true'
          />
        </div>
      </button>

      <AnimatePresence
        mode='wait'
        onExitComplete={() => {
          // Ensure body styles are restored when animation completes
          if (
            typeof window !== "undefined" &&
            document.body &&
            isMountedRef.current
          ) {
            const originalStyles = bodyStylesRef.current;
            document.body.style.overflow = originalStyles.overflow;
            document.body.style.position = originalStyles.position;
            document.body.style.width = originalStyles.width;
            document.body.style.height = originalStyles.height;
          }
        }}
      >
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='fixed top-0 left-0 w-full h-screen bg-black/50 backdrop-blur-sm z-40'
            onClick={handleOverlayClick}
            role='dialog'
            aria-modal='true'
            aria-labelledby='mobile-menu-title'
          >
            <motion.aside
              id='mobile-menu'
              initial={{ x: isRTL ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? "100%" : "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className={`w-80 max-w-[85vw] h-full bg-surface dark:bg-gray-900 shadow-lg flex flex-col fixed ${
                isRTL ? "right-0" : "left-0"
              } overflow-hidden`}
              onClick={(e) => e.stopPropagation()}
              dir={direction}
              style={{
                height: "100svh",
              }}
              role='navigation'
              aria-label='Main mobile navigation'
            >
              <div className='flex flex-col h-full overflow-hidden'>
                <header className='flex-shrink-0 px-3 py-4 border-b border-border/30 bg-surface dark:bg-gray-900'>
                  <h2 id='mobile-menu-title' className='sr-only'>
                    Mobile Navigation Menu
                  </h2>
                  <NavLink
                    href={{ pathname: "/" }}
                    className='flex items-center justify-center !no-underline hover:!no-underline'
                    aria-label='Nati Gurevich - Go to homepage'
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className='flex items-center gap-3 p-2 rounded-lg hover:bg-primary/5 transition-colors duration-200'
                      onClick={handleNavItemClick}
                    >
                      <Image
                        style={{ borderRadius: 8 }}
                        src='/icons/NgLogo.png'
                        alt='Nati Gurevich professional logo'
                        width={36}
                        height={36}
                        className='w-9 h-9 object-contain'
                        priority
                      />
                      <span className='text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
                        Nati Gurevich
                      </span>
                    </motion.div>
                  </NavLink>
                </header>

                <main className='flex-1 overflow-y-auto overflow-x-hidden'>
                  <ul
                    className='flex flex-col w-full pt-6 font-header min-h-0'
                    role='list'
                  >
                    <motion.div
                      key='home-link'
                      initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: isRTL ? 10 : -10 }}
                      transition={{
                        delay: 0.1,
                        duration: 0.2,
                      }}
                      className='w-full flex-shrink-0'
                      role='listitem'
                    >
                      <div
                        className='px-6 py-4 text-text hover:text-primary hover:bg-primary/5 transition-colors duration-200 cursor-pointer'
                        onClick={handleNavItemClick}
                        role='button'
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            handleNavItemClick(e);
                          }
                        }}
                        aria-label='Navigate to home page'
                      >
                        <NavLink href={{ pathname: "/" }} className='block'>
                          {isRTL ? "בית" : "Home"}
                        </NavLink>
                      </div>
                    </motion.div>

                    {links.map((link, index) => (
                      <motion.div
                        key={`nav-link-${index}`}
                        initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: isRTL ? 10 : -10 }}
                        transition={{
                          delay: 0.1 + (index + 1) * 0.05,
                          duration: 0.2,
                        }}
                        className='w-full flex-shrink-0'
                        role='listitem'
                      >
                        <div
                          className='px-6 py-4 text-text hover:text-primary hover:bg-primary/5 transition-colors duration-200 cursor-pointer'
                          onClick={handleNavItemClick}
                          role='button'
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              handleNavItemClick(e);
                            }
                          }}
                        >
                          {link}
                        </div>
                      </motion.div>
                    ))}
                  </ul>
                </main>

                <footer className='flex-shrink-0 px-6 py-4 border-t border-border/30 bg-surface dark:bg-gray-900'>
                  <fieldset className='flex flex-col space-y-4'>
                    <legend className='sr-only'>Site preferences</legend>

                    <div className='flex items-center justify-between min-h-[48px]'>
                      <label
                        htmlFor='language-switcher'
                        className='text-text-secondary font-medium text-sm'
                      >
                        {isRTL ? "שפה" : "Language"}
                      </label>
                      <div
                        id='language-switcher'
                        className='flex items-center h-12'
                        role='group'
                        aria-label='Language selection'
                      >
                        <LocaleSwitcher isMobileView />
                      </div>
                    </div>

                    <div className='flex items-center justify-between min-h-[48px]'>
                      <label
                        htmlFor='theme-toggle'
                        className='text-text-secondary font-medium text-sm'
                      >
                        {isRTL ? "מצב כהה" : "Dark Mode"}
                      </label>
                      <div
                        id='theme-toggle'
                        className='flex items-center'
                        aria-label='Toggle dark mode'
                      >
                        <ThemeToggle />
                      </div>
                    </div>
                  </fieldset>
                </footer>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
