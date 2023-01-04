import { supabase } from ".";

export async function insertAnswerEdited(answer) {
  const { data, error } = await supabase
    .from("answers_edited")
    .upsert(answer)
    .select();
  return data;
}
