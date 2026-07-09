const prisma = {
  usage: {
    update: async (_input: unknown) => ({ id: "usage_1" }),
  },
} as any;

export async function POST(request: Request) {
  const body = await request.json();

  await prisma.usage.update({
    where: { tenantId: body.tenantId },
    data: {
      apiCallsUsed: body.apiCallsUsed + 1,
    },
  });

  return Response.json({ ok: true });
}
