import { useEffect } from "react";
import { useQuizContext } from "../store/QuizContext";

export default function Timer() {
  const { time, dispatch } = useQuizContext();

  const min = Math.floor(time / 60);
  const sec = time % 60;

  useEffect(
    function () {
      const timer = setInterval(() => {
        dispatch({ type: "timer" });
      }, 1000);
      if (time <= 0) {
        dispatch({ type: "quiz/finish" });
      }
      return () => {
        clearInterval(timer);
      };
    },
    [time, dispatch]
  );

  return (
    <div className="timer">
      <p>
        {min > 9 ? min : "0" + min}:{sec > 9 ? sec : "0" + sec}
      </p>
    </div>
  );
}
