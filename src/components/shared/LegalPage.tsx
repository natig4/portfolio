import type { ReactNode } from "react";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";

export default function LegalPage({
  title,
  meta,
  children,
}: {
  title: string;
  meta?: string[];
  children: ReactNode;
}) {
  return (
    <>
      <PageHeader title={title}>
        {meta && (
          <div className='mt-5 space-y-1 text-sm text-muted-foreground'>
            {meta.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        )}
      </PageHeader>
      <Container className='py-12 sm:py-16'>
        <div className='prose prose-zinc max-w-3xl dark:prose-invert prose-headings:font-semibold prose-a:text-accent prose-a:underline-offset-2 hover:prose-a:text-accent-hover'>
          {children}
        </div>
      </Container>
    </>
  );
}
