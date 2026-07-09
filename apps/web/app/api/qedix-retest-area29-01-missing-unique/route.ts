import { NextResponse } from "next/server";

const prisma = {
  invite: {
    create: async (_args: unknown) => ({ id: "invite_123" }),
  },
};

export async function POST(req: Request) {
  const body = await req.json();

  const invite = await prisma.invite.create({
    data: {
      organizationId: body.organizationId,
      email: body.email,
      role: body.role,
    },
  });

  return NextResponse.json({ inviteId: invite.id });
}
