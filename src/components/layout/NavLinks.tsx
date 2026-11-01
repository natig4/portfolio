"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { Link, type Href } from "@/i18n/routing";

export type NavItem = {
  href: Href;
  label: string;
  /** First path segment under /[locale] this item owns ("" for home). */
  segment: string;
};

const variants = {
  desktop: {
    list: "flex items-center gap-1",
    link: "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
    active:
      "text-foreground after:absolute after:inset-x-3 after:-bottom-[13px] after:h-0.5 after:rounded-full after:bg-accent",
    idle: "text-muted-foreground hover:text-foreground",
  },
  mobile: {
    list: "flex flex-col gap-1",
    link: "block rounded-lg px-4 py-3 text-lg font-medium transition-colors",
    active: "bg-muted text-foreground",
    idle: "text-muted-foreground hover:bg-muted hover:text-foreground",
  },
} as const;

export default function NavLinks({
  items,
  variant,
  onNavigate,
}: {
  items: NavItem[];
  variant: keyof typeof variants;
  onNavigate?: () => void;
}) {
  const segment = useSelectedLayoutSegment() ?? "";
  const styles = variants[variant];

  return (
    <ul className={styles.list}>
      {items.map((item) => {
        const isActive = item.segment === segment;
        return (
          <li key={item.segment}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              className={`${styles.link} ${isActive ? styles.active : styles.idle}`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
