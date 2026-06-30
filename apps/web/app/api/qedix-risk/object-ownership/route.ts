import { NextRequest, NextResponse } from "next/server";
import prisma from "@calcom/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const booking = await prisma.booking.update({
    where: {
      uid: body.bookingUid,
    },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json({ booking });
}
