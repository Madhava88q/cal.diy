import { NextResponse } from "next/server";

type ScopedPreferenceRequest = {
  userId: string;
  organizationId: string;
  displayMode: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as ScopedPreferenceRequest;

  // Qedix Area 13.6 controlled canary:
  // This intentionally trusts userId and organizationId supplied by the browser.
  // No server-side session-derived identity or organization scope is visible.
  return NextResponse.json({
    saved: true,
    userId: body.userId,
    organizationId: body.organizationId,
    displayMode: body.displayMode,
    contractVersion: "area-13-client-user-org-id-canary",
  });
}
