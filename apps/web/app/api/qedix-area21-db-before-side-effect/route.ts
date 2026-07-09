const prisma = {
  subscription: {
    update: async (_input: unknown) => ({ id: "subscription_1" }),
  },
} as any;

async function sendEmail(email: string) {
  return { id: "email_1", email };
}

export async function POST(request: Request) {
  const body = await request.json();

  await prisma.subscription.update({
    where: { id: body.subscriptionId },
    data: { active: true },
  });

  await sendEmail(body.email);

  return Response.json({ ok: true });
}
