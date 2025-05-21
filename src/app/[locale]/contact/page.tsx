import { getTranslations } from "next-intl/server";
import BackgroundEffects from "@/components/BackgroundEffects/BackgroundEffects";
import ContactSection from "@/components/sections/Contact";
import { EMAIL } from "@/lib/model/common";
import CTASection from "@/components/CTASection/CTASection";
import { cookies } from "next/headers";

interface ContactInfoData {
  title: string;
  info: string;
  email: {
    label: string;
    value: string;
  };
  phone: {
    label: string;
    value: string;
  };
  location: {
    label: string;
    value: string;
  };
  linkedin: {
    label: string;
    value: string;
  };
  sendMessage: string;
  form: {
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    send: string;
  };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const commonT = await getTranslations("common");
  const isMobile = (await cookies()).get("isMobile")?.value === "true";

  // Get contact info from translations
  const contactInfo: ContactInfoData = {
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
          linkedInLabel={commonT("buttons.viewProjects")}
          contactLabel={commonT("buttons.viewExperience")}
          primaryLink='/projects'
          secondaryLink='/experience'
          showBackground={false}
          useLinkedIn={false}
          titleKey='contactTitle'
        />
      </div>
    </div>
  );
}
