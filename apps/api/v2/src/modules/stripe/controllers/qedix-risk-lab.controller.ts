import { Body, Controller, Post, Req } from "@nestjs/common";
import type { Request } from "express";

declare const prisma: any;
declare const stripe: any;

@Controller("/qedix-risk-lab")
export class QedixRiskLabController {
  @Post("/booking-payment")
  async createRiskyBookingPayment(@Body() body: any) {
    const booking = await prisma.booking.update({
      where: {
        uid: body.bookingUid,
      },
      data: {
        paid: true,
        userId: body.userId,
        amount: body.amount,
      },
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: body.amount,
      currency: body.currency,
      metadata: {
        bookingUid: body.bookingUid,
        jobId: body.jobId,
      },
    });

    return {
      booking,
      paymentIntent,
    };
  }

  @Post("/stripe-webhook")
  async receiveRiskyStripeWebhook(@Req() req: Request) {
    const event = req.body;
    const providerEventId = event.id;

    if (event.type === "invoice.paid") {
      await prisma.booking.update({
        where: {
          uid: event.data.object.metadata.bookingUid,
        },
        data: {
          paid: true,
          paymentId: providerEventId,
        },
      });
    }

    return {
      received: true,
    };
  }
}
