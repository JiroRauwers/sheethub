import { NextResponse } from "next/server";
import { API_AUTH_PREFIX, AUTH_ROUTES, PROTECTED_ROUTES } from "~/routes";
import { auth } from "./auth";
import { authConfig } from "./lib/auth.config";
import NextAuth from "next-auth";

const nextAuth = NextAuth({
  ...authConfig,
});

export default nextAuth.auth((req) => {
  const pathname = req.nextUrl.pathname;

  // manage route protection
  const isAuth = req.auth;

  const isAccessingApiAuthRoute = pathname.startsWith(API_AUTH_PREFIX);
  const isAccessingAuthRoute = AUTH_ROUTES.some((route) =>
    pathname.startsWith(route),
  );
  const isAccessingProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  if (isAccessingApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAccessingAuthRoute) {
    if (isAuth) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  }

  if (!isAuth && isAccessingProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
