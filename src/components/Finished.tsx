import { useQuizContext } from "../store/QuizContext";

export default function Finished() {
  const { points, highScore, handleRestart, totalPoints } = useQuizContext();
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> of {totalPoints}
      </p>
      <p className="highscore">
        <span>HighScore is: {highScore}</span>
      </p>
      <button className="btn btn-ui" onClick={handleRestart}>
        Restart
      </button>
    </>
  );
}
