import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("saludos middleware", request.nextUrl.pathname);
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  console.log(request.nextUrl);
}

export const config = {
  matcher: ["/balances/:path*", "/customers/:path*", "/"],
};
