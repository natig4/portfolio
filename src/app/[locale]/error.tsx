"use client";

import { useTranslations } from "next-intl";
import NavLink from "@/components/NavLink/NavLink";
import styles from "./error.module.css";

export default function Error() {
  const t = useTranslations("Error");

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>{t("header")}</h1>
      <p className={styles.text}>{t("description")}</p>
      <div className={styles.action}>
        <p>{t("link1")}</p>
        <NavLink className={styles.link} href={{ pathname: "/" }}>
          {t("cta")}
        </NavLink>
        <p>{t("link2")}</p>
      </div>
    </div>
  );
}
