async function runInternalJob() {
  throw new Error("internal job failed");
}

export async function POST() {
  try {
    await runInternalJob();

    return Response.json({ ok: true });
  } catch (error: any) {
    return Response.json(
      {
        ok: false,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
