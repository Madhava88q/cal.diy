export async function POST(request: Request) {
  const body = await request.json();

  const resetToken = await createPasswordResetToken(body.email);
  await sendResetEmail(body.email, resetToken);

  return Response.json({ ok: true });
}

async function createPasswordResetToken(email: string) {
  return `reset-${email}`;
}

async function sendResetEmail(_email: string, _token: string) {}
