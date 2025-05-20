import { getTranslations } from "next-intl/server";
import BackgroundEffects from "@/components/BackgroundEffects/BackgroundEffects";
import ContactSection from "@/components/sections/Contact";

export default async function ContactPage() {
  const t = await getTranslations("contact");

  const contactInfo = {
    title: t("title"),
    info: t("info"),
    email: {
      label: t("email"),
      value: "nati_g4@hotmail.com",
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
    <div className='min-h-screen p-4 py-16 relative overflow-hidden'>
      <BackgroundEffects />
      <ContactSection contactInfo={contactInfo} />
    </div>
  );
}
