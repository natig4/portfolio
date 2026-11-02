import { useTranslations } from "next-intl";
import { skills } from "@/data/skills";
import type { TechCategory } from "@/lib/tech";
import TechList from "@/components/ui/TechList";

export default function SkillGroups() {
  const t = useTranslations("about.skills.categories");

  return (
    <div className='grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3'>
      {(Object.keys(skills) as TechCategory[]).map((category) => (
        <div key={category} className='bg-surface p-6'>
          <h3 className='font-semibold'>{t(category)}</h3>
          <TechList ids={skills[category]} className='mt-4' />
        </div>
      ))}
    </div>
  );
}
