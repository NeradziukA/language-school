import { getI18n, getCurrentLocale } from "@locales/server";
import styles from "./Footer.module.css";
import Link from "next/link";

export async function Footer() {
  const t = await getI18n();
  const locale = await getCurrentLocale();
  return (
    <footer className={styles.footer}>
      <Link className={styles.link} href={`/${locale}/contacts`}>
        <p className={styles.label}>{t("menu.contact")}</p>
      </Link>
    </footer>
  );
}
