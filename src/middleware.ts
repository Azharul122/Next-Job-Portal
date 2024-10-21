import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = [
  "/dashboard/:path*",
  "/jobs/:path*",
  "/companies/:path*",
  "/settings/:path*",
  "/user-profile/:path*",
];


function isPathProtected(pathname: string) {
  return protectedPaths.some((path) => {
    const regex = new RegExp(
      "^" + path.replace(/:\w+\*/g, ".*").replace(/\//g, "\\/") + "$"
    );
    return regex.test(pathname);
  });
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;


  if (isPathProtected(pathname)) {
    const sessionToken = request.cookies.get("__Secure-authjs.session-token") || 
    request.cookies.get("authjs.session-token");

    if (!sessionToken) {
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("redirect", pathname); 
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/jobs/:path*",
    "/companies/:path*",
    "/settings/:path*",
    "/user-profile/:path*",
  ],
};
