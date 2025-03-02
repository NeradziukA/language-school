"use client";
import { useI18n } from "@locales/client";
import styles from "./Tile.module.css";

export function Tile() {
  const t = useI18n();

  return (
    <aside className={styles.tile}>
      <p className={styles.title}>{t("asideTile.title")}</p>
      <div className={styles.divider} />
      <p className={styles.content}>{t("asideTile.content")}</p>
      <p className={styles.psTitle}>{t("asideTile.psTitle")}</p>
      <div className={styles.divider} />
      <p className={styles.content}>{t("asideTile.psContent")}</p>
    </aside>
  );
}
