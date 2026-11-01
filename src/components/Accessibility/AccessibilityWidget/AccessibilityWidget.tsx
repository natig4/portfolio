"use client";
import type { AppLocale } from "@/i18n/routing";
import { useEffect } from "react";

const AccessibilityWidget: React.FC<{
  lang: AppLocale;
}> = ({ lang }) => {
  useEffect(() => {
    const speechLang = lang === "he" ? "he-IL" : "en-US";

    const defaultOptions = {
      session: {
        persistent: true,
      },
      language: {
        textToSpeechLang: speechLang,
        speechToTextLang: speechLang,
      },
      icon: {
        img: "accessible",
      },
    };
    const accessibilityOptions =
      lang === "he"
        ? { ...getHebrewOptions(), ...defaultOptions }
        : defaultOptions;

    // Load the widget (and the icon font it pulls in) once the page is idle,
    // so it never competes with first paint.
    let widget: { destroy: () => void } | undefined;
    let cancelled = false;
    const start = () =>
      import("accessibility").then(({ Accessibility }) => {
        if (!cancelled) widget = new Accessibility(accessibilityOptions);
      });
    // Safari has no requestIdleCallback; fall back to a short timeout there.
    const hasIdle = typeof window.requestIdleCallback === "function";
    const handle = hasIdle
      ? window.requestIdleCallback(start, { timeout: 3000 })
      : setTimeout(start, 1500);

    return () => {
      cancelled = true;
      if (hasIdle) window.cancelIdleCallback(handle as number);
      else clearTimeout(handle);
      widget?.destroy();
    };
  }, [lang]);

  return null;
};

export default AccessibilityWidget;

function getHebrewOptions() {
  const labels = {
    increaseText: "הגדלת גודל טקסט",
    decreaseText: "הקטנת גודל טקסט",
    increaseTextSpacing: "הגדלת רווחי טקסט",
    decreaseTextSpacing: "הקטנת רווחי טקסט",
    increaseLineHeight: "הגדלת גובה שורה",
    decreaseLineHeight: "הקטנת גובה שורה",
    invertColors: "הפיכת צבעים",
    grayHues: "גווני אפור",
    underlineLinks: "קו תחתון לקישורים",
    bigCursor: "סמן גדול",
    readingGuide: "מדריך קריאה",
    textToSpeech: "טקסט לדיבור",
    speechToText: "דיבור לטקסט",
    disableAnimations: "כיבוי אנימציות",
    hotkeyPrefix: "מקש חם: ",
  };
  const options = {
    labels,
  };

  return options;
}
