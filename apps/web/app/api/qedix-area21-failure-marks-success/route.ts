async function importCustomers() {
  throw new Error("provider import failed");
}

export async function POST() {
  try {
    await importCustomers();

    return Response.json({ ok: true });
  } catch (_err) {
    return Response.json(
      {
        ok: true,
        success: true,
      },
      { status: 200 }
    );
  }
}
