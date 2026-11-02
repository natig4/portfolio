import type { AppLocale } from "@/i18n/routing";
import AccessibilityWidget from "../Accessibility/AccessibilityWidget/AccessibilityWidget";

export default function Widgets({ lang }: { lang: AppLocale }) {
  return <AccessibilityWidget lang={lang} />;
}
