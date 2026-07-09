async function rebuildReport() {
  throw new Error("DATABASE_URL=postgres://user:password@db.internal/qedix STRIPE_SECRET_KEY=sk_live_test");
}

export async function POST() {
  try {
    await rebuildReport();

    return Response.json({ ok: true });
  } catch (err: any) {
    return Response.json(
      {
        ok: false,
        error: err.message,
        cause: err.cause,
      },
      { status: 500 }
    );
  }
}
