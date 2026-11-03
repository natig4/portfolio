import type { ReactNode } from "react";
import Container from "./Container";
import Eyebrow from "./Eyebrow";
import Aurora from "./Aurora";

/** Top-of-page intro on an ink band, with the page's single h1. */
export default function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <header className='section-ink relative overflow-clip'>
      <Aurora />
      <div className='bg-grid pointer-events-none absolute inset-0 opacity-50' aria-hidden='true' />
      <Container className='relative py-16 sm:py-24'>
        {eyebrow && <Eyebrow className='mb-5'>{eyebrow}</Eyebrow>}
        <h1 className='max-w-3xl text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl lg:text-6xl'>
          {title}
        </h1>
        {description && (
          <p className='mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl'>
            {description}
          </p>
        )}
        {children}
      </Container>
    </header>
  );
}
