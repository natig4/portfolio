import { Pathnames } from "@/i18n/routing";

export type SearchParams = Record<string, string | string[] | undefined>;

export function getRoute(
  href: { pathname: Pathnames; query?: Record<string, string | number> },
  name: string
) {
  return { href, name };
}
