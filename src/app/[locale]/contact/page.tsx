import { getTranslations } from "next-intl/server";
import BackgroundEffects from "@/components/BackgroundEffects/BackgroundEffects";
import ContactSection from "@/components/sections/Contact";
import { EMAIL } from "@/lib/model/common";
import CTASection from "@/components/CTASection/CTASection";
import { cookies } from "next/headers";

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const isMobile = (await cookies()).get("isMobile")?.value === "true";

  const contactInfo = {
    title: t("title"),
    info: t("info"),
    email: {
      label: t("email"),
      value: EMAIL,
    },
    phone: {
      label: t("phone"),
      value: "054-4785120",
    },
    location: {
      label: t("location"),
      value: "Yasur, Northern District, Israel",
    },
    linkedin: {
      label: t("linkedin"),
      value: "linkedin.com/in/nati-gurevich-36868711b",
    },
    sendMessage: t("sendMessage"),
    form: {
      name: t("form.name"),
      namePlaceholder: t("form.namePlaceholder"),
      email: t("form.email"),
      emailPlaceholder: t("form.emailPlaceholder"),
      message: t("form.message"),
      messagePlaceholder: t("form.messagePlaceholder"),
      send: t("form.send"),
    },
  };

  return (
    <div
      className={`min-h-screen p-4 pt-${
        isMobile ? 16 : 0
      } relative overflow-hidden`}
    >
      <BackgroundEffects />
      <ContactSection contactInfo={contactInfo} />

      <div className='mt-16'>
        <CTASection
          title='Interested in seeing my work?'
          linkedInLabel='View Projects'
          contactLabel='View Experience'
          primaryLink='/projects'
          secondaryLink='/experience'
          showBackground={false}
          useLinkedIn={false}
        />
      </div>
    </div>
  );
}
