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
        content: `
        Для изучения французского языка на уровне - ${level} 
        Создай 7 заданий - вставить пропущенное слово из 4 предложенных, личные вопросы не задавать, вместо пропущенных слов вставь только ___ и 3 задания перевести на французский с ${localeToLanguage(
          locale.toUpperCase()
        )} языка, варианты не предлагать.
        Не пиши что требуется сделать в задании. Предоставить правильный ответ.`,
      },

      {
        role: "user",
        temperature: 0.1,
        content: topic,
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
