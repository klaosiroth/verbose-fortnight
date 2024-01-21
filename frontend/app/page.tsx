'use client';

import { useCallback, useEffect, useState } from 'react';
import Question from '@/app/components/Question';
import Leaderboard from '@/app/components/Leaderboard';
import { Question as QuestionType } from '@/app/interfaces/question';
import { Leaderboard as LeaderboardType } from '@/app/interfaces/leaderboard';
import { randomQuestions } from '@/app/utils/randomQuestions';
import { _questions } from '@/app/data/questions';

const LEADERBOARD_KEY = 'leaderboard';
const TOTAL_QUESTIONS = 20;

export default function Home() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState<LeaderboardType[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    const shuffledQuestions = randomQuestions(_questions, TOTAL_QUESTIONS);
    setQuestions(shuffledQuestions);
    const storedLeaderboard = localStorage.getItem(LEADERBOARD_KEY);
    setLeaderboard(storedLeaderboard ? JSON.parse(storedLeaderboard) : []);
  }, []);

  const handleAnswer = useCallback(
    (selectedAnswer: string) => {
      const currentQuestion = questions[currentQuestionIndex];
      if (!currentQuestion) return;

      const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
      console.log(isCorrect ? 'Correct' : 'Incorrect');

      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < questions.length) {
        setCurrentQuestionIndex(nextIndex);
      } else {
        setQuizFinished(true);
        const finalScore = score + (isCorrect ? 1 : 0);
        updateLeaderboard(finalScore);
      }

      if (isCorrect) {
        setScore((prevScore) => prevScore + 1);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentQuestionIndex, questions, score]
  );

  const updateLeaderboard = (finalScore: number) => {
    try {
      const playerName = prompt('Enter your name for the leaderboard:') || 'Anonymous';
      const newEntry = { name: playerName, score: finalScore };
      const updatedLeaderboard = [...leaderboard, newEntry];
      updatedLeaderboard.sort((a, b) => b.score - a.score);

      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updatedLeaderboard));
      setLeaderboard(updatedLeaderboard);
    } catch (error) {
      console.error('Error updating leaderboard:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-4">
      {!quizFinished ? (
        <>
          {currentQuestionIndex < questions.length && (
            <Question
              question={questions[currentQuestionIndex]}
              onAnswer={handleAnswer}
            />
          )}
        </>
      ) : (
        <>
          <div className="text-2xl font-semibold">Quiz Finished! Your score: {score}</div>
          <Leaderboard leaderboard={leaderboard} />
        </>
      )}
    </main>
  );
}
