import { NextRequest, NextResponse } from "next/server";
import { appUrls } from "./config/navigation.config";

const BACKEND_URI = process.env.NEXT_PUBLIC_BACKEND_URI!;

export default async function proxy(req: NextRequest) {
  const access_token = req.cookies.get("jwt")?.value;
  const refresh_token = req.cookies.get("refresh_token")?.value;

  const path = req.nextUrl.pathname;

  const publicRoutes = [appUrls.LOGIN, appUrls.REGISTER]; // PUBLIC ROUTES
  const isPublic = publicRoutes.includes(path);

  const isAuthenticated = !!(access_token || refresh_token)

  if (isPublic && isAuthenticated) {
    return NextResponse.redirect(new URL(appUrls.FILE, req.url));
  }

  if (!isPublic && !isAuthenticated) {
    return NextResponse.redirect(new URL(appUrls.LOGIN, req.url));
  }

  return NextResponse.next();
}

// Protect only certain routes - these are all protected routes
export const config = {
  matcher: [
    "/(auth|code|folders-and-files|all|shared-by-me|shared-with-me|trash|profile)/:path*",
  ],
};
