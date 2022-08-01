import styles from '../styles/Result.module.css'
import { useRouter } from "next/router";
import Stats from '../components/Stats';
import Button from '../components/Button';
import useSound from 'use-sound';

export default function Result() {
  const router = useRouter();

  const total = +router.query.total!;
  const correct = +router.query.correct!;
  const percentual = Math.round((correct / total) * 100);
  const [playSwipe] = useSound('/sounds/swipe.mp3', { volume: 0.5 });

  function restartQuiz() {
    playSwipe();
    router.push({
      pathname: '/',
    });
  }

  return (
    <div className={styles.result}>
      <h1>Resultado</h1>
      <div style={{ display: 'flex' }}>
        <Stats text='Perguntas' value={total} />
        <Stats text='Acertou' value={correct} bgColor="#9CD2A4" />
        <Stats text='Percentual' value={`${percentual}%`} bgColor="#DE6A33" />
      </div>
      <Button onClick={() => restartQuiz()} text='Recomeçar jogo'></Button>
    </div>
  );
}