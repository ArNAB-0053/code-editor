import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const token = await getToken({ req });

  if (!token?.githubAccessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const {
    owner,
    repo,
    path,
    content,
    message = "Add file",
  } = await req.json();

  const base64Content = Buffer.from(content).toString("base64");

  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token.githubAccessToken}`,
        Accept: "application/vnd.github+json",
      },
      body: JSON.stringify({
        message,
        content: base64Content,
        branch: "main"
      }),
    }
  );

  const data = await res.json();
  return NextResponse.json(data);
}
