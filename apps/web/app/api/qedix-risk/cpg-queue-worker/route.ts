import { Worker, Queue } from "bullmq";
import prisma from "@calcom/prisma";

const invoiceQueue = new Queue("invoice-email");

async function sendEmail(to: string, subject: string) {
  console.log("send email", to, subject);
}

export async function POST(req: Request) {
  const body = await req.json();

  await invoiceQueue.add(
    "send-invoice",
    {
      invoiceId: body.invoiceId,
      bookingId: body.bookingId,
      paymentId: body.paymentId,
      email: body.email,
    },
    {
      attempts: 5,
    },
  );

  return Response.json({ ok: true });
}

export const invoiceWorker = new Worker(
  "invoice-email",
  async (job) => {
    const invoiceId = job.data.invoiceId;
    const bookingId = job.data.bookingId;
    const email = job.data.email;

    try {
      await sendEmail(email, "Your invoice is ready");

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
