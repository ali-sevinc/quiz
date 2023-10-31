import { ChangeEvent, useReducer } from "react";

type InitialType = {
  count: number;
  step: number;
};
type ActionType = {
  type: "increment" | "decrement" | "step" | "count" | "reset";
  payload?: number;
};

const initialState: InitialType = {
  count: 0,
  step: 1,
};

function stepReducer(state: InitialType, action: ActionType) {
  switch (action.type) {
    case "count":
      return {
        ...state,
        count: action.payload!,
      };
    case "step":
      return {
        ...state,
        step: action.payload!,
      };
    case "increment":
      return {
        ...state,
        count: state.count + state.step,
      };
    case "decrement":
      return {
        ...state,
        count: state.count - state.step,
      };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(stepReducer, initialState);

  const { count, step } = state;

  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "decrement" });
  };

  const inc = function () {
    dispatch({ type: "increment" });
  };

  const defineCount = function (e: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "count", payload: Number(e.target.value) });
  };

  const defineStep = function (e: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "step", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
