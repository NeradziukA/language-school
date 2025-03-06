"use client";
import { useCurrentLocale, useI18n } from "@locales/client";
import styles from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { LanguageSelector } from "../LanguageSelector";
import { usePathname } from "next/navigation";

export function Header() {
  const locale = useCurrentLocale();
  const t = useI18n();
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <Link
        className={`${styles.logo} ${
          pathname === `/${locale}` ? styles.active : ""
        }`}
        href={`/${locale}`}
      >
        <Image src="/logo-menu.png" alt="Logo Menu" width={40} height={40} />
        <p className={styles.label}>{t("menu.home")}</p>
      </Link>
      <Link
        className={`${styles.link} ${
          pathname === `/${locale}/offers` ? styles.active : ""
        }`}
        href={`/${locale}/offers`}
      >
        <p className={styles.label}>{t("menu.offer")}</p>
      </Link>
      <Link
        className={`${styles.link} ${
          pathname === `/${locale}/students/self-study` ? styles.active : ""
        }`}
        href={`/${locale}/students/self-study`}
      >
        <p className={styles.label}>{t("menu.students")}</p>
      </Link>
      <div className={styles.languageSelectorContainer}>
        <LanguageSelector />
      </div>
    </header>
  );
}
