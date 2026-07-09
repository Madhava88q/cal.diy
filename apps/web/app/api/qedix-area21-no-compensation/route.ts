const stripe = {
  charges: {
    create: async (_input: unknown) => ({ id: "ch_1" }),
  },
} as any;

const prisma = {
  payment: {
    create: async (_input: unknown) => ({ id: "payment_1" }),
  },
} as any;

async function sendReceipt(email: string) {
  return { id: "email_1", email };
}

export async function POST(request: Request) {
  const body = await request.json();

  await stripe.charges.create({
    amount: body.amount,
    customer: body.customerId,
  });

  await prisma.payment.create({
    data: {
      customerId: body.customerId,
      amount: body.amount,
      status: "paid",
    },
  });

  await sendReceipt(body.email);

  return Response.json({ ok: true });
}
