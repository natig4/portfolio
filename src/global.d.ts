import type { routing } from "@/i18n/routing";
import type messages from "../messages/en.json";

// Type-checks every translation key against the English catalog.
// scripts/check-messages.mjs keeps the Hebrew catalog in sync with it.
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
