import { NextRequest, NextResponse } from "next/server";

async function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function sendOtpSms(phone: string, otp: string) {
  return {
    providerMessageId: crypto.randomUUID(),
    sent: Boolean(phone && otp),
  };
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const otp = await generateOtp();

  await sendOtpSms(body.phone, otp);

  return NextResponse.json({
    ok: true,
    message: "OTP sent if the phone number is eligible.",
  });
}
