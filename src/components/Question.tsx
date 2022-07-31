import styles from '../styles/Question.module.css';
import QuestionModel from "../models/question";
import Statement from './Statement';
import Answer from './Answer';
import Timer from './Timer';

const letters = [
  { letter: 'A', backgroundColor: '#f2C866' },
  { letter: 'B', backgroundColor: '#f266ba' },
  { letter: 'C', backgroundColor: '#85b4f2' },
  { letter: 'D', backgroundColor: '#BCE596' },
]

interface QuestionProps {
  value: QuestionModel;
  timeToReply?: number;
  onResponse: (index: number) => void;
  onTimesUp: () => void;
}

export default function Question(props: QuestionProps) {
  const question = props.value;

  function renderAnswer() {
    return question.answers.map((answer, i) => {
      return <Answer
        key={`${question.id}-${i}`}
        index={i}
        value={answer}
        letter={letters[i].letter}
        letterBackgroundColor={letters[i].backgroundColor}
        onResponse={props.onResponse}
      />
    });
  }

  return (
    <div className={styles.question}>
      <Statement text={question.statement} />
      <Timer key={question.id} duration={props.timeToReply ?? 10} onComplete={props.onTimesUp} />
      {renderAnswer()}
    </div>
  )


}