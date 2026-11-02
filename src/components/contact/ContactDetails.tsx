import { useTranslations } from "next-intl";
import type { IconType } from "react-icons";
import { LuLinkedin, LuMail, LuMapPin, LuPhone } from "react-icons/lu";
import { site } from "@/lib/site";

export default function ContactDetails() {
  const t = useTranslations("contact.details");

  const items: {
    icon: IconType;
    label: string;
    value: string;
    href?: string;
    external?: boolean;
    ltr?: boolean;
  }[] = [
    {
      icon: LuMail,
      label: t("email"),
      value: site.email,
      href: `mailto:${site.email}`,
      ltr: true,
    },
    {
      icon: LuPhone,
      label: t("phone"),
      value: site.phone.display,
      href: site.phone.href,
      ltr: true,
    },
    {
      icon: LuLinkedin,
      label: t("linkedin"),
      value: site.socials.linkedin.replace(/^https:\/\/www\./, ""),
      href: site.socials.linkedin,
      external: true,
      ltr: true,
    },
    {
      icon: LuMapPin,
      label: t("location"),
      value: t("locationValue"),
      href: site.mapsUrl,
      external: true,
    },
  ];

  return (
    <section aria-labelledby='contact-details-title'>
      <h2
        id='contact-details-title'
        className='text-xl font-semibold tracking-tight'
      >
        {t("title")}
      </h2>
      <ul className='mt-6 space-y-3'>
        {items.map(({ icon: Icon, label, value, href, external, ltr }) => (
          <li key={label}>
            <a
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className='flex items-start gap-4 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent/40'
            >
              <span className='inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent'>
                <Icon className='size-5' aria-hidden='true' />
              </span>
              <span className='min-w-0'>
                <span className='block text-sm text-muted-foreground'>
                  {label}
                </span>
                <span className='block font-medium break-words'>
                  {ltr ? <bdi dir='ltr'>{value}</bdi> : value}
                </span>
                {external && <span className='sr-only'>{t("newTab")}</span>}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
