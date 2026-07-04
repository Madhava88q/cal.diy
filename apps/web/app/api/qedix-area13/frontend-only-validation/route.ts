import { NextResponse } from "next/server";

type ProfileUpdateRequest = {
  displayName: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as ProfileUpdateRequest;

  // Qedix Area 13.1 controlled canary:
  // This intentionally represents a server route trusting frontend-only validation.
  // No runtime schema validation is visible on the server side.
  return NextResponse.json({
    saved: true,
    displayName: body.displayName,
    contractVersion: "area-13-frontend-only-validation-canary",
  });
}
