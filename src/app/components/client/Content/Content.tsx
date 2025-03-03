"use client";
import { useEffect } from "react";
import { useCurrentLocale } from "@/app/locales/client";
import styles from "./Content.module.css";
import { loadApi, PageKey } from "@/app/api/loader";

type Offer = {
  title: string;
  content: string;
};

export function Content({ pageKey }: Readonly<{ pageKey: PageKey }>) {
  const locale = useCurrentLocale();
  const content = loadApi(pageKey, locale);

  useEffect(() => {
    const offers = document.querySelectorAll(`.${styles.offer}`);
    offers.forEach((offer, index) => {
      setTimeout(() => {
        offer.classList.add(styles.visible);
      }, index * 300);
    });
  }, [content]);

  if (Array.isArray(content)) {
    return (
      <div className={`${styles.content} ${styles.fadeIn}`}>
        {content.map((item: Offer, index) => (
          <div key={index} className={`${styles.offer}`}>
            <h3 className={styles.title}>{item.title}</h3>
            <div className={styles.divider} />
            <p className={styles.description}>{item.content}</p>
          </div>
        ))}
      </div>
    );
  }

  return <div className={`${styles.content} ${styles.fadeIn}`}>{content}</div>;
}
