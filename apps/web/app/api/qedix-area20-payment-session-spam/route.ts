import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CheckoutRequestSchema = z.object({
  priceId: z.string().min(1).max(100),
  quantity: z.number().int().min(1).max(10).default(1),
});

async function requireUser() {
  return {
    id: "user_123",
    tenantId: "tenant_123",
  };
}

async function createCheckoutSession(input: {
  userId: string;
  tenantId: string;
  priceId: string;
  quantity: number;
}) {
  return {
    id: crypto.randomUUID(),
    url: `https://checkout.example.test/session/${crypto.randomUUID()}`,
    userId: input.userId,
    tenantId: input.tenantId,
    priceId: input.priceId,
    quantity: input.quantity,
  };
}

export async function POST(request: NextRequest) {
  const user = await requireUser();

  const parsed = CheckoutRequestSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const session = await createCheckoutSession({
    userId: user.id,
    tenantId: user.tenantId,
    priceId: parsed.data.priceId,
    quantity: parsed.data.quantity,
  });

  return NextResponse.json({
    ok: true,
    checkoutSessionId: session.id,
    checkoutUrl: session.url,
  });
}
