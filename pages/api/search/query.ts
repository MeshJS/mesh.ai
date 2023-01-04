import { dataToMesh } from "@lib/mesh";
import { createCompletion } from "@lib/openai/createCompletion";
import { createCompletionMesh } from "@lib/openai/createCompletionMesh";
import {
  countAnswers,
  getAnswerByHash,
  insertAnswer,
  searchAnswers,
} from "@lib/supabase";
import { Answer } from "types";
import type { NextApiRequest, NextApiResponse } from "next";
import { hashCode } from "utils/hashCode";
import { removeNonAlphanumeric } from "utils/removeNonAlphanumeric";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let query = req.body.query;

  const answers: Answer[] = [];

  /** clean query and make hash **/
  query = query.trim();
  const queryHash = hashCode(removeNonAlphanumeric(query.toLowerCase()));

  const existingAnswers = await getAnswerByHash({ hash: queryHash });
  answers.push(...existingAnswers);

  if (existingAnswers.length === 0) {
    /** get from open AI **/
    if (query.includes("mesh")) {
      const responseOpenAi = await createCompletionMesh(query);
      if (responseOpenAi.choices!.length > 0) {
        // const newAnswer = await insertAnswer({
        //   question: query,
        //   answer: dataToMesh(responseOpenAi.choices![0].text!),
        //   question_hash: queryHash,
        //   category: "mesh",
        // });
        const newAnswer = {
          question: query,
          answer: dataToMesh(responseOpenAi.choices![0].text!),
          question_hash: queryHash,
          category: "mesh",
        };
        answers.push(newAnswer);
      }
    } else {
      const responseOpenAi = await createCompletion(query);
      if (responseOpenAi.choices.length > 0) {
        const responseText = responseOpenAi.choices[0].text!.trim();
        if (responseText != "Unknown.") {
          const newAnswer = await insertAnswer({
            question: query,
            answer: responseText,
            question_hash: queryHash,
          });
          answers.push(newAnswer);
        }
      }
    }
  }

  /** get more answers from database **/
  const answersFromDatabase: Answer[] = await searchAnswers({ query: query });
  answers.push(...answersFromDatabase);

  /** remove duplicates **/
  const filteredAnswers = answers.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.question_hash === value.question_hash)
  );

  const numberAnswers = await countAnswers({ query: query });

  res.status(200).json({ answers: filteredAnswers, numberAnswers });
}
