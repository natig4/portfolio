import type { ReactNode } from "react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";

export default function StatusMessage({
  code,
  title,
  description,
  children,
}: {
  code: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Container className='flex flex-1 flex-col justify-center py-24'>
      <Eyebrow>{code}</Eyebrow>
      <h1 className='mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl'>
        {title}
      </h1>
      <p className='mt-5 max-w-xl text-lg text-muted-foreground'>
        {description}
      </p>
      <div className='mt-10 flex flex-wrap gap-3'>{children}</div>
    </Container>
  );
}
