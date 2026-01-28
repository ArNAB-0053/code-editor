import { NextResponse } from "next/server";
import crypto from "crypto";
import { cookies } from "next/headers";
import { APP_URL, CONNECTION_GITHUB_ID, NODE_ENV } from "@/lib/env.export";

export async function GET() {
  const state = crypto.randomUUID();
  const cookieStore = await cookies();
  cookieStore.set("github_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: NODE_ENV === "production",
    path: "/",
    maxAge: 10 * 60, // 10 minutes
  });

  const params = new URLSearchParams({
    client_id: CONNECTION_GITHUB_ID,
    redirect_uri: `${APP_URL}/api/connect/github/callback`,
    scope: "read:user user:email repo workflow",
    state,
  });

  const githubAuthUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;

  return NextResponse.redirect(githubAuthUrl);
}
