import { useTranslation } from "@/i18n";
import { I12n } from "@/i18n/types";
import styles from "./about.module.css";

interface Params {
  params: I12n;
}

export default async function About({ params: { lang } }: Params) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lang, "common");

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>{t("about")}</h1>
        <p>{t("description")}</p>
      </main>
    </div>
  );
}
