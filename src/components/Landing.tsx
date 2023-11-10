import { useQuizContext } from "../store/QuizContext";

export default function Landing() {
  const { dispatch, numQuestions } = useQuizContext();
  return (
    <div className="start">
      <h2>Welcome to the react queiz</h2>
      <h3>{numQuestions} questions to test your React knowladge</h3>
      <button
        onClick={() => dispatch({ type: "quiz/start" })}
        className="btn btn-ui"
      >
        Let's start
      </button>
    </div>
  );
}
