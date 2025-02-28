import Link from "next/link";
import styles from "./page.module.css";
import { useTranslation } from "@/i18n";
import { I12n } from "@/i18n/types";

interface Params {
  params: I12n;
}

export default async function Home({ params: { lang } }: Params) {
  const { t } = await useTranslation(lang, "common");

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>{t("welcome")}</h1>
        <Link href={`${lang}/about`} className={styles.link}>
          {t("about")}
        </Link>
      </main>
    </div>
  );
}
