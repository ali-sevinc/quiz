import { useQuizContext } from "../store/QuizContext";
export default function Options() {
  const { questions, index, answer, handleAnsawer } = useQuizContext();
  const question = questions[index];
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
          onClick={() => handleAnsawer(index)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
