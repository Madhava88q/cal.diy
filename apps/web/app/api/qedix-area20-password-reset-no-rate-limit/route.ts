import { NextRequest, NextResponse } from "next/server";

async function createResetToken(email: string) {
  return crypto.randomUUID();
}

async function sendPasswordResetEmail(email: string, token: string) {
  return { sent: Boolean(email && token) };
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const token = await createResetToken(body.email);

  await sendPasswordResetEmail(body.email, token);

  return NextResponse.json({
    ok: true,
    message: "If an account exists, a reset email has been sent.",
  });
}
