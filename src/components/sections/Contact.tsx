"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
} from "react-icons/fa";
import ContactInfo from "@/components/ContactInfo/ContactInfo";

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

export default function ContactSection({ contactInfo }: ContactSectionProps) {
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
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className='max-w-6xl mx-auto relative z-10'
    >
      <motion.div variants={itemVariants} className='text-center mb-16'>
        <h1 className='text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>
          {contactInfo.title}
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
            <h2 className='text-2xl font-bold mb-8 text-text'>
              {contactInfo.info}
            </h2>

            <div className='space-y-6'>
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
              {contactInfo.sendMessage}
            </h2>

            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-text mb-2'
                >
                  {contactInfo.form.name}
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className='w-full px-4 py-3 bg-background/50 border border-border/30 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 text-text placeholder-text-secondary'
                  placeholder={contactInfo.form.namePlaceholder}
                />
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-text mb-2'
                >
                  {contactInfo.form.email}
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className='w-full px-4 py-3 bg-background/50 border border-border/30 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 text-text placeholder-text-secondary'
                  placeholder={contactInfo.form.emailPlaceholder}
                />
              </div>

              <div>
                <label
                  htmlFor='message'
                  className='block text-sm font-medium text-text mb-2'
                >
                  {contactInfo.form.message}
                </label>
                <textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className='w-full px-4 py-3 bg-background/50 border border-border/30 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 text-text placeholder-text-secondary resize-vertical'
                  placeholder={contactInfo.form.messagePlaceholder}
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
                  {isSubmitting ? "Sending..." : contactInfo.form.send}
                </span>
                <div className='absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
