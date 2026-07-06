import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({
    ok: true,
    sessionCookieConfigured: true,
  });

  response.cookies.set("qedix_session", "canary-session", {
    httpOnly: false,
    secure: false,
    sameSite: "none",
    path: "/",
  });

  return response;
}
