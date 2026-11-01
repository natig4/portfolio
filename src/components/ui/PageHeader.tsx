import type { ReactNode } from "react";
import Container from "./Container";
import Eyebrow from "./Eyebrow";

/** Top-of-page intro with the page's single h1. */
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
    <header className='border-b border-border'>
      <Container className='py-14 sm:py-20'>
        {eyebrow && <Eyebrow className='mb-4'>{eyebrow}</Eyebrow>}
        <h1 className='max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl'>
          {title}
        </h1>
        {description && (
          <p className='mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground'>
            {description}
          </p>
        )}
        {children}
      </Container>
    </header>
  );
}
