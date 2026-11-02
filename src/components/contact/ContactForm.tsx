"use client";

import { useState, type FormEvent } from "react";
import { LuSend } from "react-icons/lu";
import Button from "@/components/ui/Button";

export type ContactFormLabels = {
  title: string;
  name: string;
  email: string;
  company: string;
  optional: string;
  message: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  companyPlaceholder: string;
  messagePlaceholder: string;
  send: string;
  note: string;
  opened: string;
  /** Raw template containing "{name}". */
  subject: string;
  bodyName: string;
  bodyEmail: string;
  bodyCompany: string;
};

const inputClass =
  "mt-2 block w-full rounded-lg border border-border bg-background px-4 text-base text-foreground transition-colors placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/25 focus:outline-none";

/** Builds a pre-filled email in the visitor's mail app — no backend involved. */
export default function ContactForm({
  to,
  labels,
}: {
  to: string;
  labels: ContactFormLabels;
}) {
  const [opened, setOpened] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const field = (key: string) => String(data.get(key) ?? "").trim();
    const name = field("name");
    const company = field("company");

    const body = [
      `${labels.bodyName}: ${name}`,
      `${labels.bodyEmail}: ${field("email")}`,
      ...(company ? [`${labels.bodyCompany}: ${company}`] : []),
      "",
      field("message"),
    ].join("\n");

    const subject = labels.subject.replace("{name}", name);
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby='contact-form-title'
      className='rounded-2xl border border-border bg-surface p-6 sm:p-8'
    >
      <h2
        id='contact-form-title'
        className='text-xl font-semibold tracking-tight'
      >
        {labels.title}
      </h2>

      <div className='mt-6 grid gap-5 sm:grid-cols-2'>
        <div>
          <label htmlFor='contact-name' className='text-sm font-medium'>
            {labels.name}{" "}
            <span aria-hidden='true' className='text-accent'>
              *
            </span>
          </label>
          <input
            id='contact-name'
            name='name'
            required
            autoComplete='name'
            placeholder={labels.namePlaceholder}
            className={`${inputClass} h-12`}
          />
        </div>
        <div>
          <label htmlFor='contact-email' className='text-sm font-medium'>
            {labels.email}{" "}
            <span aria-hidden='true' className='text-accent'>
              *
            </span>
          </label>
          <input
            id='contact-email'
            name='email'
            type='email'
            required
            autoComplete='email'
            dir='ltr'
            placeholder={labels.emailPlaceholder}
            className={`${inputClass} h-12 rtl:text-right`}
          />
        </div>
        <div className='sm:col-span-2'>
          <label htmlFor='contact-company' className='text-sm font-medium'>
            {labels.company}{" "}
            <span className='font-normal text-muted-foreground'>
              ({labels.optional})
            </span>
          </label>
          <input
            id='contact-company'
            name='company'
            autoComplete='organization'
            placeholder={labels.companyPlaceholder}
            className={`${inputClass} h-12`}
          />
        </div>
        <div className='sm:col-span-2'>
          <label htmlFor='contact-message' className='text-sm font-medium'>
            {labels.message}{" "}
            <span aria-hidden='true' className='text-accent'>
              *
            </span>
          </label>
          <textarea
            id='contact-message'
            name='message'
            required
            rows={6}
            placeholder={labels.messagePlaceholder}
            className={`${inputClass} resize-y py-3`}
          />
        </div>
      </div>

      <div className='mt-6 flex flex-wrap items-center gap-4'>
        <Button type='submit' size='lg'>
          <LuSend className='size-4 rtl:-scale-x-100' aria-hidden='true' />
          {labels.send}
        </Button>
        <p className='text-sm text-muted-foreground'>{labels.note}</p>
      </div>
      <p role='status' aria-live='polite' className='mt-4 text-sm'>
        {opened ? labels.opened : ""}
      </p>
    </form>
  );
}
