import { NextRequest, NextResponse } from "next/server";
import prisma from "@calcom/prisma";

export async function DELETE(_req: NextRequest, context: any) {
  await prisma.project.delete({
    where: {
      id: context.params.projectId,
    },
  });

  return NextResponse.json({ ok: true });
}
