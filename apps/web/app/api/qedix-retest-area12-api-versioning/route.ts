import { NextResponse } from "next/server";

export async function GET() {
  // Qedix Area 12.8 retest canary:
  // This intentionally changes API/client compatibility version evidence.
  return NextResponse.json({
    apiVersion: "2026-07",
    minClientVersion: "3.0.0",
    compatibilityMode: "modern",
    contractVersion: "area-12-api-versioning-retest",
  });
}
