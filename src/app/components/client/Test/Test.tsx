"use client";
import styles from "./Test.module.css";
import { TopicBlock } from "@/app/api/types";

export function Test({
  level,
  topic,
}: Readonly<{ level: string; topic?: TopicBlock }>) {
  return (
    <div className={`${styles.content} `}>
      <div className={styles.offer}>
        <p className={styles.title}>
          {level}. {topic?.title}
        </p>
        <p className={styles.description}>{topic?.content}</p>
      </div>
    </div>
  );
}
