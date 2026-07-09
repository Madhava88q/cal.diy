const prisma = {
  invite: {
    create: async (_input: unknown) => ({ id: "invite_1" }),
  },
} as any;

export async function POST() {
  await prisma.invite.create({
    data: {
      organizationId: "org_1",
      email: "member@example.com",
      role: "member",
    },
  });

  await prisma.invite.create({
    data: {
      organizationId: "org_1",
      email: "member@example.com",
      role: "member",
    },
  });

  return Response.json({ ok: true });
}
