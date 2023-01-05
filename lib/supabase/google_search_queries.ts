import { supabase } from ".";

export async function getDiscussions(answerId) {
  const { data, error } = await supabase
    .from("google_search_queries")
    .select()
    .eq("answer_id", answerId);
  return data;
}

export async function insertSearchQuery(query) {
  const { data, error } = await supabase
    .from("google_search_queries")
    .upsert(query)
    .select();
  if (error) {
    console.error(error);
  }
  return data;
}

export async function searchSearchQuery({
  query,
}: {
  query: string;
}): Promise<{}[]> {
  query = query.split(" ").join(" & ");

  const { data, error } = await supabase
    .from("google_search_queries")
    .select()
    .textSearch("fts", query);

  return data ? data : [];
}
