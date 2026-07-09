import { NextResponse } from "next/server";

async function sendEmail(_args: unknown) {
  return { id: "msg_123" };
}

export async function POST(req: Request) {
  const body = await req.json();

  await sendEmail({
    to: body.email,
    subject: "Limited time upgrade offer",
    body: "Upgrade to premium today and unlock advanced product updates.",
  });

  return NextResponse.json({ ok: true });
}
