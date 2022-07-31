import QuestionModel from "../models/question";
import styles from '../styles/Quiz.module.css';
import Button from "./Button";
import Question from "./Question";

interface QuizProps {
  question: QuestionModel;
  finalQuestion: boolean;
  questionAnswered: (question: QuestionModel) => void;
  nextStep: () => void;
}

export default function Quiz(props: QuizProps) {

  function onResponse(index: number) {
    if (!props.question.answered) {
      props.questionAnswered(props.question.replyWith(index));
    }
  }

  return (
    <div className={styles.quiz}>
      {props.question ?
        <Question
          value={props.question}
          timeToReply={10}
          onResponse={onResponse}
          onTimesUp={props.nextStep}
        /> : false
      }
      <Button
        onClick={props.nextStep}
        text={props.finalQuestion ? 'Finalizar' : 'Próxima questão'}
      />
    </div>
  )
}