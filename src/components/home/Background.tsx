import { useTranslations } from "next-intl";
import { LuArrowRight } from "react-icons/lu";
import { experience } from "@/data/experience";
import { site, yearsSince } from "@/lib/site";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import { ButtonLink } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

/** Short career summary on the home page; the full timeline is on /about. */
export default function Background() {
  const t = useTranslations("home.background");
  const roles = useTranslations("about.experience");

  return (
    <section aria-labelledby='background-title' className='py-16 sm:py-24'>
      <Container className='grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20'>
        <div>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2
            id='background-title'
            className='mt-3 text-3xl font-semibold tracking-tight sm:text-4xl'
          >
            {t("title")}
          </h2>
          <p className='mt-4 text-lg leading-relaxed text-muted-foreground'>
            {t("description", { years: yearsSince(site.careerStartYear) })}
          </p>
          <ButtonLink
            href={{ pathname: "/about", hash: "experience" }}
            variant='secondary'
            className='mt-8'
          >
            {t("cta")}
            <LuArrowRight
              className='size-4 rtl:-scale-x-100'
              aria-hidden='true'
            />
          </ButtonLink>
        </div>

        <Reveal>
          <ol className='divide-y divide-border rounded-2xl border border-border bg-surface'>
            {experience.slice(0, 4).map((role) => (
              <li
                key={role.id}
                className='flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-6 py-5'
              >
                <span>
                  <span className='block font-semibold'>
                    {roles(`items.${role.id}.company`)}
                  </span>
                  <span className='block text-sm text-muted-foreground'>
                    {roles(`items.${role.id}.role`)}
                  </span>
                </span>
                <span className='font-mono text-sm text-muted-foreground'>
                  {role.start} – {"end" in role ? role.end : roles("present")}
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
