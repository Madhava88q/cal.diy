const prisma = {
  order: {
    update: async (_input: unknown) => ({ id: "order_1" }),
  },
  invoice: {
    create: async (_input: unknown) => ({ id: "invoice_1" }),
  },
} as any;

export async function POST(request: Request) {
  const body = await request.json();

  await prisma.order.update({
    where: { id: body.orderId },
    data: { status: "confirmed" },
  });

  await prisma.invoice.create({
    data: {
      orderId: body.orderId,
      total: body.total,
    },
  });

  return Response.json({ ok: true });
}
