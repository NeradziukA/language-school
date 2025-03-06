import { getI18n } from "@/app/locales/server";
import { Metadata } from "next";
import { setStaticParamsLocale } from "next-international/server";
import styles from "./page.module.css";
import { Test } from "@/app/components/client";
import { getTopic } from "@/app/api/loader";

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>): Promise<Metadata> {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const t = await getI18n();

  return {
    title: t("meta.selfStudy.title"),
    description: t("meta.selfStudy.description"),
  };
}

const validLevels: { [key: string]: string } = {
  A1: "A1",
  A2: "A2",
  B1: "B1",
  a1: "A1",
  a2: "A2",
  b1: "B1",
};

export default async function SelfStudyPage({
  params,
}: Readonly<{
  params: Promise<{ locale: string; level: string; topic: string }>;
}>) {
  const { locale, level, topic } = await params;
  const safeLevel = validLevels[level];
  const safeTopic = getTopic(locale, safeLevel, topic);
  setStaticParamsLocale(locale);

  return (
    <main className={styles.content}>
      <Test level={safeLevel} topic={safeTopic} />
    </main>
  );
}
