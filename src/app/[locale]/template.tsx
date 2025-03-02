import { Footer, Header } from "@components/server";
import { I18nProviderClient } from "@locales/client";
import { getCurrentLocale } from "@locales/server";
import styles from "./page.module.css";

export default async function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getCurrentLocale();

  return (
    <div className={styles.page}>
      <I18nProviderClient locale={locale}>
        <Header />
        {children}
        <Footer />
      </I18nProviderClient>
    </div>
  );
}
