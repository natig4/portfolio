import type { ProjectStatus } from "@/data/projects";

const dotClass: Record<ProjectStatus, string> = {
  live: "bg-success",
  "in-progress": "bg-warning",
  internal: "bg-accent",
  private: "bg-muted-foreground",
};

/** Status shown as text plus a coloured dot — never colour alone. */
export default function StatusBadge({
  status,
  label,
}: {
  status: ProjectStatus;
  label: string;
}) {
  return (
    <span className='inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-medium text-foreground'>
      <span className='relative flex size-2' aria-hidden='true'>
        {status === "live" && (
          <span className='absolute inline-flex size-full animate-ping rounded-full bg-success opacity-50' />
        )}
        <span
          className={`relative inline-flex size-2 rounded-full ${dotClass[status]}`}
        />
      </span>
      {label}
    </span>
  );
}
