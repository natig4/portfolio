import Link from "next/link";
import { fontVariables } from "./fonts";

// Only reached by requests that never hit a locale segment (e.g. /foo.bar).
// Kept free of next-intl: this boundary renders inside every page tree, and
// setting a request locale here would override the page's own locale.
export default function GlobalNotFound() {
  return (
    <html lang='en' dir='ltr' className={fontVariables}>
      <body className='flex min-h-dvh items-center justify-center bg-background p-6 text-foreground'>
        <main className='max-w-md text-center'>
          <p className='font-mono text-xs font-medium tracking-[0.16em] text-accent uppercase'>
            404
          </p>
          <h1 className='mt-4 text-3xl font-semibold'>Page not found</h1>
          <p className='mt-2 text-muted-foreground' lang='he' dir='rtl'>
            העמוד לא נמצא
          </p>
          <Link
            href='/'
            className='mt-8 inline-flex h-11 items-center rounded-lg bg-accent px-5 text-sm font-medium text-accent-foreground hover:bg-accent-hover'
          >
            New Generation SW
          </Link>
        </main>
      </body>
    </html>
  );
}
