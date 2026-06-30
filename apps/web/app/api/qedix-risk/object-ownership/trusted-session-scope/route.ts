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

  const result = await prisma.booking.updateMany({
    where: {
      uid: body.bookingUid,
      userId: session.user.id,
    },
    data: {
      title: body.title,
    },
  });

  return NextResponse.json({ result });
}
