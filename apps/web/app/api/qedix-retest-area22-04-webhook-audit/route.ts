import { NextResponse } from "next/server";

const prisma = {
  subscription: {
    update: async (_args: unknown) => ({ ok: true }),
  },
};

export async function POST(req: Request) {
  const event = await req.json();

  if (event.type === "invoice.paid") {
    await prisma.subscription.update({
      where: { stripeSubscriptionId: event.data.object.subscription },
      data: { status: "active", entitlement: "pro" },
    });
  }

  return NextResponse.json({ received: true });
}
