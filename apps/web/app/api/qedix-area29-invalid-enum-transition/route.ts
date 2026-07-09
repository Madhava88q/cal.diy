const prisma = {
  subscription: {
    update: async (_input: unknown) => ({ id: "sub_1" }),
  },
} as any;

export async function POST(request: Request) {
  const body = await request.json();

  await prisma.subscription.update({
    where: { id: body.subscriptionId },
    data: {
      status: body.status,
    },
  });

  return Response.json({ ok: true });
}
