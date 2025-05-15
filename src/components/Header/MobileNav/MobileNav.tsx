"use client";

import { AnimatePresence, motion } from "framer-motion";

interface HeaderProps {
  links: React.JSX.Element[];
  menuOpen: boolean;
  handleToggleMenu: () => void;
}

export default function MobileNav({
  menuOpen,
  links,
  handleToggleMenu,
}: HeaderProps) {
  return (
    <nav className='z-40 flex flex-col items-start'>
      <button
        className='relative z-50 flex flex-col justify-center items-center w-10 h-10 bg-transparent border-0 cursor-pointer p-0'
        onClick={(e) => {
          e.stopPropagation();
          handleToggleMenu();
        }}
        aria-label='Toggle menu'
        aria-expanded={menuOpen}
      >
        <div className='w-8 h-9 relative flex justify-center items-center'>
          <span
            className={`absolute w-8 h-0.5 bg-white rounded-sm transition-all duration-300 ${
              menuOpen
                ? "rotate-45 bg-primary-500 translate-y-0"
                : "translate-y-[-14px]"
            }`}
          ></span>

          <span
            className={`absolute w-8 h-0.5 bg-white rounded-sm transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>

          <span
            className={`absolute w-8 h-0.5 bg-white rounded-sm transition-all duration-300 ${
              menuOpen
                ? "-rotate-45 bg-primary-500 translate-y-0"
                : "translate-y-[14px]"
            }`}
          ></span>
        </div>
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='fixed top-0 left-0 w-full h-screen bg-black/50 backdrop-blur-sm z-40'
            onClick={handleToggleMenu}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className='w-64 h-full bg-gray-800/95 shadow-lg'
              onClick={(e) => e.stopPropagation()}
            >
              <ul className='flex flex-col w-full h-full pt-20 font-header'>
                {links.map((link, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.1 + index * 0.1,
                      duration: 0.3,
                    }}
                  >
                    {link}
                  </motion.div>
                ))}
              </ul>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </nav>
  );
}
