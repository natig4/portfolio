import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Logo from "@/components/ui/Logo";
import { site } from "@/lib/site";
import NavLinks, { type NavItem } from "./NavLinks";
import LocaleSwitcher from "./LocaleSwitcher";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";

export default async function SiteHeader() {
  const t = await getTranslations("nav");

  const items: NavItem[] = [
    { href: "/projects", label: t("work"), segment: "projects" },
    { href: "/about", label: t("about"), segment: "about" },
    { href: "/marketing", label: t("marketing"), segment: "marketing" },
    { href: "/articles", label: t("articles"), segment: "articles" },
    { href: "/contact", label: t("contact"), segment: "contact" },
  ];

  return (
    <header className='sticky top-0 z-40 h-(--header-height) border-b border-border bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70'>
      <div className='mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6'>
        <Link
          href='/'
          aria-label={t("homeLabel")}
          className='flex items-center gap-3 rounded-md'
        >
          <Logo className='h-7 w-auto text-foreground' />
          <span className='flex flex-col leading-tight'>
            <span className='text-sm font-semibold text-foreground'>
              {site.name}
            </span>
            <span className='font-mono text-[11px] text-muted-foreground ltr:tracking-wide'>
              {site.company}
            </span>
          </span>
        </Link>

        <nav aria-label={t("primary")} className='hidden lg:block'>
          <NavLinks items={items} variant='desktop' />
        </nav>

        <div className='flex items-center gap-1'>
          <LocaleSwitcher />
          <ThemeToggle label={t("toggleTheme")} />
          <Link
            href='/contact'
            className='ms-2 hidden h-10 items-center rounded-md bg-accent px-4 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover lg:inline-flex'
          >
            {t("startProject")}
          </Link>
          <MobileMenu
            items={items}
            buttonClassName='lg:hidden'
            labels={{
              open: t("openMenu"),
              close: t("closeMenu"),
              startProject: t("startProject"),
              primary: t("primary"),
            }}
          />
        </div>
      </div>
    </header>
  );
}
