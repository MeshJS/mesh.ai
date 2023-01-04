import { post } from "./";

export async function getProfileImage({ id }: { id: string }) {
  return await post(`user/profileimage`, { id });
}
