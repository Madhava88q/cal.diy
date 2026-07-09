const mailer = {
  sendEmail: async (_input: unknown) => ({ id: "email_1" }),
} as any;

const prisma = {
  invoice: {
    findUnique: async (_input: unknown) => ({
      id: "invoice_1",
      userId: "user_1",
      userEmail: "owner@example.com",
      amount: 5000,
    }),
  },
} as any;

export async function POST(request: Request) {
  const body = await request.json();

  const invoice = await prisma.invoice.findUnique({
    where: { id: body.invoiceId },
  });

  await mailer.sendEmail({
    to: body.email,
    subject: "Your invoice",
    body: `Invoice ${invoice.id} amount ${invoice.amount}`,
  });

  return Response.json({ ok: true });
}
