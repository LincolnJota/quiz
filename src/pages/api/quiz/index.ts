import { RandomizeArray } from "../../../functions/arrays";
import questions from "../QuestionsDB";

export default (req: any, res: any) => {

  // Randomly placing the order of ids in the array.
  const questionsId = questions.map(question => question.id);


  const randomizedQuestionIds = RandomizeArray(questionsId);

  res.status(200).json(randomizedQuestionIds);
}