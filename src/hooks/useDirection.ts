import { useLocale } from "next-intl";

export const useDirection = () => {
  const isRTL = useLocale() === "he";
  const direction = isRTL ? "rtl" : "ltr";

  return {
    isRTL,
    isLTR: !isRTL,
    direction,
  };
};
