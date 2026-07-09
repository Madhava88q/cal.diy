const prisma = {
  invoiceLine: {
    create: async (_input: unknown) => ({ id: "line_1" }),
  },
} as any;

export async function POST(request: Request) {
  const body = await request.json();

  await prisma.invoiceLine.create({
    data: {
      invoiceId: body.invoiceId,
      productId: body.productId,
      quantity: body.quantity,
      amount: body.amount,
    },
  });

  return Response.json({ ok: true });
}
