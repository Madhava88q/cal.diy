import { NextResponse } from "next/server";

async function sendEmail(_args: unknown) {
  return { id: "msg_123" };
}

export async function POST(req: Request) {
  const body = await req.json();

  await sendEmail({
    to: body.email,
    tenantId: body.tenantId,
    userId: body.userId,
    subject: "Workspace alert",
    body: "An incident was updated",
  });

  return NextResponse.json({ ok: true });
}
