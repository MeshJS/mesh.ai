import type { Answer } from "types";
import { pageSize } from "config/search";
import { supabase } from ".";

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const from = page ? page * limit : 0;
  const to = page ? from + size - 1 : size - 1;
  return { from, to };
};

export async function insertAnswer(answer: Answer[]): Promise<Answer[]> {
  const { data, error } = await supabase
    .from("answers")
    .upsert(answer)
    .select();
  if (error) {
    console.error(error);
  }
  return data!;
}

export async function searchAnswers({
  query,
  page = 0,
  size = pageSize,
}: {
  query: string;
  page?: number;
  size?: number;
}): Promise<Answer[]> {
  query = query.split(" ").join(" | ");

  const { from, to } = getPagination(page, size);

  const { data, error } = await supabase
    .from("view_answers")
    .select()
    .textSearch("fts", query)
    .order("score", { ascending: false })
    .range(from, to);

  return data as Answer[];
}

export async function countAnswers({ query }: { query: string }) {
  query = query.split(" ").join(" | ");
  const { data, error } = await supabase
    .from("view_answers")
    .select("id", { count: "exact" })
    .textSearch("fts", query)
    .limit(1000);
  return data ? data.length : 0;
}

export async function getAnswerByHash({
  hash,
}: {
  hash: number;
}): Promise<Answer[]> {
  const { data, error } = await supabase
    .from("view_answers")
    .select()
    .eq("question_hash", hash)
    .limit(10);

  return data as Answer[];
}

export async function userVoteAnswer({
  answerId,
  vote,
  uid,
}: {
  answerId: number;
  vote: boolean;
  uid: string;
}) {
  const { data, error } = await supabase
    .from("answers_votes")
    .upsert({ answer_id: answerId, user_id: uid, vote: vote ? 1 : -1 })
    .select();

  if (error) {
    console.error(error);
  }
  return data;
}
