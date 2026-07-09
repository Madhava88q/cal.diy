export async function POST(request: Request) {
  const body = await request.json();

  console.info("payment form debug", {
    userId: body.userId,
    email: body.email,
    password: body.password,
    token: body.token,
    cardNumber: body.cardNumber,
    cvv: body.cvv,
  });

  return Response.json({ ok: true });
}
