const mailer = {
  sendEmail: async (_input: unknown) => ({ id: "email_1" }),
} as any;

export async function POST() {
  await mailer.sendEmail({
    to: "customer@example.com",
    subject: "Limited time product offer",
    body: `
      New product updates and promotional offers are available this week.
      Upgrade today to unlock premium features.
    `,
  });

  return Response.json({ ok: true });
}
