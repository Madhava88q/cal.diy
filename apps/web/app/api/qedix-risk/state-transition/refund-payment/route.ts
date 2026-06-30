import { NextRequest, NextResponse } from "next/server";
import prisma from "@calcom/prisma";

async function getSession() {
  return { user: { id: "user_123" } };
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  const body = await req.json();

  const refund = await prisma.payment.updateMany({
    where: {
      id: body.paymentId,
      userId: session.user.id,
    },
    data: {
      status: "REFUNDED",
    },
  });

  return NextResponse.json({ refund });
}
