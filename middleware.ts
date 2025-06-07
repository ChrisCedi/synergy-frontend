import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  const token = request.cookies.get("token")?.value;
  const userCookie = request.cookies.get("user")?.value;
  const user = userCookie ? safeParseJSON(userCookie) : null;

  if (!token && pathname !== "/auth/login") {
    if (pathname == "/") {
      return NextResponse.redirect(new URL("/auth/login", origin));
    }
    return NextResponse.redirect(new URL("/auth/login", origin));
  }

  if (token && pathname === "/auth/login") {
    if (user?.role === "admin") {
      return NextResponse.redirect(new URL("/companies", origin));
    } else {
      return NextResponse.redirect(new URL("/balances", origin));
    }
  }

  if (pathname == "/") {
    return NextResponse.redirect(new URL("/auth/login", origin));
  }

  if (pathname.startsWith("/balances") && user?.role === "admin") {
    if (pathname !== "/companies") {
      return NextResponse.redirect(new URL("/companies", origin));
    }
  }

  if (
    pathname.startsWith("/companies") &&
    (user?.role === "capturista" || user?.role === "financiero")
  ) {
    if (pathname !== "/balances") {
      return NextResponse.redirect(new URL("/balances", origin));
    }
  }

  return NextResponse.next();
}

function safeParseJSON(str: string) {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

export const config = {
  matcher: ["/balances/:path*", "/companies/:path*", "/", "/auth/login"],
};
