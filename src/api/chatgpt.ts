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

function getPrompt(taskLanguage: string, locale: string, level: string) {
  if (taskLanguage === "fr") {
    return `
        Ты создаешь упражнения для изучающих французский язык. 
        Необходимо создать 10 упражнений.
        Упражнения должны соответствовать уровню студента - ${level}. 
        Описания в заданиях должны быть на ${locale}.
        Примеры в заданиях должны быть на французском языке. 
        Ответы в заданиях должны быть на французском языке.   
        Допускается 3 типа заданий: 
        выбрать правильный ответ из предложенных (4 задания, варианты предлагать), 
        вставить пропущенное слово (4 задания, варианты предлагать, место для вставки слова обозначить символами ___), 
        написать правильный ответ (2 задания, предоставить фразу для перевода, варианты не предлагать). 
        Предоставить правильный ответ. Личные вопросы не задавать. 
        Тема заданий должна сответствовать запросу пользователя.
`;
  }
  if (taskLanguage === "ru") {
    return `
        Ты создаешь упражнения для изучающих русский язык. 
        Необходимо создать 10 упражнений.
        Упражнения должны соответствовать уровню студента - ${level}. 
        Описания в заданиях должны быть на ${locale}.
        Примеры в заданиях должны быть на русском языке. 
        Ответы в заданиях должны быть на русском языке.   
        Допускается 3 типа заданий: 
        выбрать правильный ответ из предложенных (4 задания, варианты предлагать), 
        вставить пропущенное слово (4 задания, варианты предлагать, правильный ответ только один, место для вставки слова обозначить символами ___), 
        написать правильный ответ (2 задания, предоставить фразу для перевода, варианты не предлагать). 
        Предоставить правильный ответ. Личные вопросы не задавать. 
        Тема заданий должна сответствовать запросу пользователя.
`;
  }
  if (taskLanguage === "ka") {
    return `
        Ты создаешь упражнения для изучающих грузинский язык. 
        Необходимо создать 10 упражнений.
        Упражнения должны соответствовать уровню студента - ${level}. 
        Описания в заданиях должны быть на ${locale}.
        Примеры в заданиях должны быть на грузинском языке. 
        Ответы в заданиях должны быть на грузинском языке.   
        Допускается 3 типа заданий: 
        выбрать правильный ответ из предложенных (4 задания, варианты предлагать), 
        вставить пропущенное слово (4 задания, варианты предлагать, место для вставки слова обозначить символами ___), 
        написать правильный ответ (2 задания, предоставить фразу для перевода, варианты не предлагать). 
        Предоставить правильный ответ. Личные вопросы не задавать. 
        Тема заданий должна сответствовать запросу пользователя.
`;
  }
  return "";
}
