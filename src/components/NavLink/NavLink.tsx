"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { Link, Pathnames } from "@/i18n/routing";

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
      className={`uppercase ${
        isActive ? "text-primary-500" : "hover:text-primary-500"
      } transition-colors duration-200 ${className} ${
        isActive
          ? 'relative after:content-[""] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary-500 rtl:after:right-0 rtl:after:left-auto'
          : ""
      }`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default NavLink;
