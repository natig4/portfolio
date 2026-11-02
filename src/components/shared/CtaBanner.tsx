import { useTranslations } from "next-intl";
import { LuArrowRight } from "react-icons/lu";
import Container from "@/components/ui/Container";
import Aurora from "@/components/ui/Aurora";
import { ButtonLink } from "@/components/ui/Button";

export default function CtaBanner({ showWork = true }: { showWork?: boolean }) {
  const t = useTranslations("cta");

  return (
    <section aria-labelledby='cta-title' className='py-20 sm:py-28'>
      <Container>
        <div className='section-ink relative overflow-hidden rounded-3xl px-6 py-14 sm:px-14 sm:py-20'>
          <Aurora />
          <div
            className='bg-grid pointer-events-none absolute inset-0 opacity-40'
            aria-hidden='true'
          />
          <div className='relative max-w-2xl'>
            <h2
              id='cta-title'
              className='text-3xl leading-[1.1] font-bold tracking-tight sm:text-5xl'
            >
              {t("title")}
            </h2>
            <p className='mt-5 text-lg leading-relaxed text-muted-foreground'>
              {t("description")}
            </p>
            <div className='mt-9 flex flex-wrap gap-3'>
              <ButtonLink href='/contact' size='lg' variant='brand'>
                {t("primary")}
                <LuArrowRight
                  className='size-4 transition-transform group-hover/button:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover/button:-translate-x-0.5'
                  aria-hidden='true'
                />
              </ButtonLink>
              {showWork && (
                <ButtonLink href='/marketing' size='lg' variant='secondary'>
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
