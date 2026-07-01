import { NextRequest, NextResponse } from "next/server";
import prisma from "@calcom/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { eventTypeId, userId, email, requestId } = body;

  const startTime = new Date(body.startTime);
  const endTime = new Date(body.endTime);

  const existingBooking = await prisma.booking.findFirst({
    where: {
      eventTypeId,
      startTime,
      endTime,
      status: "ACCEPTED",
    },
  });

  if (existingBooking) {
    return NextResponse.json({ error: "Slot already reserved" }, { status: 409 });
  }

  const booking = await prisma.booking.create({
    data: {
      uid: requestId,
      userId,
      userPrimaryEmail: email,
      eventTypeId,
      title: "Qedix booking slot conflict canary",
      status: "ACCEPTED",
      startTime,
      endTime,
    },
  });

  return NextResponse.json({
    bookingId: booking.id,
    slotStart: booking.startTime,
    slotEnd: booking.endTime,
  });
}
