import { useEffect, useReducer, Reducer } from "react";

import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Landing from "./components/Landing";
import Questions from "./components/Questions";
import Progress from "./components/Progress";
import Finished from "./components/Finished";
import Timer from "./components/Timer";

export type QuestionType = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};
export type ActionType = {
  type:
    | "questions/set"
    | "questions/failed"
    | "quiz/start"
    | "quiz/answer"
    | "quiz/next"
    | "quiz/finish"
    | "quiz/restart"
    | "timer";
  questions?: QuestionType[];
  payload?: number;
};
type InitialType = {
  questions: QuestionType[];
  status: "loading" | "error" | "ready" | "active" | "finished";
  index: number;
  answer: null | number;
  points: number;
  highScore: number;
  time: number;
};
const initialState: InitialType = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  time: 0,
};

const secondsPerQuestion = 10;

function reducer(state: InitialType, action: ActionType) {
  switch (action.type) {
    case "questions/failed":
      return { ...state, status: "error" } as InitialType;
    case "questions/set":
      return {
        ...state,
        questions: action.questions,
        status: "ready",
        time: secondsPerQuestion * action.questions!.length,
      } as InitialType;
    case "quiz/start":
      return {
        ...state,
        status: "active",
      } as InitialType;
    case "quiz/answer":
      return {
        ...state,
        answer: action.payload,
        points:
          state.questions[state.index].correctOption === action.payload
            ? state.points + state.questions[state.index].points
            : state.points,
      } as InitialType;
    case "quiz/next":
      return {
        ...state,
        answer: null,
        index: state.index + 1,
      } as InitialType;
    case "quiz/finish":
      return {
        ...state,
        answer: null,
        status: "finished",
        highScore:
          state.highScore > state.points ? state.highScore : state.points,
      } as InitialType;
    case "timer":
      return {
        ...state,
        time: state.time - 1,
      } as InitialType;
    case "quiz/restart":
      return {
        ...state,
        index: 0,
        status: "ready",
        answer: null,
        points: 0,
        time: state.questions!.length * secondsPerQuestion,
      } as InitialType;
    default:
      return state;
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, highScore, time },
    dispatch,
  ] = useReducer<Reducer<InitialType, ActionType>>(reducer, initialState);

  const numQuestions = questions.length;
  const totalPoints = questions.reduce((acc, quest) => acc + quest.points, 0);

  useEffect(function () {
    async function getQuestions() {
      const res = await fetch("http://localhost:8000/questions");
      if (!res.ok) return dispatch({ type: "questions/failed" });
      const data = await res.json();
      dispatch({
        type: "questions/set",
        questions: data,
      });
    }
    getQuestions();
  }, []);

  function handleAnsawer(index: number) {
    dispatch({ type: "quiz/answer", payload: index });
  }
  function handleNext() {
    if (index < numQuestions - 1) {
      dispatch({ type: "quiz/next" });
    }
    if (index >= numQuestions - 1) {
      dispatch({ type: "quiz/finish" });
    }
  }
  function handleRestart() {
    dispatch({ type: "quiz/restart" });
  }

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <Landing
            onStart={() => dispatch({ type: "quiz/start" })}
            numQuestions={numQuestions}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              question={answer === null ? index : index + 1}
              numQuestions={numQuestions}
              score={points}
              totalPoints={totalPoints}
            />
            <Questions
              onAnswer={handleAnsawer}
              question={questions[index]}
              answer={answer}
            />
            <div>
              <Timer dispatch={dispatch} time={time} />
              {answer !== null && (
                <button onClick={handleNext} className="btn btn-ui">
                  {index === numQuestions - 1 ? "Finish" : "Next"}
                </button>
              )}
            </div>
          </>
        )}
        {status === "finished" && (
          <Finished
            onRestart={handleRestart}
            points={points}
            maxPoints={totalPoints}
            highScore={highScore}
          />
        )}
      </Main>
    </div>
  );
}
