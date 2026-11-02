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
    <header className='header-lift sticky top-0 z-40 h-(--header-height) border-b border-border/60 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/65'>
      <div className='mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6'>
        <Link
          href='/'
          aria-label={t("homeLabel")}
          className='flex items-center gap-3 rounded-md'
        >
          <Logo className='h-7 w-auto text-foreground' />
          <span className='flex flex-col leading-tight'>
            <span className='text-sm font-bold text-foreground'>
              {site.name}
            </span>
            <span className='text-[11px] font-medium text-muted-foreground ltr:tracking-wide'>
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
            className='shine ms-2 hidden h-10 items-center rounded-full bg-[linear-gradient(110deg,#7c3aed,#0e7490)] px-5 text-sm font-medium text-white shadow-[0_8px_24px_-12px_#7c3aed] transition-transform hover:-translate-y-0.5 lg:inline-flex'
          >
            {t("startProject")}
          </Link>
          <MobileMenu
            items={[{ href: "/", label: t("home"), segment: "" }, ...items]}
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
