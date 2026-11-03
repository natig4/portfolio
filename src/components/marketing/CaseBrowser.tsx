import { useTranslations } from "next-intl";
import { LuLayoutGrid } from "react-icons/lu";
import { marketingCases } from "@/data/marketing";
import { CHANNELS, channelIds } from "@/lib/channels";
import Reveal from "@/components/ui/Reveal";
import CaseCard from "./CaseCard";

/**
 * All marketing cases with a channel filter. The filter is a radio group and
 * CSS `:has()` (see `.case-browser` in globals.css), so the page stays static
 * and works without JavaScript.
 */
export default function CaseBrowser() {
  const t = useTranslations("marketing");
  const options = [
    { id: "all", label: t("filter.all"), Icon: LuLayoutGrid, count: marketingCases.length },
    ...channelIds.map((id) => ({
      id,
      label: t(`channels.${id}`),
      Icon: CHANNELS[id].icon,
      count: marketingCases.filter((c) =>
        (c.channels as readonly string[]).includes(id),
      ).length,
    })),
  ];

  return (
    <div className='case-browser'>
      <fieldset className='flex flex-wrap gap-2'>
        <legend className='sr-only'>{t("filter.legend")}</legend>
        {options.map(({ id, label, Icon, count }) => (
          <label key={id} className='cursor-pointer'>
            <input
              type='radio'
              name='channel'
              value={id}
              defaultChecked={id === "all"}
              className='peer sr-only'
            />
            <span className='inline-flex h-10 items-center gap-2 rounded-full border border-border bg-surface px-4 text-sm font-medium text-muted-foreground transition-colors peer-checked:border-transparent peer-checked:bg-foreground peer-checked:text-background peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent hover:text-foreground'>
              <Icon className='size-4' aria-hidden='true' />
              {label}
              <span className='text-xs opacity-70'>{count}</span>
            </span>
          </label>
        ))}
      </fieldset>

      <ul className='mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {marketingCases.map((data, index) => (
          <li key={data.slug} data-channels={data.channels.join(" ")} className='min-w-0'>
            <Reveal index={index % 3} className='h-full min-w-0'>
              <CaseCard data={data} />
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
