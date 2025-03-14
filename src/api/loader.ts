import { offers } from "./offers";
import { contacts } from "./contact";
import { selfStudy } from "./self-study";
import { a1Blocks } from "./a1-blocks";
import { a2Blocks } from "./a2-blocks";
import { b1Blocks } from "./b1-blocks";
import { TopicBlock } from "./types";

export type PageKey =
  | "offer"
  | "contact"
  | "self-study"
  | "a1-blocks"
  | "a2-blocks"
  | "b1-blocks";

export function loadApi(
  pageKey: PageKey,
  locale: string
): ({ title: string; content: string } | TopicBlock)[] {
  if (pageKey === "offer") {
    return offers[locale];
  }
  if (pageKey === "contact") {
    return contacts[locale];
  }
  if (pageKey === "self-study") {
    return selfStudy[locale];
  }
  if (pageKey === "a1-blocks") {
    return a1Blocks[locale];
  }
  if (pageKey === "a2-blocks") {
    return a2Blocks[locale];
  }
  if (pageKey === "b1-blocks") {
    return b1Blocks[locale];
  }
  return [];
}

export function getTopic(
  locale: string,
  level: string,
  topic: string
): TopicBlock | undefined {
  const data: TopicBlock[] = loadApi(
    `${level?.toLocaleLowerCase()}-blocks` as PageKey,
    locale
  ) as TopicBlock[];

  const safeTopic = data?.find((block) => block.topic === topic);
  return safeTopic;
}
