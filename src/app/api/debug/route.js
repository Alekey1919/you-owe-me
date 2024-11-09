import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    firebaseApiKey: process.env.FIREBASE_API_KEY || "Not Loaded",
    message: "Debug information logged successfully",
  });
}
