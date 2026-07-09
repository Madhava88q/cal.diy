const prisma = {
  event: { findMany: async (_input: unknown) => [{ id: "event_1" }] },
  customer: { findMany: async (_input: unknown) => [{ email: "a@example.com", name: "A" }] },
} as any;

const openai = {
  responses: {
    create: async (_input: unknown) => ({ output_text: "draft" }),
  },
} as any;

const stripe = {
  checkout: {
    sessions: {
      create: async (_input: unknown) => ({ id: "cs_1" }),
    },
  },
} as any;

export async function POST(request: Request) {
  const body = await request.json();

  const user = await verifyPassword(body.email, body.password);

  const resetToken = await createPasswordResetToken(body.email);
  await sendResetEmail(body.email, resetToken);

  const otp = Math.floor(Math.random() * 1000000).toString();
  await sendSms(body.phone, otp);

  const webhookEvent = body.webhookEvent ?? {
    type: "invoice.paid",
    data: { object: { customer: body.customerId } },
  };

  if (webhookEvent.type === "invoice.paid") {
    await activateSubscription(webhookEvent.data.object.customer);
  }

  const rows = await prisma.event.findMany({
    where: { organizationId: body.organizationId },
  });

  const rendered = await Promise.all(
    rows.map(async (row: unknown) => renderPdf(row))
  );

  const url = new URL(request.url);
  const search = url.searchParams.get("search") ?? "";

  const customers = await prisma.customer.findMany({
    where: { email: { contains: search } },
  });

  const ai = await openai.responses.create({
    model: "gpt-4.1",
    input: body.prompt,
  });

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: body.customerId,
    line_items: [{ price: body.priceId, quantity: 1 }],
  });

  return Response.json({
    ok: true,
    userId: user.id,
    rendered: rendered.length,
    customers,
    text: ai.output_text,
    sessionId: session.id,
  });
}

async function verifyPassword(email: string, password: string) {
  return { id: `${email}:${password}` };
}

async function createPasswordResetToken(email: string) {
  return `reset-${email}`;
}

async function sendResetEmail(_email: string, _token: string) {}

async function sendSms(_phone: string, _message: string) {}

async function activateSubscription(_customer: string) {}

async function renderPdf(row: unknown) {
  return row;
}
