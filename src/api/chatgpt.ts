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
      answers: z.array(z.string()),
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
        content: `You are creating exercises for learning French. 
        The exercises should match the student's level. Level of students is ${level}. 
        Language for questions is ${localeToLanguage(locale.toUpperCase())}.
        Language for answers is French. 
        You will be given a topic for the tasks. You need to create 10 exercises. 
        For each exercise, you must provide 4 answer choices. 
        For translation exercises, you must use ${localeToLanguage(
          locale.toUpperCase()
        )} for questions, and French for answers. 
        For grammar exercises, you must provide the correct French grammar rule. 
        For vocabulary exercises, you must provide the correct definition.`,
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
    RU: "Russian",
    EN: "English",
    KA: "Georgian",
  };
  return map[locale];
}
