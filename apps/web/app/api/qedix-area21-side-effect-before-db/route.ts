const prisma = {
  notification: {
    create: async (_input: unknown) => ({ id: "notification_1" }),
  },
} as any;

async function sendEmail(email: string) {
  return { id: "email_1", email };
}

export async function POST(request: Request) {
  const body = await request.json();

  await sendEmail(body.email);

  await prisma.notification.create({
    data: {
      email: body.email,
      sent: true,
    },
  });

  return Response.json({ ok: true });
}
