import { NextResponse } from "next/server";

export const runtime = "nodejs";

const processedEvents = new Set<string>();

type ProviderEvent = {
  id?: string;
  type?: string;
  data?: { object?: { customer?: string; subscription?: string } };
};

export async function POST(req: Request) {
  const signature = req.headers.get("stripe-signature");
  const timestamp = req.headers.get("x-stripe-timestamp");

  if (!signature || !timestamp) {
    return NextResponse.json({ ok: false, error: "missing signature" }, { status: 401 });
  }

  const rawBody = await req.text();
  const event = JSON.parse(rawBody) as ProviderEvent;

  if (event.id && processedEvents.has(event.id)) {
    return NextResponse.json({ ok: true, duplicate: true });
  }

  if (event.id) processedEvents.add(event.id);

  if (event.type === "customer.subscription.updated") {
    await updateEntitlement(event.data?.object?.customer, event.data?.object?.subscription);
  }

  return NextResponse.json({ ok: true });
}

async function updateEntitlement(customerId?: string, subscriptionId?: string) {
  return { customerId, subscriptionId, updated: true };
}
