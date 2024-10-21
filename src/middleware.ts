import { getCsrfToken } from "next-auth/react";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = [
  "/dashboard/:path*",
  "/jobs/:path*",
  "/companies/:path*",
  "/settings/:path*",
  "/user-profile/:path*",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedPaths.some((path) => {
    const regex = new RegExp(
      "^" + path.replace(/:\w+\*/g, ".*").replace(/\//g, "\\/") + "$"
    );
    return regex.test(pathname);
  });

  if (isProtected) {
    const token = await getCsrfToken();

    if (!token) {
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("redirect", pathname); 
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: protectedPaths,
};
