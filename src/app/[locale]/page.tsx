import { Metadata } from "next";
import { BigFlag, Tile, MainFoto } from "@components/client";
import styles from "./page.module.css";
import { getI18n } from "@locales/server";
import { setStaticParamsLocale } from "next-international/server";

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>): Promise<Metadata> {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const t = await getI18n();

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default function Home() {
  return (
    <main className={styles.content}>
      <MainFoto />
      <Tile />
      <BigFlag />
    </main>
  );
}
