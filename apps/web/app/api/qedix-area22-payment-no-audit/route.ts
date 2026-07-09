const stripe = {
  refunds: {
    create: async (_input: unknown) => ({ id: "refund_1" }),
  },
} as any;

const prisma = {
  payment: {
    update: async (_input: unknown) => ({ id: "payment_1" }),
  },
} as any;

export async function POST(request: Request) {
  const body = await request.json();

  await stripe.refunds.create({
    payment_intent: body.paymentIntentId,
  });

  await prisma.payment.update({
    where: { id: body.paymentId },
    data: { status: "refunded" },
  });

  return Response.json({ ok: true });
}
