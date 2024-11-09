import { NextResponse } from "next/server";

export async function GET() {
  // Log the Firebase API Key or any other environment variable
  console.log("FIREBASE_API_KEY:", process.env.FIREBASE_API_KEY);

  // Respond with a success message (but do not expose any sensitive data in the response)
  return NextResponse.json({
    message: "Debug information logged successfully",
  });
}
