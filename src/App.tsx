import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Landing from "./components/Landing";
import Questions from "./components/Questions";
import Progress from "./components/Progress";
import Finished from "./components/Finished";
import Timer from "./components/Timer";
import { useQuizContext } from "./store/QuizContext";

export type QuestionType = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

export default function App() {
  const { status, answer, handleNext, index, numQuestions } = useQuizContext();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <Landing />}
        {status === "active" && (
          <>
            <Progress />
            <Questions />
            <div>
              <Timer />
              {answer !== null && (
                <button onClick={handleNext} className="btn btn-ui">
                  {index === numQuestions - 1 ? "Finish" : "Next"}
                </button>
              )}
            </div>
          </>
        )}
        {status === "finished" && <Finished />}
      </Main>
    </div>
  );
}
