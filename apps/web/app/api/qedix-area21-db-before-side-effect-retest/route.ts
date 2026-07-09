import { NextResponse } from "next/server";

export const runtime = "nodejs";

type RequestBody = {
  subscriptionId?: string;
  userId?: string;
};

const db = {
  subscription: {
    async update(input: Record<string, unknown>) {
      return { id: "subscription_1", ...input };
    },
  },
};

export async function POST(req: Request) {
  const body = (await req.json()) as RequestBody;

  const subscription = await db.subscription.update({
    where: { id: body.subscriptionId },
    data: { status: "active" },
  });

  await notifyBillingProvider(body.userId, body.subscriptionId);

  return NextResponse.json({ ok: true, subscription });
}

async function notifyBillingProvider(userId?: string, subscriptionId?: string) {
  return fetch("https://billing.example.com/activate", {
    method: "POST",
    body: JSON.stringify({ userId, subscriptionId }),
  });
}
