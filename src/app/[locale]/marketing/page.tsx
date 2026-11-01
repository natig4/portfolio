import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { marketingCases } from "@/data/marketing";
import { pageMetadata } from "@/lib/metadata";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import MarketingCase from "@/components/marketing/MarketingCase";
import CtaBanner from "@/components/shared/CtaBanner";

type Props = { params: Promise<{ locale: AppLocale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "marketing.page" });

  return {
    title: t("title"),
    ...pageMetadata({
      locale,
      href: "/marketing",
      title: t("title"),
      description: t("description"),
    }),
  };
}

export default async function MarketingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("marketing.page");

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      <Container className='space-y-10 py-14 sm:py-20'>
        {marketingCases.map((data) => (
          <MarketingCase key={data.slug} data={data} />
        ))}
      </Container>
      <CtaBanner />
    </>
  );
}
