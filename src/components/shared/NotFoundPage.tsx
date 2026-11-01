import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";
import StatusMessage from "./StatusMessage";

export default function NotFoundPage() {
  const t = useTranslations("notFound");

  return (
    <StatusMessage code='404' title={t("title")} description={t("description")}>
      <ButtonLink href='/'>{t("home")}</ButtonLink>
      <ButtonLink href='/projects' variant='secondary'>
        {t("work")}
      </ButtonLink>
    </StatusMessage>
  );
}
