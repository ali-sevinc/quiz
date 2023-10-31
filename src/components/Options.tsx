import { QuestionType } from "../App";
interface PropsType {
  question: QuestionType;
  answer: null | number;
  onAnwser: (index: number) => void;
}
export default function Options({ question, onAnwser, answer }: PropsType) {
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          key={option}
          disabled={answer !== null}
          className={`btn btn-option ${answer === index ? "answer" : ""} ${
            answer !== null
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          onClick={() => onAnwser(index)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
