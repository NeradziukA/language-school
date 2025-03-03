"use client";
import { useI18n } from "@locales/client";

type PageKey = "page.offer" | "page.contact";

export function Content({ pageKey }: Readonly<{ pageKey: PageKey }>) {
  const t = useI18n();

  return <p>{t(pageKey)}</p>;
}
