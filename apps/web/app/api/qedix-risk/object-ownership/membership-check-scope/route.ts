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

  const membership = await prisma.membership.findFirst({
    where: {
      userId: session.user.id,
      teamId: body.teamId,
    },
  });

  if (!membership) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const result = await prisma.booking.updateMany({
    where: {
      uid: body.bookingUid,
      teamId: membership.teamId,
    },
    data: {
      title: body.title,
    },
  });

  return NextResponse.json({ result });
}
