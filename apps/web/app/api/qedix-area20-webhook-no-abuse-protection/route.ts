import { NextRequest, NextResponse } from "next/server";

async function verifyWebhookSignature(rawBody: string, signature: string | null) {
  return Boolean(rawBody && signature);
}

async function recordWebhookEvent(event: unknown) {
  return {
    stored: true,
    event,
  };
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature");

  const verified = await verifyWebhookSignature(rawBody, signature);

  if (!verified) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  await recordWebhookEvent(event);

  return NextResponse.json({
    received: true,
  });
}
