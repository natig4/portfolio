"use client";

import { useState, memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
} from "react-icons/fa";
import ContactInfo from "@/components/ContactInfo/ContactInfo";
import { EMAIL } from "@/lib/model/common";
import { useTranslations } from "next-intl";

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

interface ContactSectionProps {
  contactInfo: ContactInfoData;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      duration: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const ContactForm = memo(function ContactForm({
  formData,
  isSubmitting,
  handleInputChange,
  handleSubmit,
  form,
}: {
  formData: { name: string; email: string; message: string };
  isSubmitting: boolean;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
  form: ContactInfoData["form"];
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-6'
      noValidate
      aria-label='Contact form'
    >
      <fieldset className='space-y-6'>
        <legend className='sr-only'>Contact information form</legend>

        <div>
          <label
            htmlFor='contact-name'
            className='block text-sm font-medium text-text mb-2'
          >
            {form.name} <span aria-label='required'>*</span>
          </label>
          <input
            type='text'
            id='contact-name'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            required
            aria-required='true'
            aria-invalid={formData.name.trim() === "" ? "true" : "false"}
            className='w-full px-4 py-3 bg-background/50 border border-border/30 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 text-text placeholder-text-secondary'
            placeholder={form.namePlaceholder}
          />
        </div>

        <div>
          <label
            htmlFor='contact-email'
            className='block text-sm font-medium text-text mb-2'
          >
            {form.email} <span aria-label='required'>*</span>
          </label>
          <input
            type='email'
            id='contact-email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            required
            aria-required='true'
            aria-invalid={formData.email.includes("@") ? "false" : "true"}
            className='w-full px-4 py-3 bg-background/50 border border-border/30 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 text-text placeholder-text-secondary'
            placeholder={form.emailPlaceholder}
          />
        </div>

        <div>
          <label
            htmlFor='contact-message'
            className='block text-sm font-medium text-text mb-2'
          >
            {form.message} <span aria-label='required'>*</span>
          </label>
          <textarea
            id='contact-message'
            name='message'
            value={formData.message}
            onChange={handleInputChange}
            required
            aria-required='true'
            aria-invalid={formData.message.trim() === "" ? "true" : "false"}
            rows={5}
            className='w-full px-4 py-3 bg-background/50 border border-border/30 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 text-text placeholder-text-secondary resize-vertical'
            placeholder={form.messagePlaceholder}
          />
        </div>
      </fieldset>

      <button
        type='submit'
        disabled={isSubmitting}
        className='will-change-transform w-full px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-[1.02] hover:-translate-y-1'
        aria-describedby={isSubmitting ? "form-status" : undefined}
      >
        <span className='relative z-10'>
          {isSubmitting ? "Sending..." : form.send}
        </span>
        <div className='absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
      </button>

      {isSubmitting && (
        <div id='form-status' className='sr-only' aria-live='polite'>
          Form is being submitted
        </div>
      )}
    </form>
  );
});

const ContactSection = memo(function ContactSection({
  contactInfo,
}: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("common");

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
    const mailtoLink = `mailto:${EMAIL}?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <main
      className='max-w-6xl mx-auto relative z-10'
      role='main'
      aria-labelledby='contact-title'
    >
      <header className='text-center mb-16'>
        <h1
          id='contact-title'
          className='text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'
        >
          {contactInfo.title}
        </h1>
        <p className='text-xl text-text-secondary max-w-2xl mx-auto'>
          {t("subtitles.contact")}
        </p>
      </header>

      <motion.div
        variants={containerVariants}
        initial={prefersReducedMotion ? "visible" : "hidden"}
        animate='visible'
        className='grid grid-cols-1 lg:grid-cols-2 gap-12'
      >
        <motion.section
          variants={itemVariants}
          className='bg-surface/80 backdrop-blur-sm rounded-2xl p-8 border border-border/30 relative overflow-hidden'
          aria-labelledby='contact-info-title'
        >
          <div
            className='absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 pointer-events-none'
            aria-hidden='true'
          />

          <div className='relative z-10'>
            <h2
              id='contact-info-title'
              className='text-2xl font-bold mb-8 text-text'
            >
              {contactInfo.info}
            </h2>

            <address className='space-y-6 not-italic'>
              <ContactInfo
                icon={FaEnvelope}
                label={contactInfo.email.label}
                value={contactInfo.email.value}
                href={`mailto:${contactInfo.email.value}`}
              />

              <ContactInfo
                icon={FaPhone}
                label={contactInfo.phone.label}
                value={contactInfo.phone.value}
                href='tel:+972544785120'
              />

              <ContactInfo
                icon={FaMapMarkerAlt}
                label={contactInfo.location.label}
                value={contactInfo.location.value}
                href='https://www.google.com/maps/place/YASUR/data=!4m2!3m1!1s0x151dca54b64c7603:0x1acb071f63e0bc23?sa=X&ved=1t:242&ictx=111'
              />

              <ContactInfo
                icon={FaLinkedin}
                label={contactInfo.linkedin.label}
                value={contactInfo.linkedin.value}
                href='https://www.linkedin.com/in/nati-gurevich-36868711b/'
              />
            </address>
          </div>
        </motion.section>

        <motion.section
          variants={itemVariants}
          className='bg-surface/80 backdrop-blur-sm rounded-2xl p-8 border border-border/30 relative overflow-hidden'
          aria-labelledby='contact-form-title'
        >
          <div
            className='absolute inset-0 bg-gradient-to-br from-accent/5 to-accent-secondary/5 pointer-events-none'
            aria-hidden='true'
          />

          <div className='relative z-10'>
            <h2
              id='contact-form-title'
              className='text-2xl font-bold mb-8 text-text'
            >
              {contactInfo.sendMessage}
            </h2>

            <ContactForm
              formData={formData}
              isSubmitting={isSubmitting}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              form={contactInfo.form}
            />
          </div>
        </motion.section>
      </motion.div>
    </main>
  );
});

export default ContactSection;
