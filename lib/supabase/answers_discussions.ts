import { supabase } from ".";

export async function getDiscussions(answerId) {
  const { data, error } = await supabase
    .from("answers_discussions")
    .select()
    .eq("answer_id", answerId);
  return data;
}

export async function insertDiscussion(discussion) {
  const { data, error } = await supabase
    .from("answers_discussions")
    .insert(discussion)
    .select();
  return data;
}
