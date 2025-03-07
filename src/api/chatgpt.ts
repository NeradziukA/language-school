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

export async function generateExercises(
  topic: string,
  level: string,
  locale: string
) {
  const response = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini",
    store: true,
    messages: [
      {
        role: "system",
        content: `
        Ты создаешь упражнения для изучающих французский язык. 
        Необходимо создать 10 упражнений.
        Упражнения должны соответствовать уровню студента - ${level}. 
        Описания в заданиях должны быть на ${localeToLanguage(
          locale.toUpperCase()
        )}.
        Примеры в заданиях должны быть на французском языке. 
        Ответы в заданиях должны быть на французском языке.   
        Допускается 3 типа заданий: 
        выбрать правильный ответ из предложенных (4 задания, варианты предлагать), 
        вставить пропущенное слово (4 задания, варианты предлагать, место для вставки слова обозначить символами ___), 
        написать правильный ответ (2 задания, предоставить фразу для перевода, варианты не предлагать). 
        Предоставить правильный ответ. Личные вопросы не задавать.
`,
      },
      {
        role: "user",
        content: topic,
      },
    ],
    response_format: zodResponseFormat(Exercises, "exercises"),
  });

  return response.choices[0].message.parsed?.exercises;
}

function localeToLanguage(locale: string): string {
  const map: { [key: string]: string } = {
    RU: "русском",
    EN: "английском",
    KA: "грузинском",
  };
  return map[locale];
}
