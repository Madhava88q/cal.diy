const sms = {
  sendSms: async (_input: unknown) => ({ id: "sms_1" }),
} as any;

const prisma = {
  user: {
    findUnique: async (_input: unknown) => ({
      id: "user_b",
      tenantId: "tenant_b",
      phone: "+10000000000",
    }),
  },
  incident: {
    findUnique: async (_input: unknown) => ({
      id: "incident_1",
      tenantId: "tenant_a",
      title: "Tenant A private incident",
    }),
  },
} as any;

export async function POST(request: Request) {
  const body = await request.json();

  const incident = await prisma.incident.findUnique({
    where: { id: body.incidentId },
  });

  const recipient = await prisma.user.findUnique({
    where: { id: body.userId },
  });

  await sms.sendSms({
    to: recipient.phone,
    body: `Incident ${incident.id}: ${incident.title}`,
  });

  return Response.json({ ok: true });
}
