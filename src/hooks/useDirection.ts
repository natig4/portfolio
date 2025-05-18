import { useLocale } from "next-intl";
import { Language } from "@/lib/model/language";

export const useDirection = () => {
  const locale = useLocale();
  const isRTL = locale === Language.he;
  const direction = isRTL ? "rtl" : "ltr";

  return {
    isRTL,
    isLTR: !isRTL,
    direction,
  };
};
