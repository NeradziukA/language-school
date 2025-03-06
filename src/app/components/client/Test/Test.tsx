"use client";
import { useEffect, useState } from "react";
import styles from "./Test.module.css";
import { TopicBlock } from "@/api/types";
import { useI18n } from "@/app/locales/client";

export function Test({
  level,
  topic,
  exercisesLoader,
}: Readonly<{
  level: string;
  exercisesLoader: Promise<
    | {
        question: string;
        answers: string[];
      }[]
    | undefined
  >;
  topic?: TopicBlock;
}>) {
  const t = useI18n();
  const [exercises, setExercises] =
    useState<{ question: string; answers: string[] }[]>();

  useEffect(() => {
    async function loadExercices() {
      const data = await exercisesLoader;
      setExercises(data);
    }
    loadExercices();
  }, [exercisesLoader]);

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
