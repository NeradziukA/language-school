"use client";
import { ReactNode, useEffect } from "react";
import { useCurrentLocale } from "@/app/locales/client";
import styles from "./Content.module.css";
import { loadApi, PageKey } from "@/app/api/loader";

type Offer = {
  title: string;
  content: string;
  link?: { href: string; label: string };
};

export function Content({
  pageKey,
  options = {},
}: Readonly<{ pageKey: PageKey; options?: { extra?: ReactNode } }>) {
  const locale = useCurrentLocale();
  const content = loadApi(pageKey, locale);
  const { extra } = options;

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
          <div key={item.title + index} className={`${styles.offer}`}>
            <h3 className={styles.title}>{item.title}</h3>
            <div className={styles.divider} />
            <p className={styles.description}>{item.content}</p>
            <div className={styles.footer}>
              <p className={styles.extra}>{extra}</p>
              {item.link && (
                <a href={item.link.href} className={styles.link}>
                  {item.link.label}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return <div className={`${styles.content} ${styles.fadeIn}`}>{content}</div>;
}
