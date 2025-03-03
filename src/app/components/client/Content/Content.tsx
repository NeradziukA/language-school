"use client";
import { useI18n } from "@locales/client";
import styles from "./Content.module.css";

type PageKey = "page.offer" | "page.contact";

export function Content({ pageKey }: Readonly<{ pageKey: PageKey }>) {
  const t = useI18n();

  return <div className={styles.content}>{t(pageKey)}</div>;
}
