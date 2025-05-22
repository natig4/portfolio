"use client";

import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "../../Theme/ThemeToggle";
import LocaleSwitcher from "../../LocaleSwitcher/LocaleSwitcher";
import { useDirection } from "@/hooks/useDirection";
import { useRef, useEffect, useCallback } from "react";

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

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, [menuOpen]);

  const safeToggleMenu = useCallback(
    (event?: React.MouseEvent) => {
      if (event) {
        event.stopPropagation();
      }

      if (!isMountedRef.current) {
        return;
      }

      handleToggleMenu();
    },
    [handleToggleMenu]
  );

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.height = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
    };
  }, [menuOpen]);

  return (
    <nav className='z-40 flex flex-col items-start'>
      <button
        className='relative z-50 flex flex-col justify-center items-center w-10 h-10 bg-transparent border-0 cursor-pointer p-0'
        onClick={safeToggleMenu}
        aria-label='Toggle menu'
        aria-expanded={menuOpen}
        type='button'
      >
        <div className='w-8 h-9 relative flex justify-center items-center'>
          <span
            className={`absolute w-8 h-0.5 bg-primary rounded-sm transition-all duration-300 ${
              menuOpen
                ? "rotate-45 bg-primary translate-y-0"
                : "translate-y-[-10px]"
            }`}
          ></span>

          <span
            className={`absolute w-8 h-0.5 bg-primary rounded-sm transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>

          <span
            className={`absolute w-8 h-0.5 bg-primary rounded-sm transition-all duration-300 ${
              menuOpen
                ? "-rotate-45 bg-primary translate-y-0"
                : "translate-y-[10px]"
            }`}
          ></span>
        </div>
      </button>

      <AnimatePresence mode='wait'>
        {menuOpen && (
          <motion.aside
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='fixed top-0 left-0 w-full h-screen bg-black/50 backdrop-blur-sm z-40'
            onClick={(e) => {
              e.stopPropagation();
              if (isMountedRef.current) {
                safeToggleMenu();
              }
            }}
          >
            <motion.div
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
            >
              <div className='flex flex-col h-full overflow-hidden'>
                <div className='flex-1 overflow-y-auto overflow-x-hidden'>
                  <ul className='flex flex-col w-full pt-20 font-header min-h-0'>
                    {links.map((link, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.1 + index * 0.05,
                          duration: 0.2,
                        }}
                        className='w-full flex-shrink-0'
                      >
                        <div
                          className='px-6 py-4 text-text hover:text-primary hover:bg-primary/5 transition-colors duration-200 cursor-pointer'
                          onClick={(e) => {
                            e.stopPropagation();

                            if (isMountedRef.current) {
                              safeToggleMenu();
                            }
                          }}
                        >
                          {link}
                        </div>
                      </motion.div>
                    ))}
                  </ul>
                </div>

                <div className='flex-shrink-0 px-6 py-4 border-t border-border/30 bg-surface dark:bg-gray-900'>
                  <div className='flex flex-col space-y-4'>
                    <div className='flex items-center justify-between min-h-[48px]'>
                      <span className='text-text-secondary font-medium text-sm'>
                        {isRTL ? "שפה" : "Language"}
                      </span>
                      <div className='flex items-center h-12'>
                        <LocaleSwitcher isMobileView />
                      </div>
                    </div>

                    <div className='flex items-center justify-between min-h-[48px]'>
                      <span className='text-text-secondary font-medium text-sm'>
                        {isRTL ? "מצב כהה" : "Dark Mode"}
                      </span>
                      <div className='flex items-center'>
                        <ThemeToggle />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </nav>
  );
}
