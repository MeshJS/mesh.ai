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
import { googleQuery } from "@lib/google";
import {
  insertSearchQuery,
  searchSearchQuery,
} from "@lib/supabase/google_search_queries";

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

  try {
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
            const newAnswer = await insertAnswer([
              {
                question: query,
                answer: responseText,
                question_hash: queryHash,
                category: "ai",
              },
            ]);
            if (newAnswer[0]) {
              answers.push(newAnswer[0]);
            }
          }
        }
      }
    }
  } catch (e) {}

  /** if have results directly from first results, get from google **/
  //@ts-ignore
  if (answers[0] && answers[0].fts) {
    try {
      //@ts-ignore
      await ftsToGoogleQuery(answers, answers[0].fts);
    } catch (e) {}
  }

  /** get more answers from database **/
  try {
    await getMoreAnswersFromDatabase(answers, query);
  } catch (e) {}

  /** prepare output **/
  const output = await formatOutput(answers, query);

  res.status(200).json(output);
}

async function formatOutput(answers, query) {
  /** remove duplicates **/
  const filteredAnswers = answers.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.question_hash === value.question_hash)
  );
  /** count number of records from database **/
  const numberAnswers = await countAnswers({ query: query });

  return { answers: filteredAnswers, numberAnswers };
}

async function getMoreAnswersFromDatabase(answers, query) {
  const answersFromDatabase: Answer[] = await searchAnswers({ query: query });
  answers.push(...answersFromDatabase);
}

async function ftsToGoogleQuery(answers, fts) {
  const myArray = fts.split(" ");
  let queryArray = myArray.map((keywordPair, i) => {
    return removeNonAlphanumeric(keywordPair.split(":")[0]);
  });
  let query = queryArray.join(" ");

  const existQuery = await searchSearchQuery({ query });

  if (existQuery.length > 0) {
    return true;
  }

  let thisquery = {
    query: query,
  };
  const savedQueryToDb = await insertSearchQuery(thisquery);

  if (savedQueryToDb) {
    console.log("query.ts google", query);

    const res = await googleQuery({ q: query });

    let answersToDatabase = [];
    if (res.status == 200) {
      for (let i in res.data.items) {
        let result = res.data.items[i];
        let answerText = "";
        if (result?.pagemap?.metatags[0]) {
          if (result?.pagemap?.metatags[0]["og:description"]) {
            answerText += `<p>${result?.pagemap?.metatags[0]["og:description"]}</p>`;
          }
        }
        if (result.snippet.includes("...")) {
          let snippetArray = result.snippet.split("...");
          if (snippetArray.length == 3) {
            answerText += `<p>${snippetArray[1].trim()}</p>`;
          } else if (snippetArray.length == 2 && snippetArray[0].length == 13) {
            answerText += `<p>${snippetArray[1].trim()}</p>`;
          } else {
            answerText += `<p>${result.snippet}</p>`;
          }
        } else {
          answerText += `<p>${result.snippet}</p>`;
        }

        const queryHash = hashCode(
          removeNonAlphanumeric(result.title.toLowerCase())
        );

        let answer = {
          question: result.title,
          answer: answerText,
          category: "goo",
          link: result.link,
          question_hash: queryHash,
        };
        //@ts-ignore
        answersToDatabase.push(answer);
      }

      const newAnswer = await insertAnswer(answersToDatabase);
      answers.push(...newAnswer);
    }
  }
}
