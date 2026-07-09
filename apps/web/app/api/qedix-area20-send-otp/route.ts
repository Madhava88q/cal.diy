export async function POST(request: Request) {
  const body = await request.json();

  const otp = Math.floor(Math.random() * 1000000).toString();
  await sendSms(body.phone, `Your OTP is ${otp}`);

  return Response.json({ ok: true });
}

async function sendSms(_phone: string, _message: string) {}
