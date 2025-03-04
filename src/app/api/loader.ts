import { offers } from "./offers";
import { contacts } from "./contact";

export type PageKey = "offer" | "contact";

export function loadApi(
  pageKey: PageKey,
  locale: string
): { title: string; content: string }[] {
  if (pageKey === "offer") {
    return offers[locale];
  }
  if (pageKey === "contact") {
    return contacts[locale];
  }
  return [];
}
