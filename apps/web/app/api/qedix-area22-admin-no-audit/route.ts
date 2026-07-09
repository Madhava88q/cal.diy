const prisma = {
  user: {
    update: async (_input: unknown) => ({ id: "user_1" }),
  },
} as any;

export async function POST(request: Request) {
  const body = await request.json();

  await prisma.user.update({
    where: { id: body.userId },
    data: {
      role: "admin",
      disabled: true,
    },
  });

  return Response.json({ ok: true });
}
