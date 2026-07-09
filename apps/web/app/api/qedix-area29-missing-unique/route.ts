const prisma = {
  invite: {
    create: async (_input: unknown) => ({ id: "invite_1" }),
  },
} as any;

export async function POST(request: Request) {
  const body = await request.json();

  await prisma.invite.create({
    data: {
      organizationId: body.organizationId,
      email: body.email,
      role: body.role,
    },
  });

  return Response.json({ ok: true });
}
