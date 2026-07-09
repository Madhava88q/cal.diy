const stripe = {
  checkout: {
    sessions: {
      create: async (_input: unknown) => ({ id: "cs_1" }),
    },
  },
} as any;

export async function POST(request: Request) {
  const body = await request.json();

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: body.customerId,
    line_items: [{ price: body.priceId, quantity: 1 }],
  });

  return Response.json({
    id: session.id,
  });
}
