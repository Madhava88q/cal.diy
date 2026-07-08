import { createHmac, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_SECRET = "test_webhook_secret_for_canary_only";
const processedEvents = new Set<string>();

function verifyProviderSignature(rawBody: string, timestamp: string, signature: string) {
  const signedPayload = `${timestamp}.${rawBody}`;
  const expected = createHmac("sha256", WEBHOOK_SECRET)
    .update(signedPayload)
    .digest("hex");

  const expectedBuffer = Buffer.from(expected, "hex");
  const signatureBuffer = Buffer.from(signature, "hex");

  if (expectedBuffer.length !== signatureBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, signatureBuffer);
}

function isFreshWebhookTimestamp(timestamp: string) {
  const createdAt = Number(timestamp);
  const fiveMinutes = 5 * 60 * 1000;

  return Number.isFinite(createdAt) && Math.abs(Date.now() - createdAt) < fiveMinutes;
}

async function hasProcessedEvent(eventId: string) {
  return processedEvents.has(eventId);
}

async function markEventProcessed(eventId: string) {
  processedEvents.add(eventId);
}

async function applyWebhookSideEffect(event: { id: string; type: string }) {
  return {
    applied: true,
    eventType: event.type,
  };
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();

  const timestamp = request.headers.get("x-provider-timestamp");
  const signature = request.headers.get("x-provider-signature");

  if (!timestamp || !signature || !isFreshWebhookTimestamp(timestamp)) {
    return NextResponse.json({ error: "Invalid webhook timestamp" }, { status: 401 });
  }

  if (!verifyProviderSignature(rawBody, timestamp, signature)) {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody) as { id: string; type: string };

  if (await hasProcessedEvent(event.id)) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  await applyWebhookSideEffect(event);
  await markEventProcessed(event.id);

  return NextResponse.json({ received: true });
}
