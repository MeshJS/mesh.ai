import { post } from "./";

export async function searchQuery({ query }: { query: string }) {
  return await post(`search/query`, { query });
}

export async function searchResultVote({
  answer,
  vote,
}: {
  answer: {};
  vote: boolean;
}) {
  return await post(`search/resultvote`, { answer, vote });
}
