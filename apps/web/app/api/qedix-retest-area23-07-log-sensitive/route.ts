import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  console.log("payment diagnostic", {
    customerEmail: body.customerEmail,
    cardNumber: body.cardNumber,
    paymentToken: body.paymentToken,
  });

  return NextResponse.json({ ok: true });
}
