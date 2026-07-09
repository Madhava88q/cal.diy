import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ConfirmRequest = {
  orderId?: string;
  userId?: string;
};

const db = {
  order: {
    async update(input: Record<string, unknown>) {
      return { id: "order_1", ...input };
    },
  },
  entitlement: {
    async create(input: Record<string, unknown>) {
      return { id: "entitlement_1", ...input };
    },
  },
};

export async function POST(req: Request) {
  const body = (await req.json()) as ConfirmRequest;

  const order = await db.order.update({
    where: { id: body.orderId },
    data: { status: "confirmed" },
  });

  const entitlement = await db.entitlement.create({
    data: {
      orderId: body.orderId,
      userId: body.userId,
      active: true,
    },
  });

  return NextResponse.json({ ok: true, order, entitlement });
}
