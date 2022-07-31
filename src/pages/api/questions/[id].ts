import questions from "../QuestionsDB";

export default (req: any, res: any) => {

  const selectedId = +req.query.id;
  // console.log(questions[+req.query.id]?.id);

  const uniqueQuestion = questions.filter(question => question.id === selectedId);


  if (uniqueQuestion.length === 1) {
    const selectedQuestion = uniqueQuestion[0].randomizeAnswers();
    res.status(200).json(selectedQuestion.toObject());
  } else {
    res.status(204).send();
  }


}