const mailer = {
  sendEmail: async (_input: unknown) => ({ id: "email_1" }),
} as any;

export async function POST(request: Request) {
  const body = await request.json();

  await mailer.sendEmail({
    to: body.email,
    subject: "Account recovery details",
    body: `
      Password reset token: ${body.resetToken}
      One time passcode: ${body.otp}
      Session secret: ${body.sessionSecret}
      Card number: ${body.cardNumber}
      CVV: ${body.cvv}
    `,
  });

  return Response.json({ ok: true });
}
