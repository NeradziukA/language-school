import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

const exercisesCache = {
  timestamp: 0,
  exercises: [] as { question: string; answers: string[] }[] | undefined,
};

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
  const timestamp = Date.now();

  if (exercisesCache.timestamp > timestamp - 1000 * 30) {
    return exercisesCache.exercises;
  }

  exercisesCache.timestamp = timestamp;
  const response = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini",
    store: true,
    messages: [
      {
        role: "system",
        content: `You are creating exercises for learning French. 
        The exercises should match the student's level. Level of students is ${level}. 
        Locale for questions is ${locale.toUpperCase()}. Locale for answers is FR. 
        You will be given a topic for the tasks. You need to create 10 exercises. 
        For each exercise, you must provide 4 answer choices. 
        For translation exercises, you must provide for question the locale ${locale.toUpperCase()} and for answer the locale FR. 
        For grammar exercises, you must provide the correct grammar rule. 
        For vocabulary exercises, you must provide the correct definition.`,
      },
      {
        role: "user",
        content: topic,
      },
    ],
    response_format: zodResponseFormat(Exercises, "exercises"),
  });
  exercisesCache.exercises = response.choices[0].message.parsed?.exercises;
  return exercisesCache.exercises;
}
