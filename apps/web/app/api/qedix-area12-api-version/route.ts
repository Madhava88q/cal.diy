import { NextResponse } from "next/server";

export async function GET() {
  // Qedix Area 12.8 controlled canary:
  // This intentionally represents an API versioning contract change.
  // Existing clients may expect apiVersion: "2024-01".
  // This route now returns apiVersion: "2026-07" and a new minimum client version.
  return NextResponse.json({
    apiVersion: "2026-07",
    minClientVersion: "3.0.0",
    compatibilityMode: "modern",
    contractVersion: "area-12-api-versioning-canary",
  });
}
