import { getI18n } from "@/app/locales/server";
import { Metadata } from "next";
import { setStaticParamsLocale } from "next-international/server";
import styles from "./page.module.css";
import { Content } from "@components/client";

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>): Promise<Metadata> {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const t = await getI18n();

  return {
    title: t("meta.offers.title"),
    description: t("meta.offers.description"),
  };
}

export default function Offers() {
  return (
    <main className={styles.content}>
      <Content pageKey="offer" />
    </main>
  );
}
