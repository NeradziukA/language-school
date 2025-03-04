import { getI18n } from "@/app/locales/server";
import { Metadata } from "next";
import { setStaticParamsLocale } from "next-international/server";
import styles from "./page.module.css";
import { Content } from "@/app/components/client";

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>): Promise<Metadata> {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const t = await getI18n();

  return {
    title: t("meta.contacts.title"),
    description: t("meta.contacts.description"),
  };
}

export default function Contacts() {
  return (
    <main className={styles.content}>
      <Content pageKey="contact" />
    </main>
  );
}
