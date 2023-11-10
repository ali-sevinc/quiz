import {
  Dispatch,
  ReactNode,
  Reducer,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

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
  totalPoints: number;
  numQuestions: number;
  handleAnsawer: (index: number) => void;
  handleNext: () => void;
  handleRestart: () => void;
  dispatch: Dispatch<ActionType>;
};
const initialState: InitialType = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  time: 0,
  totalPoints: 0,
  numQuestions: 0,
  handleAnsawer: () => {},
  handleNext: () => {},
  handleRestart: () => {},
  dispatch: () => {},
};

const QuizContext = createContext(initialState);

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

export default function QuizContextProvider({
  children,
}: {
  children: ReactNode;
}) {
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
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        time,
        numQuestions,
        handleAnsawer,
        handleNext,
        handleRestart,
        totalPoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useQuizContext() {
  const quiz = useContext(QuizContext);
  return quiz;
}
