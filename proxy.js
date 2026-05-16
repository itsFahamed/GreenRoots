import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname, origin } = request.nextUrl;
  const sessionToken =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");

  const protectedPaths = ["/Profile", "/ProductDetails"];
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

  if (isProtected && !sessionToken) {
    const loginUrl = new URL("/Login", origin);
    loginUrl.searchParams.set("callbackURL", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Profile/:path*", "/ProductDetails/:path*"],
};
