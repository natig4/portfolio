"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import NavLink from "../NavLink/NavLink";
import MobileNav from "./MobileNav/MobileNav";
import DesktopNav from "./DesktopNav/DesktopNav";
import LocaleSwitcher from "../LocaleSwitcher/LocaleSwitcher";
import { getRoute } from "@/lib/utils/utils";

import styles from "./Header.module.css";

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
  const router = useRouter();
  const path = usePathname();

  const links = [
    getRoute({ pathname: "/" }, home),
    getRoute({ pathname: "/about" }, about),
  ].map(({ href, name }) => (
    <li
      key={name}
      onClick={(ev) => {
        if (isMobile) {
          ev.stopPropagation();
          setMenuOpen(false);
        }
      }}
    >
      <NavLink href={href}>{name}</NavLink>
    </li>
  ));

  const isNotHomePage = path !== "/";

  const Logo = isNotHomePage && (
    <div
      onClick={() => router.push("/", { scroll: false })}
      className={styles.logoContainer}
    >
      <p>logo</p>
      {/* <Image
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        src={logoImg}
        fill
        priority
        alt={logoText}
      /> */}
    </div>
  );

  const opacity = useTransform(scrollY, [0, 60], [1, 0.8]);

  return (
    <motion.header
      style={{ opacity }}
      className={`${styles.header} ${isMobile ? styles.mobile : ""}`}
    >
      {isMobile ? (
        <MobileNav
          menuOpen={menuOpen}
          handleToggleMenu={() => setMenuOpen(!menuOpen)}
          links={links}
        />
      ) : (
        <DesktopNav links={links.slice(1)}>{Logo}</DesktopNav>
      )}
      {isNotHomePage && isMobile && Logo}
      <LocaleSwitcher />
    </motion.header>
  );
}
