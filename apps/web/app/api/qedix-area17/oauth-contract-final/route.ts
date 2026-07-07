export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get("code") ?? "";

  const tokenResponse = await fetch("https://oauth.example.com/token", {
    method: "POST",
    body: new URLSearchParams({
      code,
      grant_type: "authorization_code",
    }),
  });

  const tokenPayload = await tokenResponse.json();

  await saveOAuthAccount({
    accessToken: tokenPayload.access_token,
    refreshToken: tokenPayload.refresh_token,
    expiresAt: Date.now() + tokenPayload.expires_in * 1000,
    tokenType: tokenPayload.token_type,
    scope: tokenPayload.scope,
  });

  return Response.json({ ok: true });
}

async function saveOAuthAccount(input: {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  tokenType: string;
  scope: string;
}) {
  return input;
}
