import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ChargeRequest = {
  userId?: string;
  amount?: number;
  email?: string;
};

const paymentProvider = {
  async charge(input: Record<string, unknown>) {
    return { id: "charge_" + Date.now(), ...input };
  },
};

const db = {
  payment: {
    async create(input: Record<string, unknown>) {
      return { id: "payment_1", ...input };
    },
  },
};

const notificationProvider = {
  async send(input: Record<string, unknown>) {
    return { id: "notification_1", ...input };
  },
};

export async function POST(req: Request) {
  const body = (await req.json()) as ChargeRequest;

  const charge = await paymentProvider.charge({
    userId: body.userId,
    amount: body.amount,
  });

  const payment = await db.payment.create({
    data: {
      userId: body.userId,
      amount: body.amount,
      providerChargeId: charge.id,
      status: "paid",
    },
  });

  await notificationProvider.send({
    email: body.email,
    paymentId: payment.id,
  });

  return NextResponse.json({ ok: true, charge, payment });
}
