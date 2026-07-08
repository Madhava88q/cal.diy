export async function POST(request: Request) {
  const payload = await request.json();

  await applyWebhookSideEffect({
    eventId: payload.id,
    userId: payload.data?.object?.userId,
    status: payload.type,
  });

  await verifyWebhookSignature(
    request.headers.get("stripe-signature"),
    JSON.stringify(payload),
  );

  return Response.json({ ok: true });
}

async function applyWebhookSideEffect(input: {
  eventId: string;
  userId: string;
  status: string;
}) {
  return input;
}

async function verifyWebhookSignature(signature: string | null, rawBody: string) {
  if (!signature || !rawBody) {
    throw new Error("invalid webhook signature");
  }

  return true;
}
