"use server";
import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const Exercises = z.object({
  exercises: z.array(
    z.object({
      question: z.string(),
      questionType: z.enum(["pick", "select", "write"]),
      answers: z.array(z.string()),
      validAnswer: z.string(),
    })
  ),
});

export type Exercise = {
  question: string;
  questionType: "pick" | "select" | "write";
  answers: string[];
  validAnswer: string;
};

export async function generateExercises(
  topic: string,
  level: string,
  locale: string
): Promise<Exercise[] | undefined> {
  const response = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini",
    store: false,
    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: `Представь что ты высококалифицированный преподаватель французского языка. Ты должен составит вопрос и 1 правильный ответ и 3 не правильных ответа на для определения уровня языка студента, ответить на него, сравнить с правильным ответом и оценить уровень. Уровень должен быть ${level}.  Если все правильно - покажи вопрос и ответ. Составь таким образом 8 вопросов. Родной язык студента ${localeToLanguage(
              locale.toUpperCase()
            )}`,
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: topic,
          },
        ],
      },
    ],
    response_format: zodResponseFormat(Exercises, "exercises"),
  });

  return response.choices[0].message.parsed?.exercises;
}

function localeToLanguage(locale: string): string {
  const map: { [key: string]: string } = {
    RU: "русского",
    EN: "английского",
    KA: "грузинского",
  };
  return map[locale];
}
