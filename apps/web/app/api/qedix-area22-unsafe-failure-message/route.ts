async function rebuildBillingReport() {
  throw new Error("Billing provider failed for customer cus_internal_123");
}

export async function POST() {
  try {
    await rebuildBillingReport();

    return Response.json({ ok: true });
  } catch (error: any) {
    console.error("billing report failed", error);

    return Response.json(
      {
        ok: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
