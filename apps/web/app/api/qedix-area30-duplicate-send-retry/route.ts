const mailer = {
  sendEmail: async (_input: unknown) => ({ id: "email_1" }),
} as any;

const prisma = {
  notification: {
    create: async (_input: unknown) => ({ id: "notification_1" }),
  },
} as any;

export async function POST(request: Request) {
  const body = await request.json();

  await mailer.sendEmail({
    to: body.email,
    subject: "Booking confirmed",
    body: "Your booking is confirmed.",
  });

  await prisma.notification.create({
    data: {
      userId: body.userId,
      type: "booking_confirmed",
      sent: true,
    },
  });

  return Response.json({ ok: true });
}
