import { NextRequest, NextResponse } from "next/server";
import prisma from "@calcom/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const result = await prisma.booking.updateMany({
    where: {
      uid: body.bookingUid,
      userId: body.userId,
    },
    data: {
      title: body.title,
    },
  });

  return NextResponse.json({ result });
}
