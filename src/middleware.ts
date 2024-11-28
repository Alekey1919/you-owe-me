import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { RoutesEnum } from "./app/enums/routes";

export async function middleware(request: NextRequest) {
  // Retrieve the token from cookies
  const token = request.cookies.get("auth_token")?.value;

  // If token is not present, redirect to login
  if (!token) {
    const loginUrl = new URL(RoutesEnum.Login, request.nextUrl.origin);
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Allow request to proceed if token exists
  return NextResponse.next();
}

// Configure which routes to protect
export const config = {
  matcher: ["/my_tickets"],
};
