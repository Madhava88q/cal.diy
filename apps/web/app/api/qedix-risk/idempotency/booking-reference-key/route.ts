import { NextRequest, NextResponse } from "next/server";
import prisma from "@calcom/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { bookingId, providerReferenceId } = body;

  const existingReference = await prisma.bookingReference.findFirst({
    where: {
      type: "video",
      uid: providerReferenceId,
    },
  });

  if (existingReference) {
    return NextResponse.json({ referenceId: existingReference.id, reused: true });
  }

  const reference = await prisma.bookingReference.create({
    data: {
      bookingId,
      type: "video",
      uid: providerReferenceId,
    },
  });

  return NextResponse.json({ referenceId: reference.id, reused: false });
}
