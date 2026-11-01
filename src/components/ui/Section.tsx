import type { ReactNode } from "react";
import Container from "./Container";
import Eyebrow from "./Eyebrow";

export default function Section({
  id,
  eyebrow,
  title,
  description,
  actions,
  children,
  className = "",
}: {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={`py-16 sm:py-24 ${className}`}
    >
      <Container>
        <div className='mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-12'>
          <div className='max-w-2xl'>
            {eyebrow && <Eyebrow className='mb-3'>{eyebrow}</Eyebrow>}
            <h2
              id={titleId}
              className='text-3xl font-semibold tracking-tight sm:text-4xl'
            >
              {title}
            </h2>
            {description && (
              <p className='mt-4 text-lg leading-relaxed text-muted-foreground'>
                {description}
              </p>
            )}
          </div>
          {actions}
        </div>
        {children}
      </Container>
    </section>
  );
}
