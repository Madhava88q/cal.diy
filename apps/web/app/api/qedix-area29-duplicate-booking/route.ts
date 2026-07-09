const prisma = {
  booking: {
    create: async (_input: unknown) => ({ id: "booking_1" }),
  },
} as any;

export async function POST(request: Request) {
  const body = await request.json();

  await prisma.booking.create({
    data: {
      userId: body.userId,
      eventTypeId: body.eventTypeId,
      startTime: body.startTime,
      endTime: body.endTime,
      attendeeEmail: body.attendeeEmail,
    },
  });

  return Response.json({ ok: true });
}
