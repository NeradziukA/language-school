"use client";
import { useEffect, useState } from "react";
import styles from "./Test.module.css";
import { TopicBlock } from "@/api/types";
import { useCurrentLocale, useI18n } from "@/app/locales/client";
import { generateExercises } from "@/api/chatgpt";

export function Test({
  level,
  topic,
}: Readonly<{
  level: string;
  topic?: TopicBlock;
}>) {
  const t = useI18n();
  const locale = useCurrentLocale();
  const [lastLoad, setLastLoad] = useState(0);
  const [exercises, setExercises] =
    useState<{ question: string; answers: string[] }[]>();

  useEffect(() => {
    async function loadExercices(query: string) {
      const data = await generateExercises(query, level, locale);
      setExercises(data);
      setLastLoad(new Date().getTime());
    }
    const timestamp = new Date().getTime();
    if (lastLoad < timestamp - 1000 * 60 && topic?.content) {
      loadExercices(topic.content);
    }
  }, [lastLoad, topic, locale, level]);

  if (!exercises?.length) {
    return (
      <div className={`${styles.content}`}>
        <div className={styles.offer}>{t("exercisesLoading")}</div>
      </div>
    );
  }

  return (
    <div className={`${styles.content}`}>
      <div className={styles.offer}>
        <p className={styles.title}>
          {level}. {topic?.title}
        </p>
        <p className={styles.description}>{topic?.content}</p>
      </div>
      {exercises?.map((exercise, index) => (
        <div className={`${styles.offer}`} key={index + exercise.question}>
          <p className={styles.title}>{exercise.question}</p>
          <ul>
            {exercise.answers.map((answer, index) => (
              <li className={styles.list} key={index + answer}>
                {answer}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
