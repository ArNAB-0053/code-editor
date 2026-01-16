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

  const body: createRepoProps = await req.json();

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

  await fetch(
    `https://api.github.com/repos/${body.owner}/${body.repoName}/contents/README.md`,
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
