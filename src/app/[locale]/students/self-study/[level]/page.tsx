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
    title: t("meta.selfStudy.title"),
    description: t("meta.selfStudy.description"),
  };
}

const validLevels: { [key: string]: string } = {
  A1: "A1",
  A2: "A2",
  B1: "B1",
};

export default async function SelfStudyPage({
  params,
}: Readonly<{
  params: Promise<{ level: string }>;
}>) {
  const pageKey = "a1-blocks";
  const { level } = await params;

  return (
    <main className={styles.content}>
      <Content pageKey={pageKey} options={{ extra: validLevels[level] }} />
    </main>
  );
}
