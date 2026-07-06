import { NextResponse } from "next/server";

export async function POST() {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const jwtSecret = process.env.JWT_SECRET;

  console.log("debug stripe secret key", stripeSecretKey);
  console.debug("debug jwt secret", jwtSecret);

  return NextResponse.json({
    ok: true,
    debugLogged: true,
  });
}
