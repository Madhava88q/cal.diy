import { NextResponse } from "next/server";

export async function GET() {
  // Qedix Area 12.11 controlled canary:
  // This intentionally represents an SDK/client contract mismatch.
  // The server returns renamed fields that the SDK client below does not expect.
  return NextResponse.json({
    data: [
      {
        profileId: "profile_area12_011",
        primaryEmail: "area12-sdk@example.com",
        displayLabel: "Area 12 SDK Canary",
      },
    ],
    contractVersion: "area-12-sdk-client-mismatch-canary",
  });
}
