import styles from "./Footer.module.css";
import { useTranslation } from "@/i18n";
import { I12n } from "@/i18n/types";

export async function Footer({ lang }: I12n) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lang, "common");

  return (
    <footer className={styles.footer}>
      <p>&copy; {t("footer_text")}</p>
    </footer>
  );
}
