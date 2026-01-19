import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const SAFE_RE = /^[a-zA-Z0-9_.-]+$/;

function isSafeName(v: string) {
  return SAFE_RE.test(v);
}

function sanitizePath(p: string) {
  if (
    !p ||
    p.includes("..") ||
    p.startsWith("/") ||
    p.includes("\\") ||
    p.includes("://")
  ) {
    throw new Error("Invalid path");
  }
  return p;
}

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

  if (!isSafeName(owner) || !isSafeName(repo)) {
    return NextResponse.json({ error: "Invalid repo" }, { status: 400 });
  }

  let sanitize_path
  try {
    sanitize_path = sanitizePath(path);
  } catch {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  const base64Content = Buffer.from(content).toString("base64");

  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(sanitize_path)}`;

  // Try to fetch existing file (to get sha)
  const getRes = await fetch(
    apiUrl,
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
    apiUrl,
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
