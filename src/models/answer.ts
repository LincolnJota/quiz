export default class AnswerModel {
  #value: string;
  #correct: boolean;
  #revealed: boolean;


  constructor(value: string, correct: boolean, revealed = false) {
    this.#value = value;
    this.#correct = correct;
    this.#revealed = revealed;
  }

  static correct(valor: string) {
    return new AnswerModel(valor, true);
  }

  static incorrect(valor: string) {
    return new AnswerModel(valor, false);
  }

  get value() {
    return this.#value;
  }

  get correct() {
    return this.#correct;
  }

  get revealed() {
    return this.#revealed;
  }

  show() {
    return new AnswerModel(this.#value, this.#correct, true);
  }

  static fromObject(model: AnswerModel): AnswerModel {
    return new AnswerModel(model.value, model.correct, model.revealed);
  }

  toObject() {
    return {
      value: this.#value,
      correct: this.#correct,
      revealed: this.#revealed,
    };
  }



}