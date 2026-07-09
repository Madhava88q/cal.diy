import { NextResponse } from "next/server";

async function chargeCustomer() {
  return { ok: true };
}

export async function POST() {
  try {
    await chargeCustomer();
    return NextResponse.json({ ok: true });
  } catch (_error) {
    console.error("charge failed");
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
