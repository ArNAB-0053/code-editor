import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ISocialModal } from "@/@types/social";
import {
  APP_URL,
  CONNECTION_GITHUB_ID,
  CONNECTION_GITHUB_SECRET,
} from "@/lib/env.export";
import { BACKEND_URI } from "@/lib/axios-instance";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code || !state) {
      return NextResponse.redirect(
        `${APP_URL}/settings/integrations?error=github`,
      );
    }

    /* -----------------------------
       Validate CSRF state
    ------------------------------ */
    const cookieStore = await cookies();
    const storedState = cookieStore.get("github_oauth_state")?.value;

    // console.log("[] => cookieStore", cookieStore);
    // console.log("[] => storedState", storedState);

    if (!storedState || storedState !== state) {
      return NextResponse.redirect(
        `${APP_URL}/settings/integrations?error=csrf`,
      );
    }

    // cleanup state cookie
    cookieStore.delete("github_oauth_state");

    /* -----------------------------
       Get logged-in user
    ------------------------------ */
    const token = cookieStore.get("jwt")?.value;
    const res = await fetch(`${BACKEND_URI}/api/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const me = await res.json();
    const userId = me?.userId;

    // console.log("[] => me => ", me);
    // console.log("[] => userId => ", userId);

    /* -----------------------------
       Exchange code → access token
    ------------------------------ */
    const tokenRes = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: CONNECTION_GITHUB_ID,
          client_secret: CONNECTION_GITHUB_SECRET,
          code,
        }),
      },
    );

    const tokenData = await tokenRes.json();

    // console.log("[] => GitHub token response:", tokenData);

    if (!tokenData.access_token) {
      return NextResponse.redirect(
        `${APP_URL}/settings/integrations?error=token`,
      );
    }

    const accessToken = tokenData.access_token;
    const scope = tokenData.scope ?? "";

    /* -----------------------------
       Fetch GitHub user info
    ------------------------------ */
    const githubUserRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github+json",
      },
    });
    const githubUser = await githubUserRes.json();
    // console.log("[] => githubUser:", githubUser);

    const githubUsername = githubUser.login;
    const avatar = githubUser?.avatar_url;
    const fullName = githubUser?.name;

    if (!githubUser?.id) {
      return NextResponse.redirect(
        `${APP_URL}/settings/integrations?error=user`,
      );
    }

    /* -----------------------------
        Save to C# backend
    ------------------------------ */
    const payload: ISocialModal = {
      UserId: userId,
      GithubUsername: githubUsername ?? "",
      AvatarUrl: avatar,
      GithubFullName: fullName ?? "",
      Provider: "github",
      ProviderId: githubUser.id.toString(),
      AccessToken: accessToken, 
      Scope: scope,
    };
    const saveRes = await fetch(`${BACKEND_URI}/api/social`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: req.headers.get("jwt") ?? "",
      },
      body: JSON.stringify(payload),
    });

    if (!saveRes.ok) {
      await saveRes.text();
      throw new Error("[] => Failed to save GitHub connection");
    }

    /* -----------------------------
        Redirect back to UI
    ------------------------------ */
    return NextResponse.redirect(
      `${APP_URL}/settings/integrations?success=github`,
    );
  } catch (err) {
    return NextResponse.redirect(
      `${APP_URL}/settings/integrations?error=github`,
    );
  }
}
