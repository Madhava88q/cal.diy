const prisma = {
  payment: {
    create: async (_input: unknown) => ({ id: "payment_1" }),
  },
} as any;

const stripe = {
  charges: {
    create: async (_input: unknown) => ({ id: "ch_1" }),
  },
} as any;

export async function POST(request: Request) {
  const body = await request.json();

  const charge = await stripe.charges.create({
    amount: body.amount,
    customer: body.customerId,
  });

  await prisma.payment.create({
    data: {
      orderId: body.orderId,
      providerChargeId: charge.id,
      amount: body.amount,
      status: "paid",
    },
  });

  return Response.json({ ok: true });
}
