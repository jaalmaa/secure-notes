import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export type RequestCookie = {
  name: string;
  value: string;
};

export async function validateJWT(authCookie: RequestCookie): Promise<Boolean> {
  const secret = new TextEncoder().encode(process.env.JWT_SIGNING_SECRET);
  const jwt: string = authCookie.value;
  try {
    const { payload } = await jwtVerify(jwt, secret);
    return true;
  } catch (err) {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  // handle /notes endpoint (redirect to login if user is not logged in or does not have a valid token)
  if (request.nextUrl.pathname.startsWith("/notes")) {
    const authCookie = cookies().get("Authorization");
    if (!authCookie)
      return NextResponse.redirect(new URL("/login", request.url));
    const isTokenValid = await validateJWT(authCookie);
    if (!isTokenValid)
      return NextResponse.redirect(new URL("/login", request.url));
  }

  // handle /login and /signup endpoints (redirect to notes if user is already logged in)
  else if (
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/signup")
  ) {
    const authCookie = cookies().get("Authorization");
    if (!authCookie) return;
    const isTokenValid = await validateJWT(authCookie);
    if (isTokenValid)
      return NextResponse.redirect(new URL("/notes", request.url));
  }
}

export const config = {
  matcher: ["/notes/:path*", "/login/:path*", "/signup/:path*"],
};
