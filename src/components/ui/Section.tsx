import type { ReactNode } from "react";
import Container from "./Container";
import Eyebrow from "./Eyebrow";
import Aurora from "./Aurora";

export default function Section({
  id,
  eyebrow,
  title,
  description,
  actions,
  children,
  ink = false,
  className = "",
}: {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  /** Always-dark band with the aurora glow. */
  ink?: boolean;
  className?: string;
}) {
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={`py-20 sm:py-28 ${ink ? "section-ink relative overflow-clip" : ""} ${className}`}
    >
      {ink && <Aurora />}
      <Container className='relative'>
        <div className='mb-12 flex flex-wrap items-end justify-between gap-6 sm:mb-14'>
          <div className='max-w-2xl'>
            {eyebrow && <Eyebrow className='mb-4'>{eyebrow}</Eyebrow>}
            <h2
              id={titleId}
              className='text-3xl leading-[1.1] font-bold tracking-tight sm:text-4xl lg:text-[2.75rem]'
            >
              {title}
            </h2>
            {description && (
              <p className='mt-5 text-lg leading-relaxed text-muted-foreground'>
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
