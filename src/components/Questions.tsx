import { QuestionType } from "../App";
import Options from "./Options";

interface PropsType {
  question: QuestionType;
  answer: null | number;
  onAnswer: (index: number) => void;
}
export default function Questions({ question, onAnswer, answer }: PropsType) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} onAnwser={onAnswer} answer={answer} />
    </div>
  );
}
