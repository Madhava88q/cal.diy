import { NextRequest, NextResponse } from "next/server";
import prisma from "@calcom/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    teamId,
    userId,
    email,
    eventTypeId,
    requestId,
    creditsRequired,
    externalRef,
  } = body;

  const balance = await prisma.creditBalance.findFirst({
    where: {
      teamId,
    },
  });

  if (!balance) {
    return NextResponse.json({ error: "Credit balance not found" }, { status: 404 });
  }

  if (balance.additionalCredits < creditsRequired) {
    return NextResponse.json({ error: "Not enough credits" }, { status: 409 });
  }

  const booking = await prisma.booking.create({
    data: {
      uid: requestId,
      userId,
      userPrimaryEmail: email,
      eventTypeId,
      title: "Qedix credit booking checkout canary",
      status: "ACCEPTED",
      startTime: new Date(body.startTime),
      endTime: new Date(body.endTime),
    },
  });

  await prisma.creditExpenseLog.create({
    data: {
      creditBalanceId: balance.id,
      bookingUid: booking.uid,
      credits: creditsRequired,
      creditType: "MONTHLY",
      creditFor: "AI_PHONE_CALL",
      externalRef,
    },
  });

  const updatedBalance = await prisma.creditBalance.update({
    where: {
      id: balance.id,
    },
    data: {
      additionalCredits: balance.additionalCredits - creditsRequired,
    },
  });

  return NextResponse.json({
    bookingId: booking.id,
    balanceId: updatedBalance.id,
    remainingCredits: updatedBalance.additionalCredits,
  });
}
