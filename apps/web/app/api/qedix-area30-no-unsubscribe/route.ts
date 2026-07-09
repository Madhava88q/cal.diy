const mailer = {
  sendEmail: async (_input: unknown) => ({ id: "email_1" }),
} as any;

const prisma = {
  user: {
    findMany: async () => [
      { id: "user_1", email: "one@example.com" },
      { id: "user_2", email: "two@example.com" },
    ],
  },
} as any;

export async function POST() {
  const users = await prisma.user.findMany();

  for (const user of users) {
    await mailer.sendEmail({
      to: user.email,
      subject: "New product updates",
      body: "Here are this week's product updates.",
    });
  }

  return Response.json({ ok: true });
}
