import { NextResponse } from "next/server";

export async function POST() {
  const tokenResponse = await fetch("https://oauth.example.com/token", {
    method: "POST",
    body: JSON.stringify({ grant_type: "client_credentials" }),
  });

  const tokenPayload = await tokenResponse.json();

  return NextResponse.json({
    provider: "oauth",
    accessToken: tokenPayload.access_token,
    refreshToken: tokenPayload.refresh_token,
    expiresAt: tokenPayload.expires_at,
    owner: tokenPayload.owned_by,
  });
}
