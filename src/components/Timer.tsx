import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import styles from '../styles/Timer.module.css';

interface TimerProps {
  duration: number;
  onComplete: () => void;
}

export default function Timer(props: TimerProps) {
  return (
    <div className={styles.timer}>
      <CountdownCircleTimer
        size={120}
        isPlaying
        duration={props.duration}
        onComplete={props.onComplete}
        colors={['#BCE596', '#F7B801', '#ED827A']}
        colorsTime={[10, 5, 0]}

      >{({ remainingTime }) => remainingTime}</CountdownCircleTimer>
    </div>
  )
}