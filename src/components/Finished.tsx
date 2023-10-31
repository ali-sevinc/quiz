interface PropsType {
  onRestart: () => void;
  points: number;
  maxPoints: number;
  highScore: number;
}
export default function Finished({
  maxPoints,
  onRestart,
  points,
  highScore,
}: PropsType) {
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> of {maxPoints}
      </p>
      <p className="highscore">
        <span>HighScore is: {highScore}</span>
      </p>
      <button className="btn btn-ui" onClick={onRestart}>
        Restart
      </button>
    </>
  );
}
