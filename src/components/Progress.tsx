import { useQuizContext } from "../store/QuizContext";

export default function Progress() {
  const { answer, index, points, totalPoints, numQuestions } = useQuizContext();
  const question = answer === null ? index : index + 1;

  return (
    <header className="progress">
      <progress value={question} max={numQuestions} />
      <p>
        Question:{" "}
        <strong>
          {question + 1}/{numQuestions}
        </strong>
      </p>
      <p>
        <strong>
          {points}/{totalPoints}
        </strong>{" "}
        points
      </p>
    </header>
  );
}
