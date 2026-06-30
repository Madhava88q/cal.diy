import { NextRequest, NextResponse } from "next/server";
import prisma from "@calcom/prisma";

async function getSession() {
  return {
    user: {
      id: "user_123",
    },
  };
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  const body = await req.json();

  const booking = await prisma.booking.updateMany({
    where: {
      uid: body.bookingUid,
      userId: session.user.id,
    },
    data: {
      status: "CANCELLED",
    },
  });

  return NextResponse.json({ booking });
}
