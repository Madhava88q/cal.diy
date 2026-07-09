import { NextResponse } from "next/server";

export const runtime = "nodejs";

type RequestBody = {
  orderId?: string;
  email?: string;
};

const db = {
  order: {
    async update(input: Record<string, unknown>) {
      return { id: "order_1", ...input };
    },
  },
};

export async function POST(req: Request) {
  const body = (await req.json()) as RequestBody;

  await sendReceiptEmail(body.email, body.orderId);

  const order = await db.order.update({
    where: { id: body.orderId },
    data: { receiptSent: true },
  });

  return NextResponse.json({ ok: true, order });
}

async function sendReceiptEmail(email?: string, orderId?: string) {
  return fetch("https://email.example.com/send", {
    method: "POST",
    body: JSON.stringify({ email, orderId }),
  });
}
