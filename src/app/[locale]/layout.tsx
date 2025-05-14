import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import BaseLayout from "@/components/BaseLayout/BaseLayout";
import { ILanguageProps } from "@/lib/model/language";

interface IProps extends ILanguageProps {
  children: React.ReactNode;
}

export async function generateMetadata() {
  const t = await getTranslations("meta");

  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
  };
}

export default async function RootLayout(props: IProps) {
  const params = await props.params;
  const { locale } = params;
  const { children } = props;
  const isMobile = (await cookies()).get("isMobile")?.value === "true";

  return (
    <BaseLayout locale={locale} isMobile={isMobile}>
      {children}
    </BaseLayout>
  );
}
