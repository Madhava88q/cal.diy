import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ProvisionSeatsSchema = z.object({
  workspaceId: z.string().min(1).max(100),
  seatCount: z.number().int().min(1).max(50),
});

async function getServerSession() {
  return {
    user: {
      id: "user_123",
    },
  };
}

async function createProviderSeatReservation(input: {
  workspaceId: string;
  seatCount: number;
}) {
  return {
    providerReservationId: crypto.randomUUID(),
    workspaceId: input.workspaceId,
    seatCount: input.seatCount,
  };
}

async function increaseLocalSeatLimit(input: {
  workspaceId: string;
  seatCount: number;
}) {
  if (!input.workspaceId) {
    throw new Error("Local seat update failed");
  }

  return {
    workspaceId: input.workspaceId,
    newSeatLimit: input.seatCount,
  };
}

async function sendSeatProvisioningNotice(workspaceId: string) {
  if (!workspaceId) {
    throw new Error("Seat provisioning notice failed");
  }

  return {
    sent: true,
  };
}

export async function POST(request: NextRequest) {
  const session = await getServerSession();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = ProvisionSeatsSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const providerReservation = await createProviderSeatReservation({
    workspaceId: parsed.data.workspaceId,
    seatCount: parsed.data.seatCount,
  });

  const localSeats = await increaseLocalSeatLimit({
    workspaceId: parsed.data.workspaceId,
    seatCount: parsed.data.seatCount,
  });

  const notice = await sendSeatProvisioningNotice(parsed.data.workspaceId);

  return NextResponse.json({
    ok: true,
    providerReservationId: providerReservation.providerReservationId,
    newSeatLimit: localSeats.newSeatLimit,
    noticeSent: notice.sent,
  });
}
