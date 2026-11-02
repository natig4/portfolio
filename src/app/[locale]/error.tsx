"use client";

import { useTranslations } from "next-intl";
import Button, { ButtonLink } from "@/components/ui/Button";
import StatusMessage from "@/components/shared/StatusMessage";

export default function ErrorPage({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const t = useTranslations("error");

  return (
    <StatusMessage
      code={t("code")}
      title={t("title")}
      description={t("description")}
    >
      <Button onClick={reset}>{t("retry")}</Button>
      <ButtonLink href='/' variant='secondary'>
        {t("home")}
      </ButtonLink>
    </StatusMessage>
  );
}
