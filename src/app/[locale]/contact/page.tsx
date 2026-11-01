import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import ContactForm, {
  type ContactFormLabels,
} from "@/components/contact/ContactForm";
import ContactDetails from "@/components/contact/ContactDetails";

type Props = { params: Promise<{ locale: AppLocale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.page" });

  return {
    title: t("eyebrow"),
    ...pageMetadata({
      locale,
      href: "/contact",
      title: t("eyebrow"),
      description: t("description"),
    }),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  // Labels are passed as props so the client bundle needs no message catalog.
  const keys = [
    "title",
    "name",
    "email",
    "company",
    "optional",
    "message",
    "namePlaceholder",
    "emailPlaceholder",
    "companyPlaceholder",
    "messagePlaceholder",
    "send",
    "note",
    "bodyName",
    "bodyEmail",
    "bodyCompany",
  ] as const;
  const labels = {
    ...Object.fromEntries(keys.map((key) => [key, t(`form.${key}`)])),
    opened: t("form.opened", { email: site.email }),
    subject: t.raw("form.subject") as string,
  } as ContactFormLabels;

  return (
    <>
      <PageHeader
        eyebrow={t("page.eyebrow")}
        title={t("page.title")}
        description={t("page.description")}
      />
      <Container className='grid gap-12 py-14 sm:py-20 lg:grid-cols-[1.5fr_1fr] lg:gap-16'>
        <ContactForm to={site.email} labels={labels} />
        <ContactDetails />
      </Container>
    </>
  );
}
