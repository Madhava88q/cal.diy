export async function POST(request: Request) {
  const event = await request.json();

  if (event.type === "invoice.paid") {
    await activateSubscription(event.data.object.customer);
  }

  return Response.json({ received: true });
}

async function activateSubscription(_customer: string) {}
