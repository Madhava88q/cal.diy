import { NextRequest, NextResponse } from "next/server";
import prisma from "@calcom/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { slotId, userId, email } = body;

  const previous = await prisma.booking.findFirst({
    where: {
      uid: slotId,
      status: "ACCEPTED",
    },
  });

  if (previous) {
    return NextResponse.json({ bookingId: previous.id, reused: true });
  }

  const booking = await prisma.booking.create({
    data: {
      uid: slotId,
      userId,
      userPrimaryEmail: email,
      title: "Qedix duplicate booking key canary",
      status: "ACCEPTED",
      startTime: new Date(body.startTime),
      endTime: new Date(body.endTime),
    },
  });

  return NextResponse.json({ bookingId: booking.id, reused: false });
}
