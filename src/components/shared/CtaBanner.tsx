import { useTranslations } from "next-intl";
import { LuArrowRight } from "react-icons/lu";
import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function CtaBanner({ showWork = true }: { showWork?: boolean }) {
  const t = useTranslations("cta");

  return (
    <section aria-labelledby='cta-title' className='py-16 sm:py-24'>
      <Container>
        <div className='relative overflow-hidden rounded-2xl bg-zinc-950 px-6 py-12 text-zinc-50 sm:px-12 sm:py-16 dark:border dark:border-border dark:bg-surface'>
          <div
            className='pointer-events-none absolute -top-24 end-0 size-80 rounded-full bg-brand-cyan/20 blur-3xl'
            aria-hidden='true'
          />
          <div className='relative max-w-2xl'>
            <h2
              id='cta-title'
              className='text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl'
            >
              {t("title")}
            </h2>
            <p className='mt-4 text-lg leading-relaxed text-zinc-300'>
              {t("description")}
            </p>
            <div className='mt-8 flex flex-wrap gap-3'>
              <ButtonLink href='/contact' size='lg' variant='onDark'>
                {t("primary")}
                <LuArrowRight
                  className='size-4 rtl:-scale-x-100'
                  aria-hidden='true'
                />
              </ButtonLink>
              {showWork && (
                <ButtonLink href='/projects' size='lg' variant='ghostOnDark'>
                  {t("secondary")}
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
