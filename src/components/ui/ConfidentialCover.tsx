import { LuLock } from "react-icons/lu";

const sidebar = [72, 55, 64, 48, 60, 40];
const columns = 6;
const rows = 8;
// Deterministic "filled" cells so the server and client render the same pattern.
const filled = new Set([1, 4, 8, 9, 13, 16, 20, 22, 27, 29, 33, 38, 40, 45]);

/**
 * Cover for projects whose screenshots can't be shared: an abstract desktop-app
 * skeleton (spreadsheet grid) behind a lock and a short note. Same aspect as a capture.
 */
export default function ConfidentialCover({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className='relative aspect-[16/10] overflow-clip bg-muted/40'>
      <div
        className='absolute inset-0 flex gap-3 p-4 opacity-80 blur-[1px]'
        aria-hidden='true'
      >
        <div className='hidden w-1/5 flex-col gap-2.5 pt-1 sm:flex'>
          {sidebar.map((width, i) => (
            <span
              key={i}
              className='h-2.5 rounded bg-muted-foreground/15'
              style={{ width: `${width}%` }}
            />
          ))}
        </div>
        <div className='flex flex-1 flex-col gap-3'>
          <div className='flex gap-2'>
            {[18, 12, 14, 10].map((width, i) => (
              <span
                key={i}
                className='h-5 rounded bg-muted-foreground/10'
                style={{ width: `${width}%` }}
              />
            ))}
          </div>
          <div
            className='grid flex-1 overflow-clip rounded-md border border-border bg-surface'
            style={{
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: columns * rows }, (_, i) => (
              <span
                key={i}
                className={`border-e border-b border-border ${
                  i < columns ? "bg-muted/70" : ""
                }`}
              >
                {filled.has(i) && (
                  <span className='m-1.5 block h-1.5 w-3/5 rounded bg-accent/25' />
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className='absolute inset-0 flex items-center justify-center p-4'>
        <div className='max-w-xs rounded-xl border border-border bg-surface/95 px-5 py-4 text-center shadow-sm'>
          <span className='mx-auto inline-flex size-10 items-center justify-center rounded-full bg-accent-soft text-accent'>
            <LuLock className='size-5' aria-hidden='true' />
          </span>
          <p className='mt-3 font-medium text-foreground'>{title}</p>
          <p className='mt-1 text-sm text-muted-foreground'>{description}</p>
        </div>
      </div>
    </div>
  );
}
