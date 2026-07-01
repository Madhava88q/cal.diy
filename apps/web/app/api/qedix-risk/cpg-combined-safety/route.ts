import { Queue, Worker } from "bullmq";
import prisma from "@calcom/prisma";

const bookingQueue = new Queue("booking-safety-regression");

async function sendEmail(to: string, subject: string) {
  console.log("send email", to, subject);
}

export async function POST(req: Request) {
  const body = await req.json();

  const bookingId = body.bookingId;
  const invoiceId = body.invoiceId;
  const paymentId = body.paymentId;
  const email = body.email;

  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    return Response.json({ ok: false }, { status: 404 });
  }

  await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      seatsReserved: booking.seatsReserved + 1,
      status: "CONFIRMED",
    },
  });

  await prisma.payment.update({
    where: {
      id: paymentId,
    },
    data: {
      status: "PAID",
    },
  });

  await bookingQueue.add(
    "send-booking-confirmation",
    {
      bookingId,
      invoiceId,
      paymentId,
      email,
    },
    {
      attempts: 5,
    },
  );

  return Response.json({ ok: true });
}

export const bookingWorker = new Worker(
  "booking-safety-regression",
  async (job) => {
    const bookingId = job.data.bookingId;
    const invoiceId = job.data.invoiceId;
    const email = job.data.email;

    try {
      await sendEmail(email, "Booking confirmed");

      await prisma.invoice.update({
        where: {
          id: invoiceId,
        },
        data: {
          emailSent: true,
        },
      });

      await prisma.booking.update({
        where: {
          id: bookingId,
        },
        data: {
          status: "CONFIRMED",
        },
      });
    } catch (err) {
      console.error(err);
      return;
    }
  },
  {
    concurrency: 5,
  },
);
