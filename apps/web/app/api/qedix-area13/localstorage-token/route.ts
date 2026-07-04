import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  // Qedix Area 13.7 controlled canary:
  // This intentionally accepts a token-like value coming from browser storage.
  return NextResponse.json({
    ok: true,
    receivedRefreshToken: body.refreshToken,
    contractVersion: "area-13-localstorage-token-canary",
  });
}
