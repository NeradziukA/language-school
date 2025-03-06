"use client";
import styles from "./Test.module.css";
import { TopicBlock } from "@/api/types";

export function Test({
  level,
  topic,
  exercises,
}: Readonly<{
  level: string;
  exercises?: {
    question: string;
    answers: string[];
  }[];
  topic?: TopicBlock;
}>) {
  if (!exercises) {
    return null;
  }

  return (
    <div className={`${styles.content} `}>
      <div className={styles.offer}>
        <div>
          <p className={styles.title}>
            {level}. {topic?.title}
          </p>
          <p className={styles.description}>{topic?.content}</p>
        </div>
      </div>
      {exercises?.map((exercise, index) => (
        <div className={`${styles.offer} `} key={index + exercise.question}>
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
