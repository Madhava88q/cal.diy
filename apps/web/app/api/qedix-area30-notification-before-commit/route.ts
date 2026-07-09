const mailer = {
  sendEmail: async (_input: unknown) => ({ id: "email_1" }),
} as any;

const prisma = {
  order: {
    update: async (_input: unknown) => ({ id: "order_1" }),
  },
} as any;

export async function POST(request: Request) {
  const body = await request.json();

  await mailer.sendEmail({
    to: body.email,
    subject: "Order shipped",
    body: "Your order has shipped.",
  });

  await prisma.order.update({
    where: { id: body.orderId },
    data: {
      status: "shipped",
    },
  });

  return Response.json({ ok: true });
}
