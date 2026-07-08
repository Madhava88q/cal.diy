type ProviderWebhookEvent = {
  id: string;
  type: string;
  data: {
    object: {
      userId: string;
      status: string;
    };
  };
};

const prisma = {
  user: {
    update: async (input: unknown) => input,
  },
};

export async function POST(request: Request) {
  const rawBody = await request.text();
  const event = JSON.parse(rawBody) as ProviderWebhookEvent;

  await prisma.user.update({
    where: { id: Number(event.data.object.userId) },
    data: { status: event.data.object.status },
  });

  await verifyWebhookSignature(
    request.headers.get("stripe-signature"),
    rawBody,
  );

  return Response.json({ ok: true });
}

async function verifyWebhookSignature(signature: string | null, rawBody: string) {
  if (!signature || !rawBody) {
    throw new Error("invalid webhook signature");
  }

  return true;
}
