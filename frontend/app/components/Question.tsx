import { Question as QuestionType } from '@/app/interfaces/question';

interface Props {
  question: QuestionType;
  onAnswer: (answer: string) => void;
}

export default function Question({ question, onAnswer }: Props) {
  return (
    <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">{question.text}</h2>
      {question.answers.map((answer, index) => (
        <button
          className="px-4 py-2 bg-orange-300 rounded-lg mr-3 mb-3"
          key={index}
          onClick={() => onAnswer(answer)}
        >
          {answer}
        </button>
      ))}
    </div>
  );
}
