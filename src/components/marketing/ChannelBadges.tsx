import { useTranslations } from "next-intl";
import { CHANNELS, type ChannelId } from "@/lib/channels";

export default function ChannelBadges({
  channels,
  className = "",
}: {
  channels: readonly ChannelId[];
  className?: string;
}) {
  const t = useTranslations("marketing.channels");

  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {channels.map((id) => {
        const Icon = CHANNELS[id].icon;
        return (
          <li
            key={id}
            className='inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-medium text-foreground shadow-sm'
          >
            <Icon className='size-3.5' aria-hidden='true' />
            {t(id)}
          </li>
        );
      })}
    </ul>
  );
}
