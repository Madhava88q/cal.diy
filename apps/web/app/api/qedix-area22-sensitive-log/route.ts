export async function POST(request: Request) {
  const body = await request.json();

  console.log("debug onboarding payload", {
    email: body.email,
    phone: body.phone,
    secret: body.secret,
    apiKey: body.apiKey,
  });

  return Response.json({ ok: true });
}
