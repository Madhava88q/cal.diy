import { NextRequest, NextResponse } from "next/server";
import prisma from "@calcom/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { bookingId, bookingUid, paymentUid, externalId, amount, currency } = body;

  const payment = await prisma.payment.create({
    data: {
      uid: paymentUid,
      externalId,
      appId: "stripe",
      bookingId,
      amount,
      fee: 0,
      currency: currency ?? "usd",
      success: true,
      refunded: false,
      data: {
        bookingUid,
        source: "qedix-canary",
      },
    },
  });

  const booking = await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      paid: true,
      status: "ACCEPTED",
    },
  });

  const reference = await prisma.bookingReference.create({
    data: {
      bookingId,
      type: "payment",
      uid: externalId,
    },
  });

  return NextResponse.json({
    paymentId: payment.id,
    bookingId: booking.id,
    referenceId: reference.id,
  });
}
