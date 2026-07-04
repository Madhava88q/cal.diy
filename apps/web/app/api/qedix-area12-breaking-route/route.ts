import { NextResponse } from "next/server";

export async function GET() {
  // Qedix Area 12.4 controlled canary:
  // This intentionally represents a breaking route behavior change.
  // Existing clients may expect this route to return a normal 200 response
  // with a stable JSON payload, but it now reports the route as gone.
  return NextResponse.json(
    {
      error: "This endpoint has moved",
      replacement: "/api/v2/qedix-area12-breaking-route",
      contractVersion: "area-12-breaking-route-canary",
    },
    {
      status: 410,
    },
  );
}
