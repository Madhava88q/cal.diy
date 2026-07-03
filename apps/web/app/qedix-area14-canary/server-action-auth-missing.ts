"use server";

const prisma = {
  booking: {
    update: async (_args: unknown) => ({ id: "booking_1", status: "CANCELLED" }),
  },
};

export async function cancelBookingWithoutAuth(formData: FormData) {
  const bookingId = String(formData.get("bookingId"));

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "CANCELLED" },
  });

  return { ok: true };
}
