"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { Link, Pathnames } from "@/i18n/routing";
import { motion } from "framer-motion";

interface NavLinkProps {
  href: { pathname: Pathnames; query?: Record<string, string | number> };
  children: React.ReactNode;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  className = "",
}) => {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : "/";
  const isActive = pathname === href.pathname;

  return (
    <Link
      className={`relative inline-block uppercase font-semibold transition-all duration-300 group ${className}`}
      href={href}
    >
      <span
        className={`relative z-10 transition-all duration-300 ${
          isActive ? "text-primary" : "text-text-secondary hover:text-primary"
        }`}
      >
        {children}
      </span>

      {isActive && (
        <motion.div
          className='absolute bottom-[-4px] left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full'
          layoutId='navbar-indicator'
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}

      <div className='absolute inset-0 overflow-hidden rounded-lg'>
        <div
          className={`absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 transition-all duration-300 transform ${
            isActive
              ? "opacity-30 scale-100"
              : "opacity-0 scale-75 group-hover:opacity-20 group-hover:scale-100"
          }`}
        />

        <div
          className={`absolute inset-0 border border-primary/30 rounded-lg transition-all duration-300 ${
            isActive ? "opacity-50" : "opacity-0 group-hover:opacity-30"
          }`}
        />

        <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
          <div className='absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700' />
        </div>
      </div>

      {isActive && (
        <motion.div
          className='absolute inset-0 bg-gradient-to-r from-primary/40 to-secondary/40 rounded-lg'
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </Link>
  );
};

export default NavLink;
