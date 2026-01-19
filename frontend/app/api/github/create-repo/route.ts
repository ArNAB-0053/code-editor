import { isSafeName } from "@/helper/github";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export interface createRepoRequest {
  repoName: string;
  owner: string;
}

export async function POST(req: Request) {
  const token = await getToken({ req });

  if (!token?.githubAccessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: createRepoRequest = await req.json();

  if (!isSafeName(body.owner) || !isSafeName(body.repoName)) {
    return NextResponse.json({ error: "Invalid repo" }, { status: 400 });
  }

  const res = await fetch("https://api.github.com/user/repos", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.githubAccessToken}`,
      Accept: "application/vnd.github+json",
    },
    body: JSON.stringify({
      name: body.repoName,
      private: false,
    }),
  });

  const apiUrl = `https://api.github.com/repos/${body.owner}/${body.repoName}/contents/README.md`

  await fetch(
    apiUrl,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token.githubAccessToken}`,
        Accept: "application/vnd.github+json",
      },
      body: JSON.stringify({
        message: "Initial commit",
        content: Buffer.from("# My Repo\n").toString("base64"),
        branch: "main",
      }),
    }
  );

  const data = await res.json();
  return NextResponse.json(data);
}
