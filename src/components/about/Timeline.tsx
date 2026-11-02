import { useTranslations } from "next-intl";
import { experience } from "@/data/experience";
import TechList from "@/components/ui/TechList";

export default function Timeline() {
  const t = useTranslations("about.experience");

  return (
    <ol className='relative space-y-10 border-s border-border ps-8'>
      {experience.map((role) => {
        const isCurrent = !("end" in role);
        const highlights = t.raw(`items.${role.id}.highlights`) as string[];
        return (
          <li key={role.id} className='relative'>
            <span
              className={`absolute -start-[37px] top-1.5 size-2.5 rounded-full ring-4 ring-background ${
                isCurrent ? "bg-accent" : "bg-muted-foreground/50"
              }`}
              aria-hidden='true'
            />
            <div className='flex flex-wrap items-center gap-x-3 gap-y-1'>
              <span className='text-sm font-medium text-muted-foreground tabular-nums'>
                {role.start} – {isCurrent ? t("present") : role.end}
              </span>
              {isCurrent && (
                <span className='rounded-full bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent'>
                  {t("current")}
                </span>
              )}
            </div>
            <h3 className='mt-2 text-xl font-semibold tracking-tight'>
              {t(`items.${role.id}.role`)}
              <span className='text-muted-foreground'>
                {" · "}
                {t(`items.${role.id}.company`)}
              </span>
            </h3>
            <p className='mt-2 text-muted-foreground'>
              {t(`items.${role.id}.summary`)}
            </p>
            <ul className='mt-4 list-disc space-y-1.5 ps-5 text-sm leading-relaxed marker:text-accent'>
              {highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            {"stack" in role && <TechList ids={role.stack} className='mt-4' />}
          </li>
        );
      })}
    </ol>
  );
}
