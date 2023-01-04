import { supabase } from ".";

export async function getUserProfile(uid) {
  let { data, error, status } = await supabase
    .from("profiles")
    .select(`id, username, website, avatar_url, full_name, bio`)
    .eq("id", uid)
    .single();
  return data;
}

export async function updateUserProfile(profile) {
  const { data, error } = await supabase
    .from("profiles")
    .upsert(profile)
    .select();
  return data;
}
