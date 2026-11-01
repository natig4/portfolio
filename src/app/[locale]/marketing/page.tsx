import { getTranslations, setRequestLocale } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import MarketingSection from "@/components/sections/Marketing";
import CTASection from "@/components/CTASection/CTASection";

export default async function MarketingPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("common");

  return (
    <div className='min-h-screen p-4 relative overflow-hidden'>
      <MarketingSection />

      <div className='mt-16'>
        <CTASection
          linkedInLabel={t("buttons.viewProjects")}
          contactLabel={t("buttons.getInTouch")}
          primaryLink='/projects'
          secondaryLink='/contact'
          titleKey='marketingTitle'
        />
      </div>
    </div>
  );
}
