import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  console.log("login diagnostic", {
    email: body.email,
    accessToken: body.accessToken,
    sessionSecret: body.sessionSecret,
  });

  return NextResponse.json({ ok: true });
}
