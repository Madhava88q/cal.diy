export async function POST(request: Request) {
  const payload = await request.json();

  await applyWebhookSideEffect({
    eventId: payload.id,
    userId: payload.data?.object?.userId,
    status: payload.type,
  });

  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return Response.json({ ok: false }, { status: 401 });
  }

  return Response.json({ ok: true });
}

async function applyWebhookSideEffect(input: {
  eventId: string;
  userId: string;
  status: string;
}) {
  return input;
}
