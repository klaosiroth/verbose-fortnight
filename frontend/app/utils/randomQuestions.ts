import { Question } from '@/app/interfaces/question';

export const randomQuestions = (questions: Question[], count: number): Question[] => {
  return questions.sort(() => 0.5 - Math.random()).slice(0, count);
};
