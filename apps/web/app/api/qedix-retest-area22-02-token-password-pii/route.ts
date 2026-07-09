import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  console.error("auth failure debug", {
    password: body.password,
    refreshToken: body.refreshToken,
    customerEmail: body.customerEmail,
    cardNumber: body.cardNumber,
  });

  return NextResponse.json({ ok: true });
}
