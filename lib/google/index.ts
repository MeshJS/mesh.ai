import axios from "axios";

const instance = axios.create({
  baseURL: `/api/`,
  withCredentials: true,
});

export async function get(route: string) {
  return await instance
    .get(`${route}`)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
}

export async function googleQuery({ q }: { q: string }) {
  return await get(
    `https://www.googleapis.com/customsearch/v1?key=${process.env.NEXT_PUBLIC_GOOGLE_SEARCH}&cx=017576662512468239146:omuauf_lfve&cx=65b4c21458d534c1a&q=${q}`
  );
}
