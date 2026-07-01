import { NextRequest, NextResponse } from "next/server";
import prisma from "@calcom/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { teamId, creditsToUse } = body;

  const balance = await prisma.creditBalance.findFirst({
    where: {
      teamId,
    },
  });

  if (!balance) {
    return NextResponse.json({ error: "Credit balance not found" }, { status: 404 });
  }

  const nextCredits = balance.additionalCredits - creditsToUse;

  if (nextCredits < 0) {
    return NextResponse.json({ error: "Not enough credits" }, { status: 409 });
  }

  const updatedBalance = await prisma.creditBalance.update({
    where: {
      id: balance.id,
    },
    data: {
      additionalCredits: nextCredits,
    },
  });

  await prisma.creditExpenseLog.create({
    data: {
      creditBalanceId: balance.id,
      credits: creditsToUse,
      creditType: "MONTHLY",
      creditFor: "AI_PHONE_CALL",
      externalRef: body.externalRef,
    },
  });

  return NextResponse.json({
    balanceId: updatedBalance.id,
    remainingCredits: updatedBalance.additionalCredits,
  });
}
