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
        Упражнения должны соответствовать уровню студента ${level}. 
        Вопросы должны быть на ${localeToLanguage(locale.toUpperCase())} языке. 
        Ответы — на французском языке. Необходимо создать 10 упражнений.  
        Допускается 3 типа заданий: 
        выбрать правильный ответ из предложенных (4 задания, варианты предлагать), 
        вставить пропущенное слово (4 задания, варианты предлагать), 
        написать правильный ответ (2 задания, предоставить фразу для перевода, варианты не предлагать). 
        Предоставить правильный ответ. Избегай личных вопросов.
        Тема для заданий будет дана. 
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
    RU: "Русский",
    EN: "Английский",
    KA: "Грузинский",
  };
  return map[locale];
}
