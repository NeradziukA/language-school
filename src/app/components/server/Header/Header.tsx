import { getI18n, getCurrentLocale } from "@locales/server";
import styles from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";
import LanguageSelector from "../../client/LanguageSelector/LanguageSelector";

export async function Header() {
  const t = await getI18n();
  const locale = await getCurrentLocale();

  return (
    <header className={styles.header}>
      <Link className={styles.logo} href={`/${locale}`}>
        <Image src="/logo-menu.png" alt="Logo Menu" width={40} height={40} />
        <p>{t("menu.home")}</p>
      </Link>
      <Link href={`/${locale}/offers`}>
        <p>{t("menu.offer")}</p>
      </Link>
      <Link href={`/${locale}/contacts`}>
        <p>{t("menu.contact")}</p>
      </Link>
      <div className={styles.languageSelectorContainer}>
        <LanguageSelector />
      </div>
    </header>
  );
}
