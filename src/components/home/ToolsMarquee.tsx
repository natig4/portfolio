import { useTranslations } from "next-intl";
import { getTech, type TechId } from "@/lib/tech";
import Marquee from "@/components/ui/Marquee";

const tools: TechId[] = [
  "googleads",
  "metaads",
  "ga4",
  "searchconsole",
  "tagmanager",
  "nextjs",
  "react",
  "vue",
  "nodejs",
  "typescript",
  "tailwind",
  "sanity",
  "supabase",
  "aws",
  "vercel",
  "openai",
];

/** Endless strip of the ad platforms and stacks we work with. */
export default function ToolsMarquee() {
  const t = useTranslations("home.marquee");

  return (
    <div className='border-b border-border bg-surface py-7'>
      <Marquee
        label={t("label")}
        duration={45}
        items={tools.map((id) => {
          const { label, icon: Icon } = getTech(id);
          return {
            key: id,
            node: (
              <span className='inline-flex items-center gap-2.5 text-base font-semibold whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground'>
                {Icon && <Icon className='size-5' aria-hidden='true' />}
                {label}
              </span>
            ),
          };
        })}
      />
    </div>
  );
}
