"use client";
import styles from "./Content.module.css";
import { loadApi, PageKey } from "@/app/api/loader";

type Offer = {
  title: string;
  content: string;
};

export function Content({ pageKey }: Readonly<{ pageKey: PageKey }>) {
  const content = loadApi(pageKey, "en");

  if (Array.isArray(content)) {
    return (
      <div className={styles.content}>
        {content.map((item: Offer, index) => (
          <div key={index} className={styles.offer}>
            <h3 className={styles.title}>{item.title}</h3>
            <div className={styles.divider} />
            <p className={styles.description}>{item.content}</p>
          </div>
        ))}
      </div>
    );
  }

  return <div className={styles.content}>{content}</div>;
}
