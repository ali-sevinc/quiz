interface PropsType {
  numQuestions: number;
  onStart: () => void;
}

export default function Landing({ numQuestions, onStart }: PropsType) {
  return (
    <div className="start">
      <h2>Welcome to the react queiz</h2>
      <h3>{numQuestions} questions to test your React knowladge</h3>
      <button onClick={onStart} className="btn btn-ui">
        Let's start
      </button>
    </div>
  );
}
