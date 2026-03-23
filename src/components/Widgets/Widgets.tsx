import { Language } from "@/lib/model/language";
import AccessibilityWidget from "../Accessibility/AccessibilityWidget/AccessibilityWidget";

const Widgets: React.FC<{
  lang: Language;
}> = ({ lang }) => {
  return (
    <>
      <AccessibilityWidget lang={lang} />
    </>
  );
};

export default Widgets;
