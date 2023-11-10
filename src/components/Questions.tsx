import { useQuizContext } from "../store/QuizContext";
import Options from "./Options";

export default function Questions() {
  const { questions, index } = useQuizContext();
  return (
    <div>
      <h4>{questions[index].question}</h4>
      <Options />
    </div>
  );
}
