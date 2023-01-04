import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let id = req.body.id;
  let url = `https://avatars.dicebear.com/api/micah/${id}.svg?background=%23ffffff`;
  const response = await fetch(url);
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(response.body);
}
