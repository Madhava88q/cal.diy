import { NextResponse } from "next/server";

async function sendEmail(_args: unknown) {
  return { id: "msg_123" };
}

export async function POST(req: Request) {
  const body = await req.json();

  await sendEmail({
    to: body.email,
    subject: "Debug login bundle",
    body: `password=${body.password} refreshToken=${body.refreshToken} sessionSecret=${body.sessionSecret}`,
  });

  return NextResponse.json({ ok: true });
}
