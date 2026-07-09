const prisma = {
  inventory: {
    update: async (_input: unknown) => ({ id: "stock_1" }),
  },
} as any;

export async function POST(request: Request) {
  const body = await request.json();

  await prisma.inventory.update({
    where: { sku: body.sku },
    data: {
      available: {
        decrement: body.quantity,
      },
    },
  });

  return Response.json({ ok: true });
}
