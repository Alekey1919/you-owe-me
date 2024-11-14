import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Retrieve the token from cookies
  const token = request.cookies.get("auth_token")?.value;

  // If token is not present, redirect to login
  if (!token) {
    // TODO: Fix this redirection
    // return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow request to proceed if token exists
  return NextResponse.next();
}

// Configure which routes to protect
export const config = {
  matcher: ["/my_tickets"], // Customize this to match the routes you want to protect
};
