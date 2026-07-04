import { NextResponse } from "next/server";

export async function POST() {
  // Qedix Area 12.5 controlled canary:
  // This intentionally represents a status-code contract change.
  // Existing clients may expect 200 OK for this operation.
  // This route now returns 202 Accepted, which can change client retry,
  // polling, and success-handling behavior.
  return NextResponse.json(
    {
      result: "accepted",
      contractVersion: "area-12-status-code-canary",
    },
    {
      status: 202,
    },
  );
}
