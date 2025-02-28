"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./Header.module.css";
import { LangSelector } from "@/components";
import { I12n } from "@/i18n/types";

export function Header({ lang }: I12n) {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link
          href={`/${lang}`}
          className={`${styles.link} ${
            pathname === `/${lang}` ? styles.active : ""
          }`}
        >
          Home
        </Link>
        <Link
          href={`/${lang}/about`}
          className={`${styles.link} ${
            pathname === `/${lang}/about` ? styles.active : ""
          }`}
        >
          About
        </Link>
      </nav>
      <div className={styles.langSelector}>
        <LangSelector lang={lang} />
      </div>
    </header>
  );
}
