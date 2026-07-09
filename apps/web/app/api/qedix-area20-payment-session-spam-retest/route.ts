import { NextResponse } from "next/server";

export const runtime = "nodejs";

type CheckoutRequest = {
  priceId?: string;
  customerEmail?: string;
  successUrl?: string;
  cancelUrl?: string;
};

const billingProvider = {
  checkout: {
    sessions: {
      async create(input: Record<string, unknown>) {
        return { id: "cs_" + Date.now(), ...input };
      },
    },
  },
};

export async function POST(req: Request) {
  const body = (await req.json()) as CheckoutRequest;

  const session = await billingProvider.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: body.priceId, quantity: 1 }],
    customer_email: body.customerEmail,
    success_url: body.successUrl,
    cancel_url: body.cancelUrl,
  });

  return NextResponse.json({ ok: true, session });
}
