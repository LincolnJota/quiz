import { RandomizeArray } from "../functions/arrays";
import AnswerModel from "./answer";

export default class QuestionModel {

  #id: number;
  #statement: string;
  #answers: AnswerModel[];
  #correctAnswer: boolean;

  constructor(id: number, statement: string, answers: any[], correctAnswer = false) {
    this.#id = id;
    this.#statement = statement;
    this.#answers = answers;
    this.#correctAnswer = correctAnswer;
  }

  get id() {
    return this.#id;
  }

  get statement() {
    return this.#statement;
  }

  get answers() {
    return this.#answers;
  }

  get correctAnswer() {
    return this.#correctAnswer;
  }

  get answered() {
    for (const answer of this.#answers) {
      if (answer.revealed) return true;

    }
    return false;
  }

  replyWith(id: number): QuestionModel {
    const correct = this.#answers[id]?.correct;
    const answers = this.#answers.map((resp, i) => {
      const selectedAnswer = id === i;
      const shouldReveal = selectedAnswer || resp.correct;
      return shouldReveal ? resp.show() : resp;
    });
    return new QuestionModel(this.#id, this.#statement, answers, correct);
  }

  randomizeAnswers() {
    let randomizedAnswers = RandomizeArray(this.#answers);
    return new QuestionModel(this.#id, this.#statement, randomizedAnswers, this.#correctAnswer);
  }

  static fromObject(model: QuestionModel): QuestionModel {
    const answers = model.answers.map(answer => AnswerModel.fromObject(answer));
    return new QuestionModel(model.id, model.statement, answers, model.correctAnswer);
  }

  toObject() {
    return {
      id: this.#id,
      statement: this.#statement,
      answered: this.answered,
      correctAnswer: this.#correctAnswer,
      answers: this.#answers.map(answer => answer.toObject()),
    };
  }

}