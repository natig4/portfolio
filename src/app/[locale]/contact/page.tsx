"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
} from "react-icons/fa";
import ContactInfo from "@/components/ContactInfo/ContactInfo";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = encodeURIComponent("Message to Nati");
    const body = encodeURIComponent(formData.message);
    const mailtoLink = `mailto:nati_g4@hotmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className='min-h-screen p-4 py-16 relative overflow-hidden'>
      <div className='absolute inset-0 pointer-events-none'>
        <motion.div
          className='absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl'
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl'
          animate={{
            y: [0, 20, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        className='max-w-6xl mx-auto relative z-10'
      >
        <motion.div variants={itemVariants} className='text-center mb-16'>
          <h1 className='text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>
            {t("title")}
          </h1>
          <p className='text-xl text-text-secondary max-w-2xl mx-auto'>
            Let&rsquo;s connect and discuss your next project or opportunity
          </p>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          <motion.div
            variants={itemVariants}
            className='bg-surface/80 backdrop-blur-lg rounded-2xl p-8 border border-border/30 relative overflow-hidden'
          >
            <div className='absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 pointer-events-none' />

            <div className='relative z-10'>
              <h2 className='text-2xl font-bold mb-8 text-text'>{t("info")}</h2>

              <div className='space-y-6'>
                <ContactInfo
                  icon={FaEnvelope}
                  label={t("email")}
                  value='nati_g4@hotmail.com'
                  href='mailto:nati_g4@hotmail.com'
                />

                <ContactInfo
                  icon={FaPhone}
                  label={t("phone")}
                  value='054-4785120'
                  href='tel:+972544785120'
                />

                <ContactInfo
                  icon={FaMapMarkerAlt}
                  label={t("location")}
                  value='Yasur, Northern District, Israel'
                  href='https://www.google.com/maps/place/YASUR/data=!4m2!3m1!1s0x151dca54b64c7603:0x1acb071f63e0bc23?sa=X&ved=1t:242&ictx=111'
                />

                <ContactInfo
                  icon={FaLinkedin}
                  label={t("linkedin")}
                  value='linkedin.com/in/nati-gurevich-36868711b'
                  href='https://www.linkedin.com/in/nati-gurevich-36868711b/'
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className='bg-surface/80 backdrop-blur-lg rounded-2xl p-8 border border-border/30 relative overflow-hidden'
          >
            <div className='absolute inset-0 bg-gradient-to-br from-accent/5 to-accent-secondary/5 pointer-events-none' />

            <div className='relative z-10'>
              <h2 className='text-2xl font-bold mb-8 text-text'>
                {t("sendMessage")}
              </h2>

              <form onSubmit={handleSubmit} className='space-y-6'>
                <div>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-text mb-2'
                  >
                    {t("form.name")}
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className='w-full px-4 py-3 bg-background/50 border border-border/30 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 text-text placeholder-text-secondary'
                    placeholder={t("form.namePlaceholder")}
                  />
                </div>

                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-text mb-2'
                  >
                    {t("form.email")}
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className='w-full px-4 py-3 bg-background/50 border border-border/30 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 text-text placeholder-text-secondary'
                    placeholder={t("form.emailPlaceholder")}
                  />
                </div>

                <div>
                  <label
                    htmlFor='message'
                    className='block text-sm font-medium text-text mb-2'
                  >
                    {t("form.message")}
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className='w-full px-4 py-3 bg-background/50 border border-border/30 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 text-text placeholder-text-secondary resize-vertical'
                    placeholder={t("form.messagePlaceholder")}
                  />
                </div>

                <motion.button
                  type='submit'
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className='w-full px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
                >
                  <span className='relative z-10'>
                    {isSubmitting ? "Sending..." : t("form.send")}
                  </span>
                  <div className='absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
