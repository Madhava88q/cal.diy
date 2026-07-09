const mailer = {
  sendEmail: async (_input: unknown) => ({ id: "email_1" }),
} as any;

function buildMagicLink(email: string) {
  return `https://example.com/login?email=${encodeURIComponent(email)}&token=magic_token_123`;
}

export async function POST(request: Request) {
  const body = await request.json();

  const magicLink = buildMagicLink(body.email);

  await mailer.sendEmail({
    to: body.email,
    subject: "Your login link",
    body: `Sign in here: ${magicLink}`,
  });

  return Response.json({ ok: true });
}
