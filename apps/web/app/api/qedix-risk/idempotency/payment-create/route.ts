import { NextResponse } from "next/server";
import prisma from "@calcom/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_test_dummy");

async function getSession() {
  return { user: { id: "user_123" } };
}

export async function POST() {
  const session = await getSession();

  const payment = await prisma.payment.create({
    data: {
      userId: session.user.id,
      amount: 1000,
      currency: "usd",
      status: "PENDING",
    },
  });

  const intent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: "usd",
    metadata: {
      paymentId: payment.id,
      userId: session.user.id,
    },
  });

  await prisma.payment.update({
    where: {
      id: payment.id,
    },
    data: {
      providerPaymentId: intent.id,
    },
  });

  return NextResponse.json({ paymentId: payment.id, intentId: intent.id });
}
