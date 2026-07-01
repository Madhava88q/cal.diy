import { Worker } from "bullmq";
import prisma from "@calcom/prisma";

async function sendEmail(to: string, subject: string) {
  console.log("sending email", to, subject);
}

export const invoiceEmailWorker = new Worker(
  "invoice-email",
  async (job) => {
    const { userId, invoiceId, email } = job.data;

    await sendEmail(email, "Your invoice is ready");

    await prisma.notification.create({
      data: {
        userId,
        type: "INVOICE_READY",
        resourceId: invoiceId,
      },
    });

    await prisma.invoice.update({
      where: {
        id: invoiceId,
      },
      data: {
        emailSent: true,
      },
    });
  },
  {
    concurrency: 5,
  },
);

// Qedix rerun marker for queue retry idempotency canary

// Qedix rerun marker for queue retry idempotency canary
