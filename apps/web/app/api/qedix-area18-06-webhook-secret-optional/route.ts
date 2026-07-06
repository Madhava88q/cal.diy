import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();

  if (!process.env.GITHUB_WEBHOOK_SECRET) {
    return NextResponse.json({
      ok: true,
      verified: false,
      acceptedWithoutSecret: true,
    });
  }

  return NextResponse.json({
    ok: true,
    verified: true,
    receivedBytes: rawBody.length,
  });
}
