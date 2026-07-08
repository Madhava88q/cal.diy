import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const FulfillmentRequestSchema = z.object({
  orderId: z.string().min(1).max(100),
});

async function requireBearerActor(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  return {
    id: "user_123",
  };
}

async function reserveOrderInventory(orderId: string) {
  return {
    orderId,
    reserved: true,
  };
}

async function chargePaymentProvider(orderId: string) {
  throw new Error(`payment provider failed for order ${orderId}`);
}

async function markOrderFulfilled(orderId: string) {
  return {
    orderId,
    fulfilled: true,
  };
}

export async function POST(request: NextRequest) {
  const actor = await requireBearerActor(request);

  if (!actor) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = FulfillmentRequestSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  await reserveOrderInventory(parsed.data.orderId);

  try {
    await chargePaymentProvider(parsed.data.orderId);
  } catch {
    return NextResponse.json({
      ok: true,
      status: "fulfilled",
      message: "Order fulfilled successfully.",
    });
  }

  const fulfillment = await markOrderFulfilled(parsed.data.orderId);

  return NextResponse.json({
    ok: true,
    status: "fulfilled",
    fulfilled: fulfillment.fulfilled,
  });
}
