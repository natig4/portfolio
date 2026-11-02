import { LuImageOff } from "react-icons/lu";

/** Stand-in for projects whose screenshots haven't been supplied yet. Same aspect as a real capture. */
export default function ScreenshotPlaceholder({
  title,
  label,
  className = "",
}: {
  title: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex aspect-[16/10] flex-col items-center justify-center gap-3 bg-muted/50 bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:28px_28px] text-center ${className}`}
    >
      <span className='rounded-full border border-border bg-surface p-3 text-muted-foreground'>
        <LuImageOff className='size-5' aria-hidden='true' />
      </span>
      <span className='rounded-md bg-background/90 px-3 py-1'>
        <span className='block font-mono text-sm font-medium text-foreground'>
          {title}
        </span>
        <span className='block text-xs text-muted-foreground'>{label}</span>
      </span>
    </div>
  );
}
