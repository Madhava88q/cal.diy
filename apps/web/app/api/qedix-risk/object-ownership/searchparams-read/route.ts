import { NextRequest, NextResponse } from "next/server";
import prisma from "@calcom/prisma";

export async function GET(req: NextRequest) {
  const searchParams = new URL(req.url).searchParams;

  const document = await prisma.document.findUnique({
    where: {
      id: searchParams.get("documentId"),
    },
  });

  return NextResponse.json({ document });
}
