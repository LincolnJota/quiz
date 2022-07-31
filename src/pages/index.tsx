import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from '../components/Button';
import Question from '../components/Question'
import Quiz from '../components/Quiz';
import AnswerModel from '../models/answer'
import QuestionModel from '../models/question'

const questionMock = new QuestionModel(1, "Melhor Cor?", [
  AnswerModel.incorrect("Vermelho"),
  AnswerModel.incorrect("Azul"),
  AnswerModel.correct("Verde"),
  AnswerModel.incorrect("Amarelo")
]);

const BASE_URL = 'http://localhost:3000/api';

const text = `
{
	"id": 204,
	"statement": "Qual é o triângulo que tem todos os lados diferentes?",
	"answered": false,
	"correctAnswer": false,
	"answers": [{
		"value": "Equilátero",
		"correct": false,
		"revealed": false
	}, {
		"value": "Escaleno",
		"correct": true,
		"revealed": false
	}, {
		"value": "Trapézio",
		"correct": false,
		"revealed": false
	}, {
		"value": "Isóceles",
		"correct": false,
		"revealed": false
	}]
}`;

export default function Home() {
  const router = useRouter();

  const [questionIds, setQuestionIds] = useState<number[]>([]);
  const [question, setQuestion] = useState<QuestionModel>(questionMock);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);


  async function loadQuestionIds() {
    const resp = await fetch(`${BASE_URL}/quiz`);
    const ids = await resp.json();
    setQuestionIds(ids);
  }

  async function loadQuestion(id: number) {
    const resp = await fetch(`${BASE_URL}/questions/${id}`);
    const json = await resp.json();

    const question = QuestionModel.fromObject(json);
    setQuestion(question);

  }

  useEffect(() => {
    loadQuestionIds();
  }, []);

  useEffect(() => {
    questionIds.length > 0 && loadQuestion(questionIds[0]);
  }, [questionIds]);


  function questionAnswered(question: QuestionModel) {
    setQuestion(question);
    const correct = question.correctAnswer;
    setCorrectAnswers(correctAnswers + (correct ? 1 : 0));
  }

  function nextQuestionId() {
    if (question) {
      const nextInt = questionIds.indexOf(question.id) + 1;
      return questionIds[nextInt];
    }
  }

  function nextStep() {
    const nextId = nextQuestionId();
    nextId ? nextQuestion(nextId) : endQuiz();
  }

  function nextQuestion(nextId: number) {
    loadQuestion(nextId);
  }

  function endQuiz() {
    router.push({
      pathname: '/result',
      query: {
        total: questionIds.length,
        correct: correctAnswers
      }
    });
  }

  return question ? (
    <Quiz
      question={question}
      finalQuestion={nextQuestionId() ? false : true}
      questionAnswered={questionAnswered}
      nextStep={nextStep}
    />
  ) : false
}
