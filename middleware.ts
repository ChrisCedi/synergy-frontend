import { redirect } from "next/navigation";
import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("saludos middleware", request.nextUrl.pathname);
  const token = request.cookies.get("token");

  /*   if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  } */
}

export const config = {
  matcher: ["/balances/:path*", "/customers/:path*"],
};
