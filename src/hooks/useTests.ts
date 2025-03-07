import { Exercise, generateExercises } from "@/api/chatgpt";
import { useState, useEffect } from "react";
const queryCache: {
  query?: string;
  timestamp: number;
} = {
  query: undefined,
  timestamp: 0,
};

const useTests = (topic: string, level: string, locale: string) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const timestamp = new Date().getTime();

    const fetchData = async () => {
      const data: Exercise[] | undefined = await generateExercises(
        topic,
        level,
        locale
      );
      setExercises(data || []);
    };

    if (
      queryCache.query === JSON.stringify({ topic, level, locale }) &&
      queryCache.timestamp > timestamp - 1000 * 60
    ) {
      return;
    }

    queryCache.timestamp = new Date().getTime();
    queryCache.query = JSON.stringify({ topic, level, locale });

    fetchData();
  }, [topic, level, locale]);

  return exercises;
};

export default useTests;
