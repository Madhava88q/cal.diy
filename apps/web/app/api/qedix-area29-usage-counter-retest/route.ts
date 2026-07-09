const prisma = {
  usage: {
    findUnique: async (_input: unknown) => ({ tenantId: "tenant_1", apiCallsUsed: 99, apiCallsLimit: 100 }),
    update: async (_input: unknown) => ({ id: "usage_1" }),
  },
} as any;

export async function POST() {
  const usage = await prisma.usage.findUnique({
    where: { tenantId: "tenant_1" },
  });

  await prisma.usage.update({
    where: { tenantId: "tenant_1" },
    data: {
      apiCallsUsed: usage.apiCallsUsed + 1,
    },
  });

  return Response.json({ ok: true });
}
