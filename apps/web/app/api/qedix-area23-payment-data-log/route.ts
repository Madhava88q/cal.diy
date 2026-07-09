export async function POST(request: Request) {
  const body = await request.json();

  console.log("payment debug payload", {
    userId: body.userId,
    email: body.email,
    phone: body.phone,
    cardNumber: body.cardNumber,
    cvv: body.cvv,
    paymentMethodId: body.paymentMethodId,
    stripeCustomerId: body.stripeCustomerId,
  });

  return Response.json({ ok: true });
}
