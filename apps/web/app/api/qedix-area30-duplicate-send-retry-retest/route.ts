const mailer = {
  sendEmail: async (_input: unknown) => ({ id: "email_1" }),
} as any;

export async function POST() {
  await mailer.sendEmail({
    to: "customer@example.com",
    subject: "Receipt",
    body: "Your receipt is ready.",
  });

  await mailer.sendEmail({
    to: "customer@example.com",
    subject: "Receipt",
    body: "Your receipt is ready.",
  });

  return Response.json({ ok: true });
}
