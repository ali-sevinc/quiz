interface PropsType {
  score: number;
  totalPoints: number;
  question: number;
  numQuestions: number;
}
export default function Progress({
  score,
  totalPoints,
  question,
  numQuestions,
}: PropsType) {
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
          {score}/{totalPoints}
        </strong>{" "}
        points
      </p>
    </header>
  );
}
