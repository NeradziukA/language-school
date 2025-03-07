"use client";
import { useState } from "react";
import styles from "./Test.module.css";
import { TopicBlock } from "@/api/types";
import { useCurrentLocale, useI18n } from "@/app/locales/client";
import { Exercise } from "@/api/chatgpt";
import useTests from "@/hooks/useTests";

export function Test({
  level,
  topic,
}: Readonly<{
  level: string;
  topic?: TopicBlock;
}>) {
  const t = useI18n();
  const locale = useCurrentLocale();
  const [showValidAnswer, setShowValidAnswer] = useState<number | null>(null);

  const exercises: Exercise[] | undefined = useTests(
    topic?.content ?? "",
    level,
    locale
  );

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
            {/* {exercise.questionType} */}
          </ul>
          <div className={styles.validAnswerWrap}>
            {showValidAnswer !== index && (
              <button
                className={styles.validAnswer}
                onClick={() =>
                  setShowValidAnswer(showValidAnswer === index ? null : index)
                }
              >
                {t("showAnswer")}
              </button>
            )}
            {showValidAnswer === index && (
              <button
                className={styles.validAnswer}
                onClick={() => setShowValidAnswer(null)}
              >
                {exercise.validAnswer}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
