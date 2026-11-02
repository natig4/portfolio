import { useTranslations } from "next-intl";
import { LuArrowRight } from "react-icons/lu";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import { ButtonLink } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import DualProfile from "@/components/shared/DualProfile";

/** Who runs the studio, in short; the full story is on /about. */
export default function Founder() {
  const t = useTranslations("home.founder");

  return (
    <section aria-labelledby='founder-title' className='py-20 sm:py-28'>
      <Container className='grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16'>
        <Reveal variant='start'>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2
            id='founder-title'
            className='mt-4 text-3xl leading-[1.1] font-bold tracking-tight sm:text-4xl lg:text-[2.75rem]'
          >
            {t("title")}
          </h2>
          <p className='mt-5 text-lg leading-relaxed text-muted-foreground'>
            {t("description")}
          </p>
          <ButtonLink href='/about' variant='secondary' className='mt-8'>
            {t("cta")}
            <LuArrowRight
              className='size-4 transition-transform group-hover/button:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover/button:-translate-x-0.5'
              aria-hidden='true'
            />
          </ButtonLink>
        </Reveal>

        <Reveal variant='end'>
          <DualProfile />
        </Reveal>
      </Container>
    </section>
  );
}
