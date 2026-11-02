import type { IconType } from "react-icons";
import { SiGoogleads, SiGooglesearchconsole, SiMeta } from "react-icons/si";

/** Marketing channels. Labels live in messages under `marketing.channels.<id>`. */
export const CHANNELS = {
  "google-ads": { icon: SiGoogleads },
  "meta-ads": { icon: SiMeta },
  seo: { icon: SiGooglesearchconsole },
} as const satisfies Record<string, { icon: IconType }>;

export type ChannelId = keyof typeof CHANNELS;

export const channelIds = Object.keys(CHANNELS) as ChannelId[];
