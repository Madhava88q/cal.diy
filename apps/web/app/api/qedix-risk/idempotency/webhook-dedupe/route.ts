import { NextRequest, NextResponse } from "next/server";
import prisma from "@calcom/prisma";

export async function POST(req: NextRequest) {
  const event = await req.json();

  if (event.type === "payment.succeeded") {
    await prisma.payment.updateMany({
      where: {
        providerPaymentId: event.data.object.id,
      },
      data: {
        status: "PAID",
      },
    });
  }

  return NextResponse.json({ received: true });
}
