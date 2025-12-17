import { NextRequest, NextResponse } from "next/server";
import { appUrls } from "./config/navigation.config";

const BACKEND_URI = process.env.NEXT_PUBLIC_BACKEND_URI!;
const URI = `${BACKEND_URI}/api/user/me`;

export default async function proxy(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;
  const path = req.nextUrl.pathname;

  const publicRoutes = [appUrls.LOGIN, appUrls.REGISTER]; // PUBLIC ROUTES
  const isPublic = publicRoutes.includes(path);

  let isValid = false;

  if (token) {
    try {
      const res = await fetch(URI, {
        method: "GET",
        headers: {
          Cookie: `jwt=${token}`,
        },
      });
      isValid = res.ok;
    } catch (e) {
      console.error(e);
    }
  }

  if (isPublic && isValid) {
    return NextResponse.redirect(new URL(appUrls.PYTHON, req.url));
  }

  if (!isPublic && !isValid) {
    return NextResponse.redirect(new URL(appUrls.LOGIN, req.url));
  }

  return NextResponse.next();
}

// Protect only certain routes
export const config = {
  matcher: [
    // "/lang/:path*",
     "/auth/:path*"
    ],
};
