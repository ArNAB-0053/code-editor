import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const token = await getToken({ req });

  if (!token?.githubAccessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Getting it based on updated time (last updated on top)
  const res = await fetch("https://api.github.com/user/repos?sort=updated&direction=desc", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.githubAccessToken}`,
      Accept: "application/vnd.github+json",
    },
  });

  const data = await res.json();
  return NextResponse.json(data);
}