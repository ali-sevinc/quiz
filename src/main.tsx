import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import QuizContextProvider from "./store/QuizContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QuizContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </QuizContextProvider>
);
