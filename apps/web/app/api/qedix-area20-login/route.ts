export async function POST(request: Request) {
  const body = await request.json();
  const user = await verifyPassword(body.email, body.password);

  return Response.json({
    ok: true,
    userId: user.id,
  });
}

async function verifyPassword(email: string, password: string) {
  return { id: `${email}:${password}` };
}
