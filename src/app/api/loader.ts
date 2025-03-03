import { offers } from "./offers";

export type PageKey = "offer" | "contact";

export function loadApi(
  pageKey: PageKey,
  locale: string
): { title: string; content: string }[] {
  if (pageKey === "offer") {
    return offers[locale];
  }
  return [];
}
