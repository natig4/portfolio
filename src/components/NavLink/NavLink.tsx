"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { Link, Pathnames } from "@/i18n/routing";
import { motion } from "framer-motion";

interface NavLinkProps {
  href: { pathname: Pathnames; query?: Record<string, string | number> };
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  className = "",
  "aria-label": ariaLabel,
}) => {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : "/";
  const isActive = pathname === href.pathname;

  const isLogoLink =
    href.pathname === "/" && className.includes("!no-underline");

  return (
    <Link
      className={`relative inline-block transition-all duration-300 group ${className}`}
      href={href}
      aria-current={isActive && !isLogoLink ? "page" : undefined}
      aria-label={ariaLabel}
      role={isLogoLink ? "link" : undefined}
    >
      <span
        className={`relative z-10 transition-colors duration-300 ${
          isActive && !isLogoLink
            ? "text-primary"
            : "text-text-secondary hover:text-primary"
        }`}
        role={isLogoLink ? "img" : undefined}
        aria-label={isLogoLink ? "Nati Gurevich logo" : undefined}
      >
        {children}
      </span>

      {isActive && !isLogoLink && (
        <motion.div
          className='absolute bottom-[-4px] left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full'
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
          aria-hidden='true'
        />
      )}

      {!isLogoLink && (
        <div
          className='absolute inset-0 rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300'
          aria-hidden='true'
        >
          <div className='absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 transform scale-100' />
        </div>
      )}
    </Link>
  );
};

export default NavLink;
