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
    message = "Update file",
  } = await req.json();

  const base64Content = Buffer.from(content).toString("base64");

  // Try to fetch existing file (to get sha)
  const getRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    {
      headers: {
        Authorization: `Bearer ${token.githubAccessToken}`,
        Accept: "application/vnd.github+json",
      },
    }
  );

  let sha: string | undefined;

  if (getRes.ok) {
    const existingFile = await getRes.json();
    sha = existingFile.sha;
  }

  // Create or update file
  const putRes = await fetch(
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
        branch: "main",
        ...(sha ? { sha } : {}),
      }),
    }
  );

  const data = await putRes.json();

  if (!putRes.ok) {
    return NextResponse.json(data, { status: putRes.status });
  }

  return NextResponse.json(data);
}
