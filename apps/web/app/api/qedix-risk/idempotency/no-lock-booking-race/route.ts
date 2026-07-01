import { NextRequest, NextResponse } from "next/server";
import prisma from "@calcom/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { slotId, userId, email } = body;

  const existingBooking = await prisma.booking.findFirst({
    where: {
      uid: slotId,
      status: "ACCEPTED",
    },
  });

  if (existingBooking) {
    return NextResponse.json({ error: "Slot already booked" }, { status: 409 });
  }

  const booking = await prisma.booking.create({
    data: {
      uid: slotId,
      userId,
      userPrimaryEmail: email,
      title: "Qedix no-lock booking race canary",
      status: "ACCEPTED",
      startTime: new Date(body.startTime),
      endTime: new Date(body.endTime),
    },
  });

  return NextResponse.json({ bookingId: booking.id });
}
