import { getTranslations } from "next-intl/server";
import { FaFacebook, FaGithub, FaLinkedin, FaMedium } from "react-icons/fa";
import { Link, type Href } from "@/i18n/routing";
import Logo from "@/components/ui/Logo";
import { site } from "@/lib/site";

const socials = [
  { href: site.socials.linkedin, label: "LinkedIn", Icon: FaLinkedin },
  { href: site.socials.github, label: "GitHub", Icon: FaGithub },
  { href: site.socials.medium, label: "Medium", Icon: FaMedium },
  { href: site.socials.facebook, label: "Facebook", Icon: FaFacebook },
];

export default async function SiteFooter() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");

  const explore: { href: Href; label: string }[] = [
    { href: "/projects", label: nav("work") },
    { href: "/about", label: nav("about") },
    { href: "/marketing", label: nav("marketing") },
    { href: "/articles", label: nav("articles") },
    { href: "/contact", label: nav("contact") },
  ];
  const legal: { href: Href; label: string }[] = [
    { href: "/accessibility", label: t("accessibility") },
    { href: "/privacy", label: t("privacy") },
    { href: "/terms", label: t("terms") },
  ];

  const linkClass =
    "text-sm text-muted-foreground transition-colors hover:text-foreground";

  return (
    <footer className='border-t border-border bg-surface'>
      <div className='mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]'>
        <div className='max-w-sm'>
          <div className='flex items-center gap-3'>
            <Logo className='h-7 w-auto text-foreground' />
            <span className='font-semibold'>{site.company}</span>
          </div>
          <p className='mt-4 text-sm leading-relaxed text-muted-foreground'>
            {t("tagline")}
          </p>
          <p className='mt-3 text-sm text-muted-foreground'>
            {site.name} · {nav("role")}
          </p>
        </div>

        <nav aria-labelledby='footer-explore'>
          <h2 id='footer-explore' className='text-sm font-semibold'>
            {t("explore")}
          </h2>
          <ul className='mt-4 space-y-2.5'>
            {explore.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby='footer-legal'>
          <h2 id='footer-legal' className='text-sm font-semibold'>
            {t("legal")}
          </h2>
          <ul className='mt-4 space-y-2.5'>
            {legal.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className='text-sm font-semibold'>{t("connect")}</h2>
          <ul className='mt-4 space-y-2.5'>
            <li>
              <a href={`mailto:${site.email}`} className={linkClass} dir='ltr'>
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.phone.href} className={linkClass} dir='ltr'>
                {site.phone.display}
              </a>
            </li>
          </ul>
          <ul className='mt-4 flex gap-1'>
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={`${label} ${t("newTab")}`}
                  className='inline-flex size-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground'
                >
                  <Icon className='size-[18px]' aria-hidden='true' />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='border-t border-border'>
        <p className='mx-auto max-w-6xl px-4 py-5 text-xs text-muted-foreground sm:px-6'>
          © {new Date().getFullYear()} {site.company} · {site.name}.{" "}
          {t("rights")}
        </p>
      </div>
    </footer>
  );
}
