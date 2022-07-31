import styles from '../styles/Stats.module.css';

interface StatsProps {
  value: any;
  text: string;
  bgColor?: string;
  textColor?: string;
}

export default function Stats(props: StatsProps) {
  return (
    <div className={styles.stats}>
      <div className={styles.value} style={{
        backgroundColor: props.bgColor ?? '#FDD60F',
        color: props.textColor ?? '#333',
      }}>
        {props.value}
      </div>
      <div className={styles.text}>{props.text}</div>
    </div>
  )
}