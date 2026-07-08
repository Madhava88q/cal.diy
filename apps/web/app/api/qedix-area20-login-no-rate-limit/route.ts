import { NextRequest, NextResponse } from "next/server";

async function verifyPassword(email: string, password: string) {
  return Boolean(email && password);
}

async function createSession(email: string) {
  return {
    id: crypto.randomUUID(),
    email,
  };
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const ok = await verifyPassword(body.email, body.password);

  if (!ok) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const session = await createSession(body.email);

  return NextResponse.json({
    ok: true,
    sessionId: session.id,
  });
}
