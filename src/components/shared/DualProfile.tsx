import { useTranslations } from "next-intl";
import { LuCheck, LuCodeXml, LuMegaphone, LuPlus } from "react-icons/lu";

const sides = [
  { key: "engineer", icon: LuCodeXml },
  { key: "marketer", icon: LuMegaphone },
] as const;

/** Nati's two skill sets side by side — the "developer who knows marketing" pitch. */
export default function DualProfile({ className = "" }: { className?: string }) {
  const t = useTranslations("profile");

  return (
    <div
      className={`glow-card rounded-3xl border border-border bg-surface p-2 shadow-[0_24px_48px_-32px_rgb(11_15_26/0.45)] ${className}`}
    >
      <p className='px-5 pt-4 pb-3 text-xs font-semibold text-accent ltr:tracking-[0.14em] ltr:uppercase'>
        {t("label")}
      </p>
      <div className='relative grid gap-2 sm:grid-cols-2'>
        {sides.map(({ key, icon: Icon }) => {
          const items = t.raw(`${key}.items`) as string[];
          return (
            <div key={key} className='rounded-2xl bg-muted/60 p-6'>
              <span className='inline-flex size-11 items-center justify-center rounded-xl bg-surface text-accent shadow-sm'>
                <Icon className='size-5' aria-hidden='true' />
              </span>
              <h3 className='mt-4 text-xl font-bold'>{t(`${key}.title`)}</h3>
              <ul className='mt-4 space-y-2.5 text-sm leading-snug'>
                {items.map((item) => (
                  <li key={item} className='flex gap-2.5'>
                    <LuCheck
                      className='mt-0.5 size-4 shrink-0 text-growth'
                      aria-hidden='true'
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
        {/* Centred between the two halves; physical left keeps it centred in both directions. */}
        <span
          className='absolute top-1/2 left-1/2 hidden size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-white shadow-[0_8px_24px_-8px_var(--brand-from)] sm:flex'
          aria-hidden='true'
        >
          <LuPlus className='size-5' />
        </span>
      </div>
    </div>
  );
}
